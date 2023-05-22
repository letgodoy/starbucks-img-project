import { UserRoles } from "../enums/UserRoles";
import { IUser } from "../types";

interface Params {
  currentUser: IUser;
  roles?: UserRoles[];
}

export const validateUserRoles = (params: Params) => {
  const { roles, currentUser } = params;

  if (!currentUser) return false;

  if (roles) {
    return roles.includes(currentUser.role as UserRoles);
  }

  return true;
};