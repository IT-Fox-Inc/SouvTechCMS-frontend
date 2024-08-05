import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { FC } from "react"
import { usePurchaseDeleteMutation } from "service/purchase"
import { ModalProps } from "type/modalProps"
import { Purchase } from "type/purchase"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface PurchaseDeleteModalProps extends ModalProps {
  purchase: WithId<Purchase>
}

export const PurchaseDeleteModal: FC<PurchaseDeleteModalProps> = (props) => {
  const { purchase, isOpen, onClose } = props

  const purchaseDeleteMutation = usePurchaseDeleteMutation()

  const isLoading = purchaseDeleteMutation.isLoading

  const onDeleteConfirm = async () => {
    await purchaseDeleteMutation.mutateAsync(purchase.id)

    notify(`Purchase ${purchase.id} was successfully deleted`, "success")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Delete Purchase</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Are you sure you want to delete the purchase</Text>
          <Text fontWeight="bold">#{purchase.id}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              variant="danger"
              onClick={onDeleteConfirm}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Delete
            </Button>

            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
