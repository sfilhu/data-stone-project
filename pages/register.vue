<template>
  <div>
    <h1 class="text-center text-2xl text-white py-5">Cadastro</h1>
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
      <template #client="{ item }">
        <UCard 
          @submit.prevent="onSubmitClient" 
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
            v-for="(formGroup, index) in structClientForm"
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
            >
              {{ formGroup.value }}
            </UToggle>
          </UFormGroup>

          <!-- Footer -->
          <template #footer>
            <UButton type="submit" color="violet">
              Salvar
            </UButton>
          </template>
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
            v-for="(formGroup, index) in structProductForm"
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
      label: 'Cliente',
      description: 'Cadastro de clientes',
      icon: 'i-heroicons-information-circle'
    }, 
    {
      slot: 'product',
      label: 'Produto',
      description: 'Cadastro de prdutos',
      icon: 'i-heroicons-information-circle'
    }
  ];

  const structClientForm = reactive([
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
      value: ''
    },
    {
      label: 'Documento',
      name: 'document',
      type: 'number',
      value: ''
    },
    {
      label: 'Telefone',
      name: 'phone',
      type: 'phone',
      value: ''
    },
    {
      label: 'E-mail',
      name: 'email',
      type: 'email',
      value: ''
    },
    {
      label: 'Ativo',
      name: 'active',
      type: null,
      active: false
    }
  ])

  const structProductForm = reactive([
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
      value: ''
    },
    {
      label: 'Ativo',
      name: 'active',
      type: null,
      active: false
    }
  ])
  
  const modelClientForm = reactive({ 
    name: '', 
    doc: '',  
    phone: '',
    email: '',
    active: ''
  })
  
  const modelProductForm = reactive({ 
    name: '', 
    active: '' 
  })

  function onSubmitClient () {
    console.log('Submitted form:', modelClientForm)
  }

  function onSubmitProduct () {
    console.log('Submitted form:', modelProductForm)
  }
</script>

<style lang="scss" scoped>
.footer {
  background: red;
}
</style>


