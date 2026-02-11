import type { carrierContact } from "./carrierContact"

export interface carrier {
  fiscalCode: string
  fiscalName: string
  orc: string
  commercialName: string
  country: string
  currency: string
  capital: string
  registered: string
  postalCode: string
  county: string
  address: string
  city: string
  swift: string
  phoneNumber: string
  bankName: string
  iban: string
  vatPercentage: number
  contact: {
    name: string,
    phoneNumber: string,
    email: string
  },
  contacts: carrierContact[],
}
