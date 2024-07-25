import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react"
import { CommentTooltip } from "component/CommentTooltip"
import { PurchaseDocumentsModal } from "component/document/PurchaseDocumentsModal"
import { PurchaseDeadlineBadge } from "component/purchase/PurchaseDeadlineBadge"
import { PurchaseDeliveryDeleteModal } from "component/purchaseDelivery/PurchaseDeliveryDeleteModal"
import { PurchaseDeliveryGoodsModal } from "component/purchaseDelivery/PurchaseDeliveryGoodsModal"
import { PurchaseDeliveryModal } from "component/purchaseDelivery/PurchaseDeliveryModal"
import { PurchaseDeliveryRowMenu } from "component/purchaseDelivery/PurchaseDeliveryRowMenu"
import { PurchaseDeliveryToStorageModal } from "component/purchaseDelivery/PurchaseDeliveryToStorageModal"
import { PurchaseGoodCard } from "component/purchaseGood/PurchaseGoodCard"
import { PurchaseDeliveryStatus } from "constant/purchaseStatus"
import { useCommentInput } from "hook/useCommentInput"
import { FC } from "react"
import { FullPurchaseDelivery } from "type/purchaseDelivery"
import { timestampToDate } from "util/formatting"

interface DeliveryColumnCardProps {
  status: PurchaseDeliveryStatus
  deliveryData: FullPurchaseDelivery
}

export const DeliveryColumnCard: FC<DeliveryColumnCardProps> = (props) => {
  const { status, deliveryData } = props

  const delivery = deliveryData.purchase_delivery
  const files = deliveryData.files
  const goods = deliveryData.goods

  const purchaseDeadline = timestampToDate(delivery.deadline)

  const { comment } = useCommentInput({
    objectName: "purchase_delivery",
    objectId: delivery.id,
  })

  const isCommentExists = !!comment.trim()

  const isMoveGoodsToStorageBtnHidden =
    status !== PurchaseDeliveryStatus.OnWayToStorage

  const {
    isOpen: isDocumentsModalOpen,
    onOpen: onDocumentsModalOpen,
    onClose: onDocumentsModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryGoodsStatusModalOpen,
    onOpen: onPurchaseDeliveryGoodsStatusModalOpen,
    onClose: onPurchaseDeliveryGoodsStatusModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryEditModalOpen,
    onOpen: onPurchaseDeliveryEditModalOpen,
    onClose: onPurchaseDeliveryEditModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryDeleteModalOpen,
    onOpen: onPurchaseDeliveryDeleteModalOpen,
    onClose: onPurchaseDeliveryDeleteModalClose,
  } = useDisclosure()

  const {
    isOpen: isPurchaseDeliveryToStorageModalOpen,
    onOpen: onPurchaseDeliveryToStorageModalOpen,
    onClose: onPurchaseDeliveryToStorageModalClose,
  } = useDisclosure()

  return (
    <>
      <Flex
        w="full"
        direction="column"
        bgColor="white"
        p={2}
        borderRadius={10}
        gap={2}
      >
        {/* Purchase Card Header */}
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={2}>
            <AccordionButton p={2} borderRadius={5}>
              <AccordionIcon />
            </AccordionButton>

            {/* Purchase ID */}
            <Text fontSize="lg" fontWeight="semibold">
              #{delivery.id}
            </Text>
          </Flex>

          <Flex alignItems="center" gap={2}>
            {/* Comment */}
            {isCommentExists && <CommentTooltip comment={comment} />}

            <PurchaseDeliveryRowMenu
              onMoveGoodsToStorage={onPurchaseDeliveryToStorageModalOpen}
              onDocuments={onDocumentsModalOpen}
              onGoods={onPurchaseDeliveryGoodsStatusModalOpen}
              onEdit={onPurchaseDeliveryEditModalOpen}
              onDelete={onPurchaseDeliveryDeleteModalOpen}
              isMoveGoodsToStorageBtnHidden={isMoveGoodsToStorageBtnHidden}
            />
          </Flex>
        </Flex>

        {/* Card Content with Goods */}
        <AccordionPanel>
          <Flex direction="column">
            <UnorderedList>
              {goods.map((good, index) => (
                <ListItem key={index}>
                  <PurchaseGoodCard good={good} />
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </AccordionPanel>

        <Flex alignItems="center" px={2} gap={5}>
          <PurchaseDeadlineBadge goods={goods} deadline={purchaseDeadline} />
        </Flex>
      </Flex>

      {/* Purchase Modals */}
      <>
        <PurchaseDeliveryDeleteModal
          purchaseDelivery={delivery}
          isOpen={isPurchaseDeliveryDeleteModalOpen}
          onClose={onPurchaseDeliveryDeleteModalClose}
        />

        <PurchaseDocumentsModal
          purchaseId={delivery.id}
          documents={files}
          isOpen={isDocumentsModalOpen}
          onClose={onDocumentsModalClose}
          isDelivery
        />

        <PurchaseDeliveryGoodsModal
          purchaseDeliveryId={delivery.id}
          goods={goods}
          isOpen={isPurchaseDeliveryGoodsStatusModalOpen}
          onClose={onPurchaseDeliveryGoodsStatusModalClose}
        />

        <PurchaseDeliveryModal
          prevPurchaseDelivery={delivery}
          prevGoods={goods}
          isOpen={isPurchaseDeliveryEditModalOpen}
          onClose={onPurchaseDeliveryEditModalClose}
        />

        <PurchaseDeliveryToStorageModal
          purchaseDelivery={delivery}
          purchaseGoods={goods}
          isOpen={isPurchaseDeliveryToStorageModalOpen}
          onClose={onPurchaseDeliveryToStorageModalClose}
        />
      </>
    </>
  )
}