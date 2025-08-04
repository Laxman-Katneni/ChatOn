import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d to MS
    httpOnly: true, // To prevent XSS (Cross-Site Scripting) attacks
    sameSite: "strict", // To prevent CSRF(Cross-Site Request Forgery) attacks
    secure: process.env.NODE_ENV !== "development", // https vs http // only allow http in development
  });

  return token;
};
