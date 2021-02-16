export type ProductType = {
    id: string
    name: string
    description: string
    media: {source: string}
    price: {formatted: string}
}

export type CartType = {
    total_items: number
}
