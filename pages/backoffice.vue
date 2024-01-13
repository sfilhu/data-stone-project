<template>
  <div>
    <div class="grid grid-flow-row grid-cols-3 justify-between items-center">
      <div>
        <img :src="logo" class="w-12" />
      </div>
      <h1 class="text-center text-2xl text-white py-5">Backoffice</h1>
      <div class="order-3 flex flex-row-reverse">
        <UButton to="/" color="blue" icon="i-heroicons-home-solid" />
      </div>
    </div>
    <UTabs 
      :ui="{
        list: {
          background: 'bg-gray-800',
          marker: {
            background: 'bg-gray-900'
          },
          tab: {
            base: 'text-white'
          }
        }
      }"
      :items="items" 
      class="w-full" 
    >
      <!-- Client -->
      <template #client>
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
          <template #header>
            <ClientsCreate />
          </template>
          
          <ClientsList />
        </UCard>
      </template>


      <!-- Tab Product -->
      <template #product>
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
          <template #header>
            <ProductsCreate />
          </template>
          
          <ProductsList />
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
  import img from "../assets/images/logo.png"
  const logo = ref(img)
  const items = [
    {
      slot: 'client',
      label: 'Clientes'
    }, 
    {
      slot: 'product',
      label: 'Produtos'
    }
  ];
</script>
