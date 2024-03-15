
export interface Productcart {
  _id: string
  products: Product[]
  totalCartPrice: number
}

export interface Product {
  count: number
  _id: string
  product: Product2
  price: number
}

export interface Product2 {

  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category

}



export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}
