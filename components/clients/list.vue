
<template>
  <div>
    <div class="flex justify-between max-sm:flex-col md:flex-row py-3 border-b border-blue-200 dark:border-blue-700">
      <UInput 
        v-model="search"
        :ui="{
          color: {
            white: {
              outline: 'bg-gray-700 ring-gray-700 focus:ring-1 focus:ring-blue-400 text-gray-300'
            }
          }
        }"
        placeholder="Filtrar cliente" 
      />
      <div>
        <URadioGroup
          v-model="filterSelected"
          :ui="{
            legend: 'text-blue-300',
          }"
          :uiRadio="{
            label: 'text-gray-300'
          }"
          :options="optionsRadio"
          class="radio-group max-sm:pt-8"  
          color="blue"
          legend="Filtros avançados:"
        />
      </div>
    </div>

    <UTable :ui="{
      divide: 'divide-gray-700',
      tbody: 'divide-gray-800',
      th: {
        color: 'text-blue-300'
      },
      td: {
        color: 'divide-blue-400 text-gray-300'
      }
    }" 
    :rows="filteredClients" 
    :columns="columns" 
  >
    <template #active-data="{ row }">
      <span>{{ Boolean(row.active) ? 'Sim' : 'Não' }}</span>
    </template>

    <template #actions-data="{ row }">
      <div class="flex">
        <ClientsEdit :data="row"/>

        <UButton
          icon="i-heroicons-trash"
          size="sm"
          color="red"
          square
          variant="link"
          @click="deleteClient(row)"
        />

      </div>
    </template>
  </UTable>
  </div>
</template>

<script setup>
const filterSelected = ref('all')
const { allClients } = useClientsStore()
const optionsRadio = [
  { 
    value: 'all', 
    label: 'Todos' 
  }, 
  { 
    value: true, 
    label: 'Ativos' 
  }, 
  { 
    value: false, 
    label: 'Inativos' 
  }
]

const columns = [
  {
    key: 'id',
    label: 'ID'
  }, 
  {
    key: 'name',
    label: 'Nome'
  }, 
  {
    key: 'document',
    label: 'Documento'
  }, 
  {
    key: 'email',
    label: 'Email'
  }, 
  {
    key: 'phone',
    label: 'Telefone'
  }, 
  {
    key: 'active',
    label: 'Ativo?'
  },
  {
    key: 'actions',
    label: 'Ações'
  }
]

const search = ref('')

const filteredClients = computed(() => {
  if (!search.value && filterSelected.value === 'all') {
    return allClients
  }

  if (filterSelected.value === true) {
    return allClients.filter(item => item.active)
  }

  if (filterSelected.value === false) {
    return allClients.filter(item => !item.active)
  }
  
  return allClients.filter((item) => {  
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase())
    })
  })
})

const deleteClient = (client) => {
  const { deleteClient } = useClientsStore()
  deleteClient(client)
}

</script>

<style lang="scss" scoped>
::v-deep .radio-group {
  fieldset {
    display: flex;
    align-items: center;
    gap: 8px;
    legend {
      display: contents;
    }
  }
}
</style>