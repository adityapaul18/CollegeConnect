const isValidEmail = email => {
  // validating email's structure
  if (email.length > 50) return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isPasswordStrong = password => {
  if (password.length > 20 || password.length < 6) return false;
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  return re.test(String(password));
};

module.exports={
  isValidEmail,
  isPasswordStrong
}
