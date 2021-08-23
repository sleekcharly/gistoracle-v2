const { default: axios } = require("axios");
const { default: jwtDecode } = require("jwt-decode");
const { useDispatch } = require("react-redux");
const { useAuth } = require("../contexts/AuthContext");
const { getUserData } = require("../redux/actions/userActions");

exports.userAuthRefresh = () => {
  // destructure current user;
  const { currentUser } = useAuth();

  // get the authentication token from the local storage
  const token = localStorage.FBIdToken;

  // set dispatch
  const dispatch = useDispatch();

  // check if a token exist
  if (token) {
    const decodedToken = jwtDecode(token);

    // if token is expired, refresh token
    if (decodedToken.exp * 1000 < Date.now()) {
      currentUser.getIdToken().then((token) => {
        const FBIdToken = `Bearer ${token}`;

        // set local storage
        localStorage.setItem("FBIdToken", FBIdToken);

        // set user as authenticated and set authorization header
        axios.defaults.headers.common["Authorization"] = FBIdToken;

        // get user data from firestore
        dispatch(getUserData());
      });
    } else {
      // if token exists set user as authenticated and set authorization header
      //   dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;

      // get user data
      dispatch(getUserData());
    }
  } else {
    return;
  }
};