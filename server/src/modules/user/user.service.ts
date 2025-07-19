import User from "./user.model";
import { CreateUserDto, UpdateUserDto } from "./user.types";

export const getAll = async () => User.find();

export const getById = async (id: string) => User.findById(id);

export const create = async (data: CreateUserDto) => {
  return await User.create(data);
};

export const update = async (id: string, data: UpdateUserDto) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  Object.assign(user, data);
  return await user.save();
};

export const remove = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  await user.deleteOne();
};
