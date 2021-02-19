export type ProductType = {
    id: string
    name: string
    description: string
    media: {source: string}
    price: {formatted: string}
    line_total: {formatted_width_symbol: string}
    quantity: number
}

export type CartType = {
    id: string
    subtotal: {formatted_with_symbol: string};
    total_items: number
    line_items: ProductType[]
}
