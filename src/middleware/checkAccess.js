import { ERROR_MESSAGES } from "../utils/enums/error-messages.js";
import jwt from "jsonwebtoken";
import userdb from "../models/user.model.js";
import { ROLES, STATUS } from "../utils/enums/user-enum.js";

export const protectedRoute = async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: ERROR_MESSAGES.NOT_AUTHORIZED });
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  req.user = await userdb.findById(decoded._id);
  req.tokenId = decoded._id;

  next();
};

export const hasAccess = async (req, res, next) => {
  const isOwner = req.params.userId === req.tokenId;
  const isActive = req.user.status === STATUS.ACTIVE;
  const isAdmin = req.user.role === ROLES.ADMIN;

  console.log(isActive)
  if (isActive && (isAdmin || isOwner)) {
    return next();
  }

  return res
    .status(403)
    .json({ message: ERROR_MESSAGES.YOU_DO_NOT_HAVE_ACCESS });
};
