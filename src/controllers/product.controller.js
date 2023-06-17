import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  res.status(200).json("working");
});
