<template>
  <div>
    <UButton
      @click="openModal"
      icon="i-heroicons-pencil-square"
      size="sm"
      color="blue"
      square
      variant="link"
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
        @submit.prevent="onSubmitEdit" 
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
              Cadastro de produtos
            </p>
            <UButton color="gray" variant="blue" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
          
        </template>

        <UFormGroup 
            v-for="(formGroup, index) in fieldsProductsForm"
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

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    }
  })

  const fieldsProductsForm = reactive([
    {
      label: 'Nome do produto',
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

  const openModal = () => {
    fieldsProductsForm.forEach((item) => {
      if (item.value === '') {
        item.value = props.data[item.name]
      } else {
        item.active = props.data[item.name]
      }
    });

    isOpen.value = true
  }

  const onSubmitEdit = () => {
    const { editProduct } = useProductsStore()
    const handleProduct = fieldsProductsForm.map(item => ({[item.name]: (item.value || '') || item.active }))
    const product = Object.assign({}, ...handleProduct)
    editProduct({ ...props.data, ...product})
    isOpen.value = false
  }
</script>