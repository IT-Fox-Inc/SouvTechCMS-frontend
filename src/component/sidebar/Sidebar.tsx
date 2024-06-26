import { Button, Flex, Heading } from "@chakra-ui/react"
import { SidebarListItem } from "component/sidebar/SidebarListItem"
import { configuration } from "configuration"
import { useAuthContext } from "context/auth"
import { useUserContext } from "context/user"
import { FC } from "react"

export const Sidebar: FC = () => {
  const { signOut } = useAuthContext()

  const { roles, isUserAdmin } = useUserContext()

  const sideBarRoutes = configuration.sidebarItems.filter(
    ({ type, component, role }) =>
      type === "main" &&
      component &&
      ((role && roles?.includes(role.toLowerCase())) || isUserAdmin)
  )

  return (
    <Flex
      bg="gray.200"
      w="16%"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      py={5}
      px={2}
      gap={10}
    >
      {/* TODO: replace this with logo image */}
      <Heading w="full" textAlign="center">
        Logo
      </Heading>

      <Flex direction="column" w="full" gap={2}>
        {sideBarRoutes.map(({ icon, name, path }) => (
          <SidebarListItem key={name} icon={icon!} text={name!} to={path} />
        ))}
      </Flex>

      <Button
        w="full"
        variant="solid"
        colorScheme="blue"
        mt="auto"
        onClick={signOut}
      >
        Выход
      </Button>
    </Flex>
  )
}
