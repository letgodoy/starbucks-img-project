import { userType } from "./constants"

export const userTypeFilteredByRole = (userRole: string) => {
  if (userRole === "operationManager") {
    return userType.filter(item => item.value !== "admin")
  }

  if (userRole === "districtManager") {
    return userType.filter(item => item.value !== "admin" && item.value !== "operationManager")
  }

  if (userRole === "managerStore") {
    return userType.filter(item => item.value !== "admin" && item.value !== "operationManager" && item.value !== "districtManager" && item.value !== "managerAgency")
  }

  if (userRole === "managerAgency") {
    return userType.filter(item => item.value !== "admin" && item.value !== "operationManager" && item.value !== "districtManager" && item.value !== "managerStore")
  }

  if (userRole === "managerPhoto") {
    return userType.filter(item => item.value === "userPhoto")
  }

  if (userRole === "userAgency" || userRole === "userPhoto") {
    return []
  }

  return userType
}