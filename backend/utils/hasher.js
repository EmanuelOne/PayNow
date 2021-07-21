import bcrypt from "bcryptjs";

export async function hash(length = 4, value) {
  // length of the salt and value to be hashed
  const salt = await bcrypt.genSalt(length);
  const password = await bcrypt.hash(value, salt);
  return password;
}
export async function decript(value, hashValue) {
  // value in plain text and the hashed value to be compare with
  return await bcrypt.compare(value, hashValue);
}
