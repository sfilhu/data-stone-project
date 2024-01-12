
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
          :ui="{
            legend: 'text-blue-300',
          }"
          :uiRadio="{
            label: 'text-gray-300'
          }"
          :options="optionsRadio"
          class="radio-group max-sm:pt-8"  
          color="blue"
          model-value="all"
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
  </UTable>
  </div>
</template>

<script setup>
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
  }
]

const search = ref('')

const filteredClients = computed(() => {
  if (!search.value) {
    return allClients
  }

  return allClients.filter((person) => {
    return Object.values(allClients).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase())
    })
  })
})

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