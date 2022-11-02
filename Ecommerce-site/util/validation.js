function isEmpty(value) {
  //to check whether the string is empty or not.
  return !value || value.trim() === ""; //It will return true if the string is empty
  //trim() method removes the whitespaces from starting and ending of the string
}

//function to check the user credentials

function usersCredentialsAreValid(email, password) {
  return email && email.includes("@") && password && password.trim().length > 5; //It will check whether the length of password is greater than 5 or not
}

//function to check the user details

function userDetailsAreValid(email, password, name, street, postal, city) {
  return (
    usersCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

//function to check whether the entered email is same as entered confirm email

function emailIsConfirmed(email,confirmEmail){
    return email===confirmEmail;
}

module.exports={userDetailsAreValid:userDetailsAreValid,
emailIsConfirmed:emailIsConfirmed
};