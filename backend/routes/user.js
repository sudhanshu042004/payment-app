const express = require("express");
const userRouter = express.Router();
const bodyParser = require("body-parser");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/middleware");
const { User, Account } = require("../db/db");
const jwtSecret = process.env.JWT_SECRET;

//SignupSchemaCheck
function SignupSchemaCheck(body) {
  const check = z.object({
    username: z.string().email(),
    password: z.string().min(8).max(100),
    firstname: z.string().min(3).max(100),
    lastname: z.string().min(3).max(100),
  });
  const result = check.safeParse(body);
  if (result.success) {
    return true;
  } else {
    return false;
  }
}
function updateSchemaCheck(body) {
  const check = z.object({
    username: z.string().email(),
    password: z.string().min(8).max(100).optional(),
    firstname: z.string().min(3).max(100).optional(),
    lastname: z.string().min(3).max(100).optional(),
  });
  const result = check.safeParse(body);
  if (result.success) {
    return true;
  }
  return false;
}
//signup  request
userRouter.use(bodyParser.json());
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  if (!SignupSchemaCheck(body)) {
    return res.status(411).json({
      message: "Invalid Data Input",
    });
  }
  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already exist",
    });
  }

  const user = await User.create(body);
  const userId = user._id;
  //account
  await Account.create({
    userId,
    balance: Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: userId,
    },
    jwtSecret,
  );
  return res.status(200).json({
    message: "user created successfully",
    tokken: token,
  });
});

//signin request
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (!user) {
    return res.status(411).json({
      message: "Error while loggin in",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    jwtSecret,
  );
  return res.status(200).json({
    token: `Bearer ${token}`,
  });
});
//authentication Middleware
userRouter.use(authMiddleware);
//update request
userRouter.put("/", async (req, res) => {
  const body = req.body;
  if (!updateSchemaCheck(body)) {
    return res.status(411).json({
      message: "invalid input",
    });
  }
  const response = await User.findOneAndUpdate(
    { username: body.username },
    {
      firstname: body.firstname,
      lastname: body.lastname,
      password: body.password,
    },
  );
  await response.save();
  return res.status(200).json({
    message: "Updated successfully",
  });
});
//filter request
userRouter.get("/bulk", async (req, res) => {
  const filterElement = req.query.filter;
  const response = await User.find({
    $or: [
      { firstname: { $regex: filterElement } },
      { lastname: { $regex: filterElement } },
    ],
  });
  return res.status(200).json({
    user: response.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});
module.exports = userRouter;
