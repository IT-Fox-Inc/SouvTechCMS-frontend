import { FullPurchase } from "type/purchase/purchase"
import { PurchaseFile } from "type/purchase/purchaseFile"
import {
  PurchaseDelivereryGood,
  PurchaseDelivereryGoodCreate,
} from "type/purchaseDelivery/purchaseDelivereryGood"

import { WithId } from "type/withId"

export type PurchaseDelivery = {
  deadline: number
  status: string
  shipping: number
  after_custom_shipping?: number
  track_number?: string
  after_custom_track_number?: string
  updated_at?: number
  created_at?: number
}

export type FullPurchaseDelivery = WithId<PurchaseDelivery> & {
  goods: WithId<PurchaseDelivereryGood>[]
  files: WithId<PurchaseFile>[]
  purchases: Omit<FullPurchase, "goods">[]
}

export type PurchaseDeliveryCreate = {
  purchase_delivery: PurchaseDelivery
  purchase_goods: PurchaseDelivereryGoodCreate[]
}
