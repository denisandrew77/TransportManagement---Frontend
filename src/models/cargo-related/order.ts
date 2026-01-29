import type { carrierDetailsForOrder } from './carrierForOrder'
import type { goods } from './goods'
import type { delivery, loading } from './loadingAndDelivery'

export interface cargoOrder {
  orderNumber: number
  client: string
  clientRefference: string
  loading: loading
  delivery: delivery
  goods: goods[]
  observations: string
  currentCarrier: carrierDetailsForOrder
  carriers: carrierDetailsForOrder[]
}
