import type { carrierDbData } from "./carrierDbData";
import type { goodsDbData } from "./goodsDbData";

export interface ordersDbData{
  clientName: string,
  clientRefference: string,
  carriers: carrierDbData[],
  goods: goodsDbData[],
  dateCreated: string,
  deliveryAddress: string,
  deliveryCity: string,
  deliveryContacts: string,
  deliveryCountry: string,
  deliveryDate: string,
  deliveryName: string,
  deliveryPostalCode: string,
  deliveryRefferences: string,
  deliveryTime: string,
  loadingAddress: string,
  loadingCity: string,
  loadingContacts: string,
  loadingCountry: string,
  loadingDate: string,
  loadingName: string,
  loadingPostalCode: string,
  loadingRefferences: string,
  loadingTime: string,
  orderNumber: number
}
