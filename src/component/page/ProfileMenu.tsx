import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { CommingSoonTooltip } from "component/CommingSoonTooltip"
import { useAuthContext } from "context/auth"
import { useUserContext } from "context/user"
import { FC } from "react"
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi"

export const ProfileMenu: FC = () => {
  const { currentUser, isLoadingCurrentUser } = useUserContext()
  const { signOut } = useAuthContext()

  return (
    <Menu>
      <MenuButton>
        <Avatar
          size="md"
          bgColor="white"
          name={currentUser?.fio || currentUser?.username}
        />
      </MenuButton>

      <MenuList>
        <MenuItem
          icon={<FiUser />}
          isDisabled
          // onClick={}
          // isDisabled={isLoadingCurrentUser}
        >
          <CommingSoonTooltip>Profile</CommingSoonTooltip>
        </MenuItem>

        <MenuItem
          icon={<FiSettings />}
          isDisabled
          // onClick={}
          // isDisabled={isLoadingCurrentUser}
        >
          <CommingSoonTooltip>Settings</CommingSoonTooltip>
        </MenuItem>

        <MenuItem
          icon={<FiLogOut />}
          color="red"
          onClick={signOut}
          isDisabled={isLoadingCurrentUser}
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
