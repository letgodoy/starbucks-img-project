import { useAuth } from "../components/contexts/auth";
import { UserRoles } from "../enums/UserRoles";
import { auth } from "../utils/firebase";
import { validateUserRoles } from "../utils/validateUserRoles";


export const useValidateUserRole = (roles: UserRoles[]) => {
  const { user } = useAuth();
  const { currentUser } = auth;

  if (!user || !currentUser) return false

  if (roles) {
    return validateUserRoles({ roles, currentUser: user });
  }

  return true;
}