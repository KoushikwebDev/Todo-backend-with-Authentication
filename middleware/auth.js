import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  //   console.log(req.cookies);

  const token =
    req.cookies.token ||
    req.header("Authorization").replace("Bearer ", "") ||
    req.body.token;

  if (!token) {
    throw new Error("Access Denied.");
  }

  // verify token
  try {
    // decode token
    let decode = JWT.verify(token, process.env.SECRET_CODE);
    console.log(decode);
    req.existingUser = decode; //it will get id and email, what we have passed
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: "Token Invalid",
    });
  }

  return next();
};

export default auth;
