import { ROLES } from "../types";

export const fileTypes = ["jpg", "png", "gif", "jpeg"];

export const userType = [
  {
    name: "Selecione",
    value: ""
  },
  {
    name: "Administrador",
    value: ROLES.admin
  },
  {
    name: "Gerente geral de operações",
    value: ROLES.operationManager
  },
  {
    name: "Gerente de distrito",
    value: ROLES.districtManager
  },
  {
    name: "Gerente de loja",
    value: ROLES.managerStore
  },
  {
    name: "Gerente de agência",
    value: ROLES.managerAgency
  },
  {
    name: "Gerente de fotógrafos",
    value: ROLES.managerPhoto
  },
  {
    name: "Usuário de agência",
    value: ROLES.userAgency
  },
  {
    name: "Usuário de fotógrafos",
    value: ROLES.userPhoto
  }
]