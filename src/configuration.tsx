import { Role } from "constant/roles"
import { Auth } from "page/Auth"
import { NoAccess } from "page/NoAccess"
import { NotFound } from "page/NotFound"
import { Reports } from "page/Reports"
import { Users } from "page/Users"
import { IconType } from "react-icons"
import { FiBox, FiFileText, FiHome, FiMap, FiUsers } from "react-icons/fi"
import { getApiBaseUrl } from "util/apiBaseUrl"

type Route = {
  index?: boolean
  type: "main" | "side"
  icon?: IconType
  name: string
  path: string
  component?: JSX.Element
  role?: Role
}

export const configuration = {
  isDevEnv: process.env.NODE_ENV === "development",
  sidebarItems: [
    //* Main pages
    {
      index: true,
      type: "main",
      icon: FiHome,
      name: "Главная",
      path: "/",
      role: Role.MANAGER,
    },
    {
      type: "main",
      icon: FiFileText,
      name: "Отчёты",
      path: "/reports",
      role: Role.MANAGER,
      component: <Reports />,
    },
    {
      type: "main",
      icon: FiBox,
      name: "Склад",
      path: "/storage",
      role: Role.STORAGER,
    },
    {
      type: "main",
      icon: FiUsers,
      name: "Сотрудники",
      path: "/users",
      role: Role.ADMIN,
      component: <Users />,
    },
    {
      type: "main",
      icon: FiMap,
      name: "Логи",
      path: "/logs",
      role: Role.ADMIN,
    },
    //* Side pages
    {
      type: "side",
      name: "Авторизация",
      path: "/auth",
      component: <Auth />,
    },
    {
      type: "side",
      name: "NotFound",
      path: "/*",
      component: <NotFound />,
    },
    {
      type: "side",
      name: "NoAccess",
      path: "/noaccess",
      component: <NoAccess />,
    },
  ] as Route[],
  api: {
    baseUrl: getApiBaseUrl(),
  },
}
