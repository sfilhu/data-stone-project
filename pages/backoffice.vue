<template>
  <div>
    <h1 class="text-center text-2xl text-white py-5">Backoffice</h1>
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
      <template #product="{ item }">
        <UCard 
          @submit.prevent="onSubmitProduct" 
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
          <!-- Header -->
          <template #header>
            <p class="text-base font-semibold leading-6 text-violet-400 dark:text-white">
              {{ item.description }}
            </p>
          </template>
          
          <!-- Body/Form -->
          <UFormGroup 
            v-for="(formGroup, index) in fieldsProductForm"
            :key="index"
            :ui="{
              label: {
                base: 'text-violet-400',
              }
            }"
            :label="formGroup.label" 
            :name="formGroup.name" 
            class="mb-3"
          >
            
            <UInput 
              v-if="formGroup.type"
              v-model="formGroup.value"
              :ui="{
                color: {
                  white: {
                    outline: 'bg-gray-900 ring-gray-900 focus:ring-1 focus:ring-violet-400 text-gray-300'
                  }
                }
              }"
              :type="formGroup.type"
            />

            <UToggle 
              v-else 
              v-model="formGroup.active" 
              color="violet"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
            />
          </UFormGroup>

          <!-- Footer -->
          <template #footer>
            <UButton type="submit" color="violet">
              Salvar
            </UButton>
          </template>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
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

  const fieldsProductForm = reactive([
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
      value: ''
    },
    {
      label: 'Ativo',
      name: 'active',
      type: '',
      active: false
    }
  ])

  function onSubmitProduct () {
    const { saveProduct } = useProductsStore()
    const handleProduct = fieldsProductForm.map(item => ({[item.name]: (item.value || '') || item.active }))
    const clientModel = Object.assign({}, ...handleProduct)
    saveProduct(clientModel)
  }
</script>
