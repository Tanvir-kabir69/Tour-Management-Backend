import { IUser } from "./userInterface";
import { User } from "./userSchemaModel";

const createAUserIntoDB = async (payload: Partial<IUser>) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {};

export const userServices = {
  createAUserIntoDB,
  getAllUsersFromDB,
};
