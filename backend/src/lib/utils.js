import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  if (!userId || !res)
    throw new Error("Provide relevant arguments to generate token");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("authToken", token, {
    httpOnly: true, // to prevent XSS cross site scripting attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    secure : process.env.NODE_ENV !== "development",
    sameSite : "strict" // CSRF attacks
  });
};
