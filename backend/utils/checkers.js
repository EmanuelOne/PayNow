export function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return re.test(str);
}
export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
