export interface StoreItem {
    id: string
    name: string
    price: number
}

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
}

interface State {
    items: StoreItem[]
    cart: CartItem[]
}

export const state: State = {
    items: [
        {
            id: '001-beetroot',
            name: 'beetroot',
            price: 0.35,
        },
        {
            id: '002-carrot',
            name: 'carrot',
            price: 0.35,
        },
        {
            id: '003-apple',
            name: 'apple',
            price: 0.35,
        },
        {
            id: '004-apricot',
            name: 'apricot',
            price: 0.35,
        },
        {
            id: '005-avocado',
            name: 'avocado',
            price: 0.35,
        },
        {
            id: '006-bananas',
            name: 'bananas',
            price: 0.35,
        },
        {
            id: '007-bell-pepper',
            name: 'bell pepper',
            price: 0.35,
        },
        {
            id: '008-berry',
            name: 'berry',
            price: 0.35,
        },
        {
            id: '009-blueberry',
            name: 'blueberry',
            price: 0.35,
        },
        {
            id: '010-eggplant',
            name: 'eggplant',
            price: 0.35,
        },
    ],
    cart: [],
}
