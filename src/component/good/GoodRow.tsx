import { Flex, IconButton, Td, Tr } from "@chakra-ui/react"
import { FC } from "react"
import { FiTrash2 } from "react-icons/fi"
import { PurchaseGood } from "type/purchaseGood"

interface GoodRowProps {
  good: PurchaseGood
  handleRemoveGood: (good: PurchaseGood) => void
}

export const GoodRow: FC<GoodRowProps> = (props) => {
  const { good, handleRemoveGood } = props

  return (
    <Tr position="relative">
      <Td>{good.name}</Td>
      <Td>${good.price_per_item}</Td>
      <Td>{good.quantity}</Td>
      <Td>${good.amount}</Td>

      <Flex h="full" position="absolute" right={0} alignItems="center">
        <IconButton
          aria-label="remove-good"
          variant="ghost"
          colorScheme="red"
          icon={<FiTrash2 />}
          onClick={() => handleRemoveGood(good)}
        />
      </Flex>
    </Tr>
  )
}
