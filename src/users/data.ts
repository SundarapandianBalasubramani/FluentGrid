import { faker } from "@faker-js/faker";
import { IUser } from "./types";

const roleAdmin: string[] = ["Admin"];
const read: string[] = ["Read"];
const write: string[] = ["Write"];
const readWrite: string[] = ["Read", "Write"];
const readWriteDelete: string[] = ["Read", "Write", "Delete"];

const getRoles = (i: number): string[] => {
  const role = i % 5;
  switch (role) {
    case 0:
      return roleAdmin;
    case 1:
      return read;
    case 2:
      return write;
    case 3:
      return readWrite;
    case 4:
      return readWriteDelete;
  }
  return [];
};

export const getUsers = (length: number): IUser[] => {
  const users: IUser[] = [];
  for (let i = 0; i < length; i++) {
    const user: Partial<IUser> = {};
    user.id = i + 1;
    user.name = faker.person.fullName();
    user.city = faker.location.city();
    user.country = faker.location.country();
    user.province = faker.location.state();
    user.zipCode = faker.location.zipCode();
    user.email = faker.internet.email();
    user.roles = getRoles(i);
    users.push(user as IUser);
  }
  return users;
};

export const pageSizes = ["10", "25", "50"];

export const searchItems = <T>(
  text: string,
  data: T[],
  keys: Array<keyof T>
): T[] => {
  return data.filter((item) =>
    keys.some((k) => String(item[k]).toLowerCase().includes(text))
  );
};
