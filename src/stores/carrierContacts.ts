import type { carrierContact } from "@/models/cargo-related/carrierContact";
import { defineStore } from "pinia";

export const useCarrierContacts = defineStore("carrierContacts",{
  state: (): carrierContact[] => ([] as carrierContact[]),
  actions:{

  }
})
