import { useAuth } from "../components/contexts/auth";
import { UserRoles } from "../enums/UserRoles";
import { auth } from "../utils/firebase";

interface ValidationRoleProps {
  roles: UserRoles[];
}

export const useValidationRole = ({ roles }: ValidationRoleProps) => {
  const { user } = useAuth();
  const { currentUser } = auth;

  if (currentUser && user) {
    return roles.includes(user.role as UserRoles);
  }

  return false;
}