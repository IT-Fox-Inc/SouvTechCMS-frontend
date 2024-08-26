import { Permission } from "constant/permissions"
import { TableContextProvider } from "context/table"
import { Auth } from "page/Auth"
import { Dashboard } from "page/Dashboard"
import { DetailedReports } from "page/DetailedReports"
import { Goods } from "page/Goods"
import { Guides } from "page/Guides"
import { NoAccess } from "page/NoAccess"
import { OrderInfo } from "page/OrderInfo"
import { Orders } from "page/Orders"
import { ProductionInfo } from "page/ProductionInfo"
import { Purchases } from "page/Purchases"
import { PurchasesHistory } from "page/PurchasesHistory"
import { Storage } from "page/Storage"
import { StorageGoodDetails } from "page/StorageGoodDetails"
import { Suppliers } from "page/Suppliers"
import { Users } from "page/Users"
import { IconType } from "react-icons"
import {
  FiFeather,
  FiFileText,
  FiGlobe,
  FiHome,
  FiMap,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiTruck,
  FiUsers,
} from "react-icons/fi"
import { StorageGoodSearchFilter } from "type/storage/storageGood"
import { getApiBaseUrl } from "util/urls"

type Route = {
  index?: boolean
  type: "main" | "child" | "side"
  icon: IconType
  name: string
  path: string
  component?: JSX.Element
  permissions?: Permission[]
  isDisabled?: boolean
}

export const configuration = {
  version: "v0.1.3",
  isDevEnv: process.env.NODE_ENV === "development",
  sidebarItems: [
    //* Main pages
    // Dashboard
    {
      index: true,
      type: "main",
      icon: FiHome,
      name: "Dashboard",
      path: "/",
      permissions: [],
      component: <Dashboard />,
      isDisabled: true,
    },
    // Reports
    {
      type: "main",
      icon: FiFileText,
      name: "Reports",
      path: "/reports",
      permissions: [Permission.REPORT_DETAILED],
      component: (
        <DetailedReports guideNotionPageId="6e72f5362da84a639413014b70ee9f72" />
      ),
    },
    // Orders
    {
      type: "main",
      icon: FiShoppingCart,
      name: "Orders",
      path: "/orders",
      permissions: [Permission.ORDER_READ],
      component: (
        <Orders guideNotionPageId="212db0fd239248e199af5852cdc2a577" />
      ),
    },
    // Order Info
    {
      type: "child",
      name: "Order :id",
      path: "/order/:id",
      permissions: [Permission.ORDER_READ],
      component: <OrderInfo />,
    },
    // Goods
    {
      type: "main",
      icon: FiShoppingBag,
      name: "Goods",
      path: "/goods",
      permissions: [Permission.GOOD_READ],
      component: <Goods guideNotionPageId="439359fa5d974bd8a28d613099f95af1" />,
    },
    // Purchases
    {
      type: "main",
      icon: FiTruck,
      name: "Purchases",
      path: "/purchases",
      permissions: [Permission.PURCHASE_READ],
      component: (
        <Purchases guideNotionPageId="b3f24fd720134abdb5e58ebd3531db36" />
      ),
    },
    // Purchases History
    {
      type: "child",
      name: "Purchases",
      path: "/purchases/history",
      permissions: [Permission.PURCHASE_READ],
      component: <PurchasesHistory />,
    },
    // Suppliers
    {
      type: "main",
      icon: FiGlobe,
      name: "Suppliers",
      path: "/suppliers",
      permissions: [Permission.SUPPLIER_READ],
      component: (
        <Suppliers guideNotionPageId="ec6080ea1f374005a5e5c1ba1cfdb58a" />
      ),
    },
    // Storage
    {
      type: "main",
      icon: FiPackage,
      name: "Storage",
      path: "/storage",
      permissions: [Permission.STORAGE_READ],
      component: (
        <TableContextProvider<StorageGoodSearchFilter>>
          <Storage guideNotionPageId="3ff859e583d645ea85f630d3f4697cde" />,
        </TableContextProvider>
      ),
    },
    // Storage Good Details
    {
      type: "child",
      name: "Storage Good :id",
      path: "/storage-good/:id",
      permissions: [Permission.STORAGE_READ],
      component: <StorageGoodDetails />,
    },
    // Production Info
    {
      type: "main",
      icon: FiFeather,
      name: "Production Info",
      path: "/production-info",
      permissions: [Permission.PRODUCTION_INFO_READ],
      component: (
        <ProductionInfo guideNotionPageId="3120cc3e2bee43e894b2ab32553e3b5e" />
      ),
    },
    // Employees
    {
      type: "main",
      icon: FiUsers,
      name: "Employees",
      path: "/users",
      permissions: [],
      component: <Users guideNotionPageId="57b7bd55eab24fd89a2692f2296560c8" />,
    },
    // Logs
    {
      type: "main",
      icon: FiMap,
      name: "Logs",
      path: "/logs",
      permissions: [],
    },
    //* Side pages
    // Auth
    {
      type: "side",
      name: "Auth",
      path: "/auth",
      component: <Auth />,
    },
    // NoAccess
    {
      type: "side",
      name: "NoAccess",
      path: "/noaccess",
      component: <NoAccess />,
    },
    // Guide
    {
      type: "child",
      name: "Guide",
      path: "/guide/:id",
      component: <Guides />,
    },
  ] as Route[],
  api: {
    baseUrl: getApiBaseUrl(),
  },
}
