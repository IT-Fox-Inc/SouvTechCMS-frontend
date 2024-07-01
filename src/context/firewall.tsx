import { configuration } from "configuration"
import { useUserContext } from "context/user"
import { Navigate, useLocation } from "react-router-dom"
import { FCC } from "type/FCC"

const noAccessPage = configuration.sidebarItems.find(
  (page) => page.name === "NoAccess"
)!

// const noAccessPagePath = "/noaccess"
const noAccessPagePath = noAccessPage.path

export const Firewall: FCC = (props) => {
  const { children } = props

  const location = useLocation()
  const currentPath = location.pathname

  const { roles, isUserAdmin } = useUserContext()

  // if (currentPath === noAccessPagePath) {
  //   return <>LOX</>
  // }

  const page = configuration.sidebarItems.find(
    (page) => page.path === currentPath
  )

  const isUserHasPageRole =
    !!page?.role && roles?.includes(page.role.toLowerCase())

  const isUserCanAccessPage = isUserHasPageRole || isUserAdmin
  console.log(page?.role)
  console.log(roles)
  console.log(isUserHasPageRole)
  console.log(isUserAdmin)
  console.log(isUserCanAccessPage)

  if (!page || isUserCanAccessPage) {
    return <>{children}</>
  }

  return <Navigate to={noAccessPagePath} state={{ from: location }} replace />
  // return <NoAccess />
}
