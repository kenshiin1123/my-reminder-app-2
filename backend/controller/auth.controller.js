import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

const register = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({
      message: "Username, email and password is required!",
      success: false,
    });
  }

  const { email, username, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return res.status(409).json({
      message: "Email or username already in use.",
      success: false,
    });
  }

  const passwordHash = await hashPassword(password);
  const newUser = new User({ username, email, passwordHash });
  await newUser.save();

  res
    .status(201)
    .json({ message: "User registered successfully", success: true });
};

const login = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email and password is required!", success: true });
  }

  const { email, password } = req.body;

  const user = User.findOne({ email });
  const badResponse = res
    .status(400)
    .json({ message: "User not found!", success: false });

  // Check if user is available
  if (!user) badResponse;

  // Check if password is correct.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) badResponse;

  res.status(200).json({ message: "Logged in successfully", success: true });
};

export { register, login };
