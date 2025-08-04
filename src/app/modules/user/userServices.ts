import AppError from "../../utils/appError";
import { IAuthProvider, IUser, Role } from "./userInterface";
import { User } from "./userSchemaModel";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config";

const createAUserIntoDB = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const findUser = await User.findOne({ email });
  if (findUser && findUser.email === "email") {
    throw new AppError(httpStatus.NOT_FOUND, "Email Already exist");
  }
  const authProvider: IAuthProvider = {
    provider: "credential",
    providerId: email as string,
  };
  if (!password) {
    throw new AppError(400, "Password is missing");
  }
  const hashedPassword = await bcrypt.hash(password as string, 10);
  const result = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return { ...result.toObject(), password: "" };
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUserintoDB = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await User.findById(userId);
  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  /**
   * email - can not update
   * name, phone, password address
   * password - re hashing
   *  only admin superadmin - role, isDeleted...
   *
   * promoting to superadmin - superadmin
   */
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

export const userServices = {
  createAUserIntoDB,
  getAllUsersFromDB,
  updateUserintoDB,
};
