import type { statusDbData } from "../dbData/statusDbData";

export interface orderTableColumn{
  orderNumber: number,
  plateNumber: string[],
  carrier: string[],
  clientNumber: string,
  client: string,
  loading: string[],
  delivery: string[],
  status: statusDbData,
  info: string[],
}
