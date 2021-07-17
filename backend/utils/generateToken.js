import jwt from "jsonwebtoken";

const generateToken = (id, type = "token") => {
  let expire = {};
  if (type === "token")
    expire = {
      expiresIn: "1d",
    };
  return jwt.sign({ id }, process.env.JWT_SECRET, expire);
};

function getAuthtoken() {
  console.log(require("crypto").randomBytes(24).toString("hex"));
}

export default generateToken;
