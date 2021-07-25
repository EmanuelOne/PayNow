export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function checkPassword(str) {
  var re = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return re.test(str);
}
// console.log(checkPassword("emanuelA"));
