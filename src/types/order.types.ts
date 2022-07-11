type order = {
    id:number
    status:string
    user_id:string
   
}

type order_products = {
    order_id:number
    product_id:number
    quantity:number
}
export {order,order_products}