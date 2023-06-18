import { hash, compare } from "bcrypt";
import userdb from "../models/user.model.js";
import { SUCCESS_MESSAGES } from "../utils/enums/success-messages.js";
import { ERROR_MESSAGES } from "../utils/enums/error-messages.js";
import { STATUS, ROLES } from "../utils/enums/user-enum.js";

// METHOD => POST
// ROUTE => v1/sign-in
// ACCESS => USER / MODERATOR / ADMIN
// DESCRIPTION => Logs in user to the platform
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, password, age, phoneNumber } = req.body;
    const passwordhash = await hash(password, 10);
    const user = await userdb.create({
      firstName,
      lastName,
      password: passwordhash,
      age,
      status: STATUS.ACTIVE,
      role: ROLES.USER,
      phoneNumber,
    });
    res
      .status(201)
      .json({ data: user, message: SUCCESS_MESSAGES.USER_CREATED });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};

// METHOD => POST
// ROUTE => v1/sign-up
// ACCESS => USER / MODERATOR / ADMIN
// DESCRIPTION => Registers user to the platform
export const signIn = async (req, res) => {
  try {
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
      const token = await user.generateAuthToken()
      return res.header("x-auth-token", token).status(200).json({ data: user });
    }
    res.status(400).json({ message: ERROR_MESSAGES.INVALID_CREDINTIALS });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};
