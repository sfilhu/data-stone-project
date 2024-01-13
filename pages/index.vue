<template>
  <div>
    <div class="grid grid-flow-row grid-cols-3 justify-between items-center">
      <div>
        <img :src="logo" class="w-12" />
      </div>
      <h1 class="text-center text-2xl text-white py-5">Data Stone</h1>
      <div class="flex flex-row-reverse">
        <UButton to="/backoffice" color="blue" icon="i-heroicons-arrow-right" trailing>Backoffice</UButton>
      </div>
    </div>

    <UCard
      :ui="{
        base: 'text-white',
        background: 'bg-dark-secondary',
        divide: 'divide-gray-800',
        ring: 'ring-gray-800',
        footer: {
          base: 'flex flex-row-reverse border-t-0'
        }
      }"
    >
      <UInput 
        v-model="search"
        :ui="{
          color: {
            white: {
              outline: 'bg-gray-700 ring-gray-700 focus:ring-1 focus:ring-blue-400 text-gray-300'
            }
          }
        }"
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="Filtrar cliente" 
        trailing
      />

      <UTable 
        :ui="{
          divide: 'divide-gray-700',
          tbody: 'divide-gray-800',
          th: {
            color: 'text-blue-300'
          },
          td: {
            color: 'divide-blue-400 text-gray-300'
          }
        }" 
        :rows="filteredClients.filter(item => item.active)" 
        :columns="columns" 
      >
        <template #products-data="{ row }">
          <div v-if="row.products.length">
            <UBadge v-for="(item, index) in row.products" :key="index" :label="item.name" class="ml-3" color="blue" />
          </div>
          <div v-else>
            <UBadge label="Nenhum produto associado" class="ml-3" color="red" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup>
  import img from "../assets/images/logo.png"
  const logo = ref(img)
  const { allClients } = useClientsStore()
  const columns = [
    {
      key: 'name',
      label: 'Nome'
    }, 
    {
      key: 'products',
      label: 'Produtos associados'
    }
  ]

  const search = ref('')

  const filteredClients = computed(() => {
    if (!search.value) {
      return allClients
    }

    return allClients.filter((item) => {  
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(search.value.toLowerCase())
      })
    })
  })
</script>
