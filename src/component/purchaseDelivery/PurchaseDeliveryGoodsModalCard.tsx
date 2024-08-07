import { Badge, Card, CardHeader, Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import { PurchaseDelivereryGood } from "type/purchaseDelivery/purchaseDelivereryGood"
import { WithId } from "type/withId"

interface PurchaseDeliveryGoodsModalCardProps {
  good: WithId<PurchaseDelivereryGood>
}

export const PurchaseDeliveryGoodsModalCard: FC<
  PurchaseDeliveryGoodsModalCardProps
> = (props) => {
  const { good } = props

  const purchaseGood = good.purchase_good

  // const { setQuery } = useSearchContext()
  // const { setTabIndex } = usePurchaseTabsContext()

  // const handlePurchaseOpen = (goodName: string) => {
  //   setQuery(goodName)
  //   setTabIndex(0)
  // }

  return (
    <Card boxShadow="md" borderRadius={10}>
      <CardHeader>
        <Flex direction="column" gap={2}>
          {/* Good Info */}
          <Flex justifyContent="space-between">
            <Flex direction="column" gap={2}>
              {/* Purchase ID Badge */}
              <Flex>
                <Badge colorScheme="blue">
                  Purchase #{purchaseGood.purchase_id}
                </Badge>
              </Flex>

              <Flex alignItems="center" gap={5}>
                <Heading size="md">
                  #{good.id} {purchaseGood.name}
                </Heading>
              </Flex>

              <Text fontSize="sm" fontStyle="italic" color="gray">
                {purchaseGood.description}
              </Text>
            </Flex>

            {/* Side Badges */}
            <Flex direction="column" gap={3}>
              <Badge fontSize="sm">Quantity: {good.quantity}</Badge>
              <Badge fontSize="sm">Unit Price: ${good.price_per_item}</Badge>
              <Badge fontSize="sm">Amount: ${good.amount}</Badge>
            </Flex>
          </Flex>

          {/* Find in purchases Btn */}
          {/* <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => handlePurchaseOpen(good.name)}
          >
            Find this good in purchases
          </Button> */}
        </Flex>
      </CardHeader>
    </Card>
  )
}
