export type StoreItem = {
    id: string
    name: string
    price: number
    kind: string
    src: string
}

export type CartItem = StoreItem & {
    quantity: number
}

type State = {
    items: StoreItem[]
    cart: CartItem[]
    filter: string | null
    sorted: Boolean
    isAdmin: Boolean
}

function createItem(
    id: string,
    name: string,
    price: number,
    kind: string
): StoreItem {
    return {
        id: id,
        name: name,
        price: price,
        kind: kind,
        src: `./assets/icons/${id}.svg`,
    }
}

export const state: State = {
    items: [
        createItem('001-beetroot', 'beetroot', 0.35, 'Vegetable'),
        createItem('002-carrot', 'carrot', 0.35, 'Vegetable'),
        createItem('003-apple', 'apple', 0.35, 'Fruit'),
        createItem('004-apricot', 'apricot', 0.35, 'Fruit'),
        createItem('005-avocado', 'avocado', 0.35, 'Vegetable'),
        createItem('006-bananas', 'bananas', 0.35, 'Fruit'),
        createItem('007-bell-pepper', 'bell pepper', 0.35, 'Vegetable'),
        createItem('008-berry', 'berry', 0.35, 'Berry'),
        createItem('009-blueberry', 'blueberry', 0.35, 'Berry'),
        createItem('010-eggplant', 'eggplant', 0.35, 'Vegetable'),
    ],
    cart: [],
    filter: null,
    sorted: false,
    isAdmin: false,
}
