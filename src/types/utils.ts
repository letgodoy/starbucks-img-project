import { UserRoles } from "../enums/UserRoles";
import { menuCategory } from "../utils";

export interface RoutesList {
  path: string;
  component: any;
  isPublic?: boolean;
  title: string;
  visibleRole?: string[];
  id: number;
  visibleMenu?: boolean;
  roles?: UserRoles[];
  category?: menuCategory; 
}