import jwt from "jsonwebtoken";

// Generate Access Token (Short-lived)
export const generateAccessToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return accessToken;
};

// // Generate Refresh Token (Long-lived)
// export const generateRefreshToken = (res, userId) => {
//   const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   return refreshToken;
// };
