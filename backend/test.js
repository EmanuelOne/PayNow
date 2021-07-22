import moment from "moment";
const date = moment().format("DD/MM/YYYY");
const time = moment().format("h:mma");
import bcrypt from "bcryptjs";

console.log(bcrypt.hashSync("password", bcrypt.genSaltSync(10)));
const is = bcrypt.compareSync(
  "password",
  "$2a$10$ySAdp3pYO1LKdy/M1kCHk.0SDrVBTpukxKhc21ToHamqYZVNCMgcm"
);
console.log(is);
