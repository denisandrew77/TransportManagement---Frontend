export interface individualCarrierPrice {
highways: number
waiting: number
hotel: number
carrierPrice: number
totalCarrierPrice: number
}
export interface finalPrice{
  totalCarriersPrice: number
  clientPrice: number
}

export interface routeAndPriceDetails extends individualCarrierPrice, finalPrice{

}
