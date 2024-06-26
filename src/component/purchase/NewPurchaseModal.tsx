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
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier"
import { getManagersBySupplierId } from "api/supplierManager"
import { GoodsTable } from "component/good/GoodsTable"
import { PurchaseStatus } from "constant/purchaseStatus"
import { FC, useState } from "react"
import { useQuery } from "react-query"
import { usePurchaseGoodCreateMutation } from "service/good"
import { usePurchaseCreateMutation } from "service/purchase"
import { Purchase } from "type/purchase"
import { PurchaseGood } from "type/purchaseGood"
import { Supplier } from "type/supplier"
import { SupplierManager } from "type/supplierManager"
import { WithId } from "type/withId"
import { notify } from "util/toasts"

interface NewPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

const newPurchase: Purchase = {
  supplier_id: 0,
  supplier_manager_id: 0,
  deadline: Math.floor(Date.now() / 1000),
  amount: 0,
  shipping: 0,
  status: PurchaseStatus.Order,
}

export const NewPurchaseModal: FC<NewPurchaseModalProps> = (props) => {
  const { isOpen, onClose } = props

  const [purchase, setPurchase] = useState<Purchase>(newPurchase)
  const [goods, setGoods] = useState<PurchaseGood[]>([])
  const [deadline, setDeadline] = useState<string>()

  const purchaseCreateMutation = usePurchaseCreateMutation()
  const purchaseGoodCreateMutation = usePurchaseGoodCreateMutation()

  const { data: suppliersList, isLoading: isSuppliersLoading } = useQuery<
    WithId<Supplier>[]
  >("suppliersList", getAllSuppliers)

  const { data: managersList, isLoading: isManagersLoading } = useQuery<
    WithId<SupplierManager>[]
  >(
    ["suppliersList", purchase.supplier_id],
    () => getManagersBySupplierId(purchase.supplier_id!),
    { enabled: !!purchase.supplier_id }
  )

  const isManagerSelectDisabled = isManagersLoading || !purchase.supplier_id
  const isSaveBtnDisabled =
    !purchase.supplier_id || !purchase.supplier_manager_id || goods.length === 0

  const handlePurchaseUpdate = (param: string, value: number | string) => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      [param]: value,
    }))
  }

  const onPurchaseCreate = async () => {
    const goodsAmountSum = goods.reduce(
      (sum, good) => sum + (good.amount || 0),
      0
    )
    const body = {
      ...purchase,
      amount: goodsAmountSum,
    }
    const { id: purchaseId } = await purchaseCreateMutation.mutateAsync(body)

    goods.forEach(async (good) => {
      const body: PurchaseGood = {
        ...good,
        purchase_id: purchaseId,
      }
      await purchaseGoodCreateMutation.mutateAsync(body)
    })

    notify("Purchase created successfully", "success")
  }

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />

        <ModalContent>
          <ModalHeader>New Purchase</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex direction="column" gap={10}>
              <GoodsTable goods={goods} setGoods={setGoods} />

              {/* Supplier and Manager */}
              <Flex w="full" gap={10}>
                {/* Supplier Select */}
                <Flex w="full" direction="column" gap={1}>
                  <Text fontWeight="bold">Supplier:</Text>

                  <Select
                    placeholder="Select supplier"
                    isDisabled={isSuppliersLoading}
                    value={purchase.supplier_id}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      handlePurchaseUpdate("supplier_id", value)
                    }}
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

              {/* Shipping and Deadline */}
              <Flex w="full" gap={10}>
                {/* Shipping */}
                <Flex w="full" direction="column" gap={1}>
                  <Text fontWeight="bold">Shipping:</Text>

                  <Input
                    placeholder="Shipping"
                    value={purchase.shipping}
                    type="number"
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      handlePurchaseUpdate("shipping", value)
                    }}
                  />
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
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex gap={5}>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={onPurchaseCreate}
                isDisabled={isSaveBtnDisabled}
              >
                Save
              </Button>

              <Button variant="solid" colorScheme="gray" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
