import { Permission } from "type/permission"
import { Role } from "type/role"
import { Shop } from "type/shop"
import { WithId } from "type/withId"

export type User = {
  username: string
  password?: string
  fio?: string
  salary?: number
  bot_user_id?: number
  email?: string
  phone?: string
}

export type UserWithRolesAndShops = {
  user: WithId<User>
  roles_with_permissions: RoleWithPermissions[]
  shops: WithId<Shop>[]
}

export type UserWithRolesIdsAndShopsIds = {
  user: WithId<User>
  roles_with_permissions: number[]
  shops: number[]
}

export type UserCreate = {
  user: User & { password: string }
  roles_list: number[]
  shops_list: number[]
}

export type UserUpdate = {
  user: WithId<User> & { password?: string }
  roles_list: number[]
  shops_list: number[]
}

export type RoleWithPermissions = {
  role: WithId<Role>
  permissions: WithId<Permission>[]
}
