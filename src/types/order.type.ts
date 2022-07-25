export type order = {
  id: number
  status: string
  user_id: string
}

export type order_products = {
  order_id: number
  product_id: number
  quantity: number
}
