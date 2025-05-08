import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

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

  try {
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

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      name: username,
    });
  } catch (error) {
    console.error("Encountered an error while registering:", error);
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error}`, success: false });
  }
};

const login = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!", success: false });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found!", success: false });
  }

  // Check if password is correct.
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: "User not found!", success: false });
  }

  // Generate Tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = {
    token: generateRefreshToken(user),
    expiresAt: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000), // Expires in 3 months (approx. 90 days)
  };

  // Push the created refresh token in user data
  user.refreshTokens.push(refreshToken);
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json({ accessToken, message: "Logged in successfully", success: true });
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshTokens: refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403);

      // Optional: rotate token
      user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
      const newRefresh = generateRefreshToken(user);
      user.refreshTokens.push(newRefresh);
      await user.save();

      res.cookie("refreshToken", newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const newAccess = generateAccessToken(user);
      res.json({ accessToken: newAccess });
    }
  );
};

export { register, login, refresh };
