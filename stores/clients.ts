import { Client } from "../interfaces/clients";

export const useClientsStore = defineStore('clients', () => {
  const allClients = ref<Client[]>([])
  const saveClient = (client:Client) => { allClients.value.push(client) }
  return { allClients, saveClient}
},{
  persist: {
    storage: persistedState.localStorage
  }
});