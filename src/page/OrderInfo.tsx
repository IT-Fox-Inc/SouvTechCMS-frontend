import { Divider, Flex, Grid, GridItem, Heading } from "@chakra-ui/react"
import { getOrderById } from "api/order/order"
import { GoodInOrderCard } from "component/order/GoodInOrderCard"
import { OrderProperties } from "component/order/OrderProperties"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { OrderWithGoods } from "type/order/order"
import { PageProps } from "type/page/page"

type OrderInfoParams = {
  id: string
}

export const OrderInfo = (props: PageProps) => {
  const { guideNotionPageId } = props

  const { id } = useParams<OrderInfoParams>()
  const orderId = Number(id)

  const { data: orderData, isLoading } = useQuery<OrderWithGoods>(
    ["order", orderId],
    () => getOrderById(orderId),
    {
      enabled: orderId > 0,
    },
  )
  const isOrderExists = orderData !== undefined
  const orderGoods = orderData?.order_goods

  return (
    <Page guideNotionPageId={guideNotionPageId}>
      <PageHeading title={`Order #${orderId}`} isSearchHidden />

      {isLoading && <LoadingPage />}

      {isOrderExists && (
        <Flex direction="column" justifyContent="flex-start" gap={10}>
          {/* Order Properties */}
          <OrderProperties order={orderData.order} />

          <Divider borderWidth={1} />

          <Flex direction="column" gap={5}>
            <Heading size="lg">Goods in Order</Heading>

            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {orderGoods?.map((good, index) => (
                <GridItem key={index}>
                  <GoodInOrderCard good={good} />
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Flex>
      )}
    </Page>
  )
}
