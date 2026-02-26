import type { carrierDetailsForOrder } from './carrierForOrder'
import type { goods } from './goods'
import type { delivery, loading } from './loadingAndDelivery'
import type { finalPrice, individualCarrierPrice } from './priceAndTimeCalculation'

export interface cargoOrder {
  orderNumber: number
  client: string
  clientRefference: string
  loading: loading
  delivery: delivery
  goods: goods[]
  observations: string
  currentCarrier: carrierDetailsForOrder & individualCarrierPrice
  carriers: (carrierDetailsForOrder & individualCarrierPrice)[]
  finalPrice: finalPrice
}
