import { Product } from "../interfaces/products";

export const useProductsStore = defineStore('products', () => {
  const allProducts = ref<Product[]>([])
  const saveProduct = (product:Product) => { allProducts.value.push(product) }
  return { allProducts, saveProduct}
},{
  persist: {
    storage: persistedState.localStorage
  }
});