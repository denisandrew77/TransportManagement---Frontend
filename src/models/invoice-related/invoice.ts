export interface invoice {
    createdAt: string;
    invoiceNumber: number;
    companyName: string;
    issueDate: string;
    dateReceivingInvoice: string;
    dueDate: string;
    delegateName: string;
    identityCard: string;
    delegateVehicle: string;
    delegateDate: string;
    useVat: boolean;
    exchangeRateRonEur: number;
    discount: number;
    discountLabel: string;
    showLabel: boolean;
    exchangeRateUsd: string;
    netCostAmountEur: number;
    grossCostAmountEur: number;
    vatPercentage: number;
    paymentAmount: number;
    paymentDate: string;
}
