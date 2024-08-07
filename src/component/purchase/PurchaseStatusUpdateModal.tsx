import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from "@chakra-ui/react"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { PurchaseStatus } from "constant/purchaseStatus"
import { ChangeEvent, FC, useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { usePurchaseUpdateMutation } from "service/purchase/purchase"
import { titleCase } from "title-case"
import { ModalProps } from "type/modalProps"
import { Purchase } from "type/purchase/purchase"
import { WithId } from "type/withId"
import { timestampToDateAsString } from "util/formatting"
import { notify } from "util/toasts"

interface PurchaseStatusUpdateModalProps extends ModalProps {
  purchase: WithId<Purchase>
  prevStatus: string
}

export const PurchaseStatusUpdateModal: FC<PurchaseStatusUpdateModalProps> = (
  props,
) => {
  const { purchase, prevStatus, isOpen, onClose } = props

  const [newStatus, setNewStatus] = useState<string>(prevStatus)
  const [newDeadline, setNewDeadline] = useState<string>(
    timestampToDateAsString(purchase.deadline),
  )

  const purchaseUpdateMutation = usePurchaseUpdateMutation()

  const isLoading = purchaseUpdateMutation.isLoading

  const isStatusInvalid = !newStatus.trim()
  const isDeadlineInvalid = !newDeadline.trim()

  const isSaveBtnDisabled = isStatusInvalid || isDeadlineInvalid

  const handleNewStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value
    setNewStatus(status)
  }

  const handleNewDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewDeadline(value)
  }

  const onPurchaseStatusUpdate = async () => {
    const formattedDeadline = new Date(newDeadline).getTime() / 1000

    const body: WithId<Purchase> = {
      id: purchase.id,
      amount: purchase.amount,
      status: newStatus,
      deadline: formattedDeadline,
    }

    await purchaseUpdateMutation.mutateAsync(body)

    notify(`Purchase #${purchase.id} was updated successfully`, "success")
    onClose()
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>Update Purchase Status & Deadline</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex w="full" direction="column" gap={5}>
            {/* New Status */}
            <Flex alignItems="center" gap={5}>
              <Input value={titleCase(prevStatus)} type="text" isDisabled />

              {/* Arrow Icon */}
              <Flex>
                <FiArrowRight />
              </Flex>

              {/* New Status Select */}
              <Select
                placeholder="Select new status"
                value={newStatus}
                onChange={handleNewStatusChange}
                isInvalid={isStatusInvalid}
                isDisabled={isLoading}
              >
                {Object.values(PurchaseStatus).map((status, index) => (
                  <option key={index} value={status}>
                    {titleCase(status)}
                  </option>
                ))}
              </Select>
            </Flex>

            {/* Deadline Input */}
            <Input
              placeholder="New deadline"
              value={newDeadline}
              type="date"
              onChange={handleNewDeadlineChange}
              isInvalid={isDeadlineInvalid}
              isDisabled={isLoading}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onPurchaseStatusUpdate}
              isLoading={isLoading}
              isDisabled={isSaveBtnDisabled}
            >
              Save
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
