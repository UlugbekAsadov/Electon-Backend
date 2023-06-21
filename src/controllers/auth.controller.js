import { hash, compare } from "bcrypt";
import userdb from "../models/user.model.js";
import { SUCCESS_MESSAGES } from "../utils/enums/success-messages.js";
import { ERROR_MESSAGES } from "../utils/enums/error-messages.js";
import { STATUS, ROLES } from "../utils/enums/user-enum.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @METHOD => POST
// @ROUTE => v1/sign-in
// @ACCESS => ADMIN || OWN USER
// @DESCRIPTION => Logs in user to the platform
export const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, password, age, phoneNumber, profileImage } =
    req.body;
  const passwordhash = await hash(password, 10);
  const user = await userdb.create({
    firstName,
    lastName,
    password: passwordhash,
    age,
    status: STATUS.ACTIVE,
    role: ROLES.USER,
    phoneNumber,
    profileImage: profileImage || "",
  });

  const token = await user.generateAuthToken();
  res
    .header("authorization", `Bearer ${token}`)
    .status(201)
    .json({ data: user, message: SUCCESS_MESSAGES.USER_CREATED });
});

// @METHOD => POST
// @ROUTE => v1/sign-up
// @ACCESS => USER / MODERATOR / ADMIN
// @DESCRIPTION => Registers user to the platform
export const signIn = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  const user = await userdb.findOne({
    phoneNumber,
  });

  if (!user) {
    return res.status(403).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
  }

  const isUserMatched = await compare(password, user.password);

  if (isUserMatched) {
    const { firstName, lastName, age, status, role, phoneNumber } = user;
    req.session.user = {
      firstName,
      lastName,
      age,
      status,
      role,
      phoneNumber,
    };
    const token = await user.generateAuthToken();
    return res
      .header("authorization", `Bearer ${token}`)
      .status(200)
      .json({ data: user });
  }
  res.status(400).json({ message: ERROR_MESSAGES.INVALID_CREDINTIALS });
});

// @METHOD => GET
// @ROUTE => v1/get-user/:userId
// @ACCESS => USER / MODERATOR / ADMIN
// @DESCRIPTION => Gets user by id
export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userdb.findById(userId);

  if (!user)
    return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });

  res.status(200).json({ data: user });
});

// @METHOD => PUT
// @ROUTE => v1/user/:userId
// @ACCESS => ADMIN || profile Owner
// @DESCRIPTION => Updates user with id
export const updateUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, age, phoneNumber, role, status } = req.body;
  const user = await userdb.findById(userId);

  if (!user)
    return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });

  const updatingUser = {
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    age: age || user.age,
    phoneNumber: phoneNumber || user.phoneNumber,
    role: role || user.role,
    status: status || user.status,
  };

  await userdb.findByIdAndUpdate(userId, { ...updatingUser });
  const token = await user.generateAuthToken();

  res
    .header("authorization", `Bearer ${token}`)
    .status(200)
    .json({ data: updatingUser, message: SUCCESS_MESSAGES.USER_UPDATED });
});

