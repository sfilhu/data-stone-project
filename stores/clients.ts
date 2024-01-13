import { Client } from "../interfaces/clients";

let generateID = 0

export const useClientsStore = defineStore('clients', () => {
  const allClients = ref<Client[]>([])
  
  const saveClient = (client:Client) => { 
    client.id = generateID++
    allClients.value.push(client) 
  }
  
  const editClient = (client:Client) => {  
    const { id } = client
    const index = allClients.value.findIndex(item => item.id === id);
    allClients.value.splice(index, 1, client);
  }

  const deleteClient = (client:Client) => {  
    const { id } = client
    const index = allClients.value.findIndex(item => item.id === id);
    allClients.value.splice(index, 1);
  }

  return { allClients, saveClient, editClient, deleteClient}
},{
  persist: {
    storage: persistedState.localStorage
  }
});