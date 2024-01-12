<template>
  <div class="flex flex-row-reverse">
    <UButton 
      label="Cadastrar cliente" 
      color="blue"
      @click="isOpen = true" 
    />

    <UModal 
      v-model="isOpen" 
      :ui="{
        background: 'bg-gray-900',
        overlay: {
          background: 'bg-gray-900/80'
        }
      }"
    >
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
          <div class="flex flex-row justify-between">
            <p class="text-base font-semibold leading-6 text-blue-400 dark:text-white">
              Cadastro de clientes
            </p>
            <UButton color="gray" variant="blue" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
          
        </template>

        <UFormGroup 
            v-for="(formGroup, index) in fieldsClientForm"
            :key="index"
            :ui="{
              label: {
                base: 'text-blue-400',
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
                    outline: 'bg-gray-900 ring-gray-900 focus:ring-1 focus:ring-blue-400 text-gray-300'
                  }
                }
              }"
              :type="formGroup.type"
            />
            
            
            <UToggle 
              v-else 
              v-model="formGroup.active" 
              color="blue"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
            >
              {{ formGroup.value }}
            </UToggle>
          </UFormGroup>

          <!-- Footer -->
          <template #footer>
            <UButton type="submit" color="blue">
              Salvar
            </UButton>
          </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const isOpen = ref(false)

const fieldsClientForm = reactive([
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
      type: '',
      active: false
    }
  ])

const onSubmitClient = () => {
  const { saveClient } = useClientsStore()
  const handleClient = fieldsClientForm.map(item => ({[item.name]: (item.value || '') || item.active }))
  const clientModel = Object.assign({}, ...handleClient)
  saveClient(clientModel)
  isOpen.value = false
}
</script>