import axios from "axios";
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, dataStore, analytics } from "../firebase";
import { CLEAR_ERRORS, SET_ERRORS } from "../redux/types/uiTypes";
import { useStore } from "../redux/store";
import { validateLoginData, validateSignupData } from "../utils/validator";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// define components authentication context
const AuthContext = createContext();

// export authentication functions
export function useAuth() {
  return useContext(AuthContext);
}

// defne the context provider
export function AuthProvider({ children }) {
  // define current logged in user state
  const [currentUser, setCurrentUser] = useState(null);

  // define loading state
  const [loading, setLoading] = useState(true);

  // define dispatch
  const dispatch = useDispatch();

  // defne router
  const router = useRouter();

  /* Firebase Authentication functions necessary for user authentication*/
  //signup function
  const signup = async (userDetails) => {
    // clear any existing errors before continuing
    dispatch({ type: CLEAR_ERRORS });

    // extract and store user details form validation
    const newUser = {
      email: userDetails.email,
      password: userDetails.password,
      confirmPassword: userDetails.password,
      username: userDetails.username,
      location: userDetails.location,
    };

    // pass new user details to validator
    const { valid, errors } = validateSignupData(newUser);
    if (!valid) {
      dispatch({ type: SET_ERRORS, payload: errors });
      return;
    }

    // set default avatar for new user
    const noImg = "no-image.png";

    // set variables for token and userId
    let token, userId;

    // check for existing data in database
    await axios
      .get(`/api/user/create/checkExistingUser/${newUser.username}`)
      .then((res) => {
        return auth
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then((data) => {
            console.log(data.user);
            // set user id
            userId = data.user.uid;

            // log analytics event
            analytics().logEvent("signup");

            // retrieve and return user IdToken for logged in user check
            return data.user.getIdToken();
          })
          .then((idToken) => {
            // assign idToken to token variable
            token = idToken;

            // setup usercredentials object from new user details
            const userCredentials = {
              username: newUser.username,
              email: newUser.email,
              createdAt: new Date().toISOString(),
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                process.env.NODE_ENV === "production"
                  ? process.env.FIREBASE_STORAGE_BUCKET
                  : process.env.FIREBASE_DEV_STORAGE_BUCKET
              }/o/${noImg}?alt=media`,
              userId,
              about: "",
              displayName: "",
              savedPosts: 0,
              postCount: 0,
              location: newUser.location,
              vibrations: 1,
              shrines: [
                "t4TYS8lU7EPPrvWGsVT7",
                "x8D6pc6vIk1ozRG73XRX",
                "Qd5qTeyQ5yCnYePz9HYs",
                "G4zn8pWomBTFfpT9pDSk",
                "1c8FiHmEDDMl1qqoZhDO",
                "LZYPJnYiuBg3plJ2XK88",
                "eeGKpTw993mDLk9CZQU5",
                "NxxBIaM4NW5VKjzGuVIC",
              ],
              userFollowers: [],
              userFollowing: [],
            };

            // create user profile in database
            return axios
              .post(
                `/api/user/create/setUserProfile/${userCredentials.username}`,
                userCredentials
              )
              .then((res) => {
                // set authorization token
                setAuthorizationHeader(token);

                // clear any existing errors
                dispatch({ type: CLEAR_ERRORS });

                //reload application page
                router.push("/");
              })
              .catch((err) => {
                console.log("server error: " + err.response.data);
              });
          })
          .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
              dispatch({
                type: SET_ERRORS,
                payload: { email: "Email is already in use" },
              });
              return;
            } else {
              dispatch({
                type: SET_ERRORS,
                payload: { general: "Something went wrong, please try again" },
              });
              return;
            }
          });
      })
      .catch((err) => {
        console.log(err.response.data);
        // set errors if any
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });

        // dispatch loading UI
        // store.dispatch({ type: STOP_LOADING_UI });
        return;
      });
  };

  // function for logging in user
  const login = (userDetails) => {
    // clear login errors
    dispatch({ type: CLEAR_ERRORS });

    // extract and store user details for validation
    let user = { email: userDetails.email, password: userDetails.password };

    // perform login details validation
    const { valid, errors } = validateLoginData(user);

    //if any error exists return error
    if (!valid) {
      dispatch({ type: SET_ERRORS, payload: errors });
      return;
    }

    return auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        // log analytics event
        analytics().logEvent("login");

        // get and return the user id token
        return data.user.getIdToken();
      })
      .then((token) => {
        let userToken = token;

        setAuthorizationHeader(userToken);

        // clear any login errors
        dispatch({ type: CLEAR_ERRORS });

        // reload page
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);

        // set error in redux
        dispatch({
          type: SET_ERRORS,
          payload: { general: "Wrong email or password! please try again" },
        });

        return;
      });
  };

  // logout function
  const logout = () => {
    return auth
      .signOut()
      .then(() => {
        // log analytics event
        analytics().logEvent("logout");
      })
      .then(() => {
        // delete authorization headers
        localStorage.removeItem("FBIdToken");
        delete axios.defaults.headers.common["Authorization"];
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // function to set up Authorization header.
  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
  };

  // useEffect to track authentication changes and set current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // set authentication values from functions
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
