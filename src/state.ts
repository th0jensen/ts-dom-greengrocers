export type StoreItem = {
    id: string
    name: string
    price: number
    kind: Filter
}

export type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
}

export type Filter = 'Fruit' | 'Berry' | 'Vegetable' | null

type State = {
    items: StoreItem[]
    cart: CartItem[]
    filter: Filter
    sorted: Boolean
}

export const state: State = {
    items: [
        {
            id: '001-beetroot',
            name: 'beetroot',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '002-carrot',
            name: 'carrot',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '003-apple',
            name: 'apple',
            price: 0.35,
            kind: 'Fruit',
        },
        {
            id: '004-apricot',
            name: 'apricot',
            price: 0.35,
            kind: 'Fruit',
        },
        {
            id: '005-avocado',
            name: 'avocado',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '006-bananas',
            name: 'bananas',
            price: 0.35,
            kind: 'Fruit',
        },
        {
            id: '007-bell-pepper',
            name: 'bell pepper',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '008-berry',
            name: 'berry',
            price: 0.35,
            kind: 'Berry',
        },
        {
            id: '009-blueberry',
            name: 'blueberry',
            price: 0.35,
            kind: 'Berry',
        },
        {
            id: '010-eggplant',
            name: 'eggplant',
            price: 0.35,
            kind: 'Vegetable',
        },
    ],
    cart: [],
    filter: null,
    sorted: false,
}
