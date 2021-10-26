/* This file contains all the necessary codes required for authentication  validation */

// helper function to determine that a field is not empty.
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

// helper function to check for a valid email using regex
const isEmail = (email) => {
  const regEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (email.match(regEx)) return true;
  else return false;
};

// helper function to check for special characters
const specialChar = (string) => {
  const regEx =
    /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|""|\;|\:|\s/;
  if (string.match(regEx)) return true;
  else return false;
};

// helper function to limit length of username string.
const tooLong = (string) => {
  if (string.length > 20) return true;
  else return false;
};

// helper function to limit length of displayName
const displayNameTooLong = (string) => {
  if (string.length > 35) return true;
  else return false;
};

// helper function to ensure passwords are not shorter than 6 charcters
const passwordShort = (string) => {
  if (string.length < 7) return true;
  else return false;
};

// validation for the login data
exports.validateLoginData = (data) => {
  let errors = {};

  // check that email and password fields are  not empty
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Oops look again, valid email required";
  }

  // check that password  field is not empty
  if (data.password && isEmpty(data.password)) {
    errors.password = "Please enter your password!";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

//validate edit profile data
exports.validateProfileEditData = (data) => {
  let formErrors = {};

  // check that email and username fields are not empty and email is valid email
  if (isEmpty(data.email)) {
    formErrors.email = "Must not be empty !";
  } else if (!isEmail(data.email)) {
    formErrors.email = "Please enter a valid email address !";
  }

  // check that username is not empty
  if (isEmpty(data.username)) {
    formErrors.username = "Must not be empty !";
  }

  if (tooLong(data.username))
    errors.username = "Not more than 20 characters required !";

  if (displayNameTooLong(data.displayName)) {
    formErrors.displayName = "Not more than 35 characters required !";
  }

  return {
    formErrors,
    valid: Object.keys(formErrors).length === 0 ? true : false,
  };
};

// validation for update user profile data
exports.validateUserProfileData = (data) => {
  let errors = {};

  // check that username and email fields are not empty
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty, Email required";
  } else if (!isEmail(data.email)) {
    errors.email =
      "Hold on!! That looks like an address from space, enter a valid email";
  } else if (isEmpty(data.username)) {
    errors.username = "Must not be empty, username required";
  }

  if (tooLong(data.username))
    errors.username = "Not more than 20 characters required";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

// validate change password data
exports.validateChangePasswordData = (data) => {
  let passwordErrors = {};

  // check that password in not empty
  if (isEmpty(data.currentPassword)) {
    passwordErrors.currentPassword = "Please enter your current password";
  }

  if (isEmpty(data.newPassword)) {
    passwordErrors.newPassword = "Please enter new password";
  } else if (data.newPassword !== data.newPassword2) {
    // check to see if new password and confirm password match
    passwordErrors.newPassword = "Passwords do not match";
    passwordErrors.newPassword2 = "Passwords do not match";
  }

  return {
    passwordErrors,
    valid: Object.keys(passwordErrors).length === 0 ? true : false,
  };
};

// validation of the signup data
exports.validateSignupData = (data) => {
  let errors = {};

  // check if the field is empty and the email is a valid one.
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Please enter valid email";
  }

  // check that passwords are not empty and must match
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(data.username)) errors.username = "Must not be empty";
  if (tooLong(data.username))
    errors.username = "Not more than 20 characters required";

  // check that passwords are not shorter than 7 characters
  if (passwordShort(data.password))
    errors.password = "Passwords must be 7 or more charcters long!";

  // check for white space in username
  if (specialChar(data.username))
    errors.username = "No special characters and spaces allowed !";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

// validation for edited shrine details
exports.validateEditedShrineData = (data) => {
  let errors = {};

  // check if field is empty
  if (isEmpty(data.name)) {
    errors.shrineName = "Must not be empty";
  }

  // check for white spaces and special characters in shrine name
  if (!isEmpty(data.name) && specialChar(data.name)) {
    errors.shrineName = "No special characters and spaces are allowed !";
  }

  // check if shrine name is more than 30 characters
  if (!isEmpty(data.name) && tooLong(data.name)) {
    errors.shrineName = "Not more than 20 characters required!";
  }

  if (isEmpty(data.description)) {
    errors.description = "Please fill in a description for your shrine";
  }

  console.log(errors);

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

// validation for new shine data
exports.validateNewShrineData = (data) => {
  let errors = {};

  // check if the field is empty
  if (isEmpty(data.categoryName)) {
    errors.categoryName = "Please pick a category for your shrine";
  }
  if (isEmpty(data.name)) {
    errors.shrineName = "Must not be empty";
  }

  // check if shrine name is more than 30 characters
  if (!isEmpty(data.name) && tooLong(data.name)) {
    errors.shrineName = "Not more than 20 characters required!";
  }

  // check if description is empty
  if (isEmpty(data.description)) {
    errors.description = "Please fill in a description for your shrine";
  }

  // check for white spaces and special characters in shrine name
  if (!isEmpty(data.name) && specialChar(data.name)) {
    errors.shrineName = "No special characters and spaces are allowed !";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
