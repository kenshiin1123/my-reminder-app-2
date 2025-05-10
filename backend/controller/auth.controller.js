import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import dotenv from "dotenv";
dotenv.config();

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

    console.log(email, username, password);

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
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json({ accessToken, message: "Logged in successfully", success: true });
};

const logoutUser = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  const userId = req.user?.id;

  // If no token in cookies, there's nothing to revoke
  if (!refreshToken) return res.sendStatus(204);

  try {
    const user = await User.findById(userId);

    if (user) {
      // Filter out the used refresh token
      user.refreshTokens = user.refreshTokens.filter(
        (token) => token !== refreshToken
      );
      await user.save();
    }

    // Clear the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "Logout failed" });
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user)
      return res.status(403).json({ message: "Refresh token not found" });

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });

        // Optional rotation
        user.refreshTokens = user.refreshTokens.filter(
          (t) => t !== refreshToken
        );
        const newRefresh = generateRefreshToken(user);
        user.refreshTokens.push(newRefresh);
        await user.save();

        res.cookie("refreshToken", newRefresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const newAccess = generateAccessToken(user);
        res.json({ accessToken: newAccess });
      }
    );
  } catch (error) {
    console.error("Refresh error:", error.message);
    res.status(500).json({ message: "Server error during refresh" });
  }
};

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) {
      const status = err.name === "TokenExpiredError" ? 401 : 403;
      return res.status(status).json({ message: msg });
    }

    req.user = decoded;
    next();
  });
};

export { register, login, refresh, verifyAccessToken, logoutUser };
