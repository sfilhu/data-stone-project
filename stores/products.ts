import { Product } from "../interfaces/products";

let generateID = 0

export const useProductsStore = defineStore('products', () => {
  const allProducts = ref<Product[]>([])
  const saveProduct = (product:Product) => { 
    product.id = generateID++
    allProducts.value.push(product) 
  }

  const editProduct = (product:Product) => {  
    const { id } = product
    const index = allProducts.value.findIndex(item => item.id === id);
    allProducts.value.splice(index, 1, product);
  }

  const deleteProduct = (product:Product) => {  
    const { id } = product
    const index = allProducts.value.findIndex(item => item.id === id);
    allProducts.value.splice(index, 1);
  }

  return { allProducts, saveProduct, editProduct, deleteProduct}
},{
  persist: {
    storage: persistedState.localStorage
  }
});