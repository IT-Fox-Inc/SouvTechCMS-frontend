import { axiosClient } from "api/axiosClient"
import {
  RoleTableAccess,
  TableWithAccessList,
} from "type/tableAccess/tableAccess"

export const getRoleTablesAccess = async (
  roleId: number,
): Promise<RoleTableAccess> => {
  const { data: tableAccessesList } = await axiosClient.get(
    `/table_access/role/${roleId}`,
  )
  return tableAccessesList
}

export const getTablesAccessListByRolesIds = async (
  roleIdList: number[],
): Promise<TableWithAccessList[]> => {
  const { data: tableAccessesList } = await axiosClient.post(
    "/table_access/role/list/",
    roleIdList,
  )
  return tableAccessesList
}

export const updateRoleTableAccess = async (
  body: RoleTableAccess,
): Promise<RoleTableAccess> => {
  const { data: roleTableAccess } = await axiosClient.put(
    "/table_access/",
    body,
  )
  return roleTableAccess
}
