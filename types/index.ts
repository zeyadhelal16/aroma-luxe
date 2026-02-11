export interface Product {
  id: number
  name: string
  arName: string
  price: number
  image: string
  description: string
  arDescription: string
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}
