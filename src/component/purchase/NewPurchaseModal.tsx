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
  Text,
} from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier/supplier"
import { ModalBackgroundBlur } from "component/ModalBackgroundBlur"
import { CommentInput } from "component/comment/Comment"
import { PurchaseGoodsTable } from "component/purchaseGood/PurchaseGoodsTable"
import { PurchaseStatus } from "constant/purchaseStatus"
import { useCommentInput } from "hook/useCommentInput"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { usePurchaseCreateMutation } from "service/purchase/purchase"
import { ModalProps } from "type/modalProps"
import { PurchaseCreate, PurchaseCreateWithGoods } from "type/purchase/purchase"
import { PurchaseGood } from "type/purchase/purchaseGood"
import { SupplierWithManagers } from "type/supplier/supplier"
import {
  dateAsStringToTimestamp,
  timestampToDateAsString,
} from "util/formatting"
import { notify } from "util/toasts"

interface NewPurchaseModalProps extends ModalProps {}

const newPurchase: PurchaseCreate = {
  supplier_manager_id: NaN,
  deadline: Math.floor(Date.now() / 1000),
  amount: NaN,
  status: PurchaseStatus.Order,
}

export const NewPurchaseModal: FC<NewPurchaseModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [purchase, setPurchase] = useState<PurchaseCreate>(newPurchase)
  const [supplierId, setSupplierId] = useState<number>(0)
  const [goods, setGoods] = useState<PurchaseGood[]>([])
  const [deadline, setDeadline] = useState<string>(
    timestampToDateAsString(newPurchase.deadline),
  )

  const purchaseCreateMutation = usePurchaseCreateMutation()

  const { data: suppliersList, isLoading: isSuppliersLoading } = useQuery<
    SupplierWithManagers[]
  >("suppliersList", getAllSuppliers)

  const selectedSupplier = suppliersList?.find(
    (supplier) => supplier.id === supplierId,
  )
  const managersList = selectedSupplier?.managers

  const { comment, handleCommentChange, onCommentSubmit, isCommentLoading } =
    useCommentInput({
      objectName: "purchase",
    })

  const isLoading = purchaseCreateMutation.isLoading

  const isManagerSelectDisabled = supplierId === 0
  const isSaveBtnDisabled =
    isLoading ||
    isManagerSelectDisabled ||
    !purchase.supplier_manager_id ||
    goods.length === 0 ||
    !deadline.trim()

  const handleSupplierUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value)
    setSupplierId(value)
  }

  const handlePurchaseUpdate = (param: string, value: number | string) => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      [param]: value,
    }))
  }

  const onPurchaseCreate = async () => {
    // Count full purchase amount
    const goodsAmountSum = goods.reduce(
      (sum, good) => sum + (good.amount || 0),
      0,
    )

    const formattedDeadline = dateAsStringToTimestamp(deadline)

    const body: PurchaseCreateWithGoods = {
      purchase: {
        ...purchase,
        amount: goodsAmountSum,
        deadline: formattedDeadline,
      },
      goods,
    }

    const { id: purchaseId } = await purchaseCreateMutation.mutateAsync(body)

    await onCommentSubmit(purchaseId)

    notify("Purchase created successfully", "success")
    onClose()
  }

  useEffect(() => {
    setPurchase(newPurchase)
    setGoods([])
  }, [isOpen])

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalBackgroundBlur />

      <ModalContent>
        <ModalHeader>New Purchase</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={10}>
            <PurchaseGoodsTable goods={goods} setGoods={setGoods} />

            {/* Supplier and Manager */}
            <Flex w="full" gap={10}>
              {/* Supplier Select */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Supplier:</Text>

                <Select
                  placeholder="Select supplier"
                  isDisabled={isSuppliersLoading}
                  value={supplierId}
                  onChange={handleSupplierUpdate}
                >
                  {suppliersList?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Flex>

              {/* Manager Select */}
              <Flex w="full" direction="column" gap={1}>
                <Text fontWeight="bold">Manager:</Text>

                <Select
                  placeholder="Select manager"
                  isDisabled={isManagerSelectDisabled}
                  value={purchase.supplier_manager_id}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    handlePurchaseUpdate("supplier_manager_id", value)
                  }}
                >
                  {managersList?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>

            {/* Deadline */}
            <Flex w="full" direction="column" gap={1}>
              <Text fontWeight="bold">Deadline:</Text>

              <Input
                placeholder="Deadline"
                value={deadline}
                type="date"
                onChange={(e) => {
                  const value = e.target.value
                  setDeadline(value)
                }}
              />
            </Flex>

            {/* Comment */}
            <CommentInput
              comment={comment}
              handleCommentChange={handleCommentChange}
              isDisabled={isCommentLoading}
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex gap={5}>
            <Button
              onClick={onPurchaseCreate}
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
