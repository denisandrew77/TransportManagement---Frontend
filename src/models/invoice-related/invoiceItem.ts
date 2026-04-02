export interface invoiceItem {
  selected: boolean;
  clientRefference: string;
  route: string;
  orderDate: string;
  netCostAmountEuro: number;
  vatPercentage: number;
  grossCostAmountEuro: number;
  internalOrderNumber: string;
}
