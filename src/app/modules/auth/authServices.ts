import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config";
import AppError from "../../utils/appError";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
  generateToken,
} from "../../utils/auth/jwt";
import { IUser } from "../user/userInterface";
import { User } from "../user/userSchemaModel";
import bcrypt from "bcrypt";

const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (!password) {
    throw new AppError(400, "Password is missing");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    findUser.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(400, "Password invalid");
  }

  // const jwtPayload = {
  //   userID: findUser._id,
  //   email: findUser.email,
  //   role: findUser.role,
  // };
  // const accessToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_ACCESS_SECRET,
  //   envVars.JWT_ACCESS_EXPIRES
  // );
  // const refreshToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_REFRESH_SECRET,
  //   envVars.JWT_REFRESH_EXPIRES
  // );
  const userTokens = createUserTokens(findUser);

  return {
    isLoggedIn: true,
    userInfo: { name: findUser.name, email: findUser.email },
    // tokens: { accessToken, refreshToken },
    tokens: userTokens,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};

const getResetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  console.log(decodedToken);
  // const user = await User.findById(decodedToken._id);
  const user = await User.findById(decodedToken.userId);
  console.log(user);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    user.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  user!.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  user!.save();
};

export const authServices = {
  credentialLogin,
  getNewAccessToken,
  getResetPassword,
};
