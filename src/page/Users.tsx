import { SimpleGrid } from "@chakra-ui/react"
import { getAllUsers } from "api/user"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewUserCard } from "component/users/NewUserCard"
import { UserCard } from "component/users/UserCard"
import { Role } from "constant/roles"
import { useSearchContext } from "context/search"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useQuery } from "react-query"
import { UserWithRolesAndShops } from "type/user"

const Users = () => {
  const { query, isQueryExists } = useSearchContext()

  const { data: usersList, isLoading } = useQuery<UserWithRolesAndShops[]>(
    "usersList",
    getAllUsers,
  )

  const filteredUsersList = usersList?.filter(({ user }) =>
    isQueryExists
      ? user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.fio?.toLowerCase().includes(query.toLowerCase()) ||
        user.phone?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
      : usersList,
  )

  return (
    <Page>
      <PageHeading title="Employees" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
          <NewUserCard />

          {filteredUsersList?.map(
            ({ user, roles_with_permissions, shops }, index) => (
              <UserCard
                key={index}
                user={user}
                roles={roles_with_permissions}
                shops={shops}
              />
            ),
          )}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.ADMIN])(Users)
