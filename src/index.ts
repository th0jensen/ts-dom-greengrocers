import { StoreItem, CartItem, state } from './state'

function createItemImage(item: StoreItem): HTMLDivElement {
    const itemIconContainer = document.createElement('div')

    const itemIcon = document.createElement('img')
    itemIcon.src = `assets/icons/${item.id}.svg`
    itemIcon.alt = item.name

    itemIconContainer.appendChild(itemIcon)
    return itemIconContainer
}

// TODO (#3): Add items to cart
function createAddToCartButton(item: StoreItem): HTMLButtonElement {
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'

    addToCartButton.addEventListener('click', () => {
        const matchingItem = state.cart.find((cartItem: CartItem) =>
            cartItem.id.match(item.id)
        )
        if (matchingItem) {
            matchingItem.quantity += 1
            console.log(`INFO: ${item.name} quantity increased by one`)
            renderCart()
        } else if (!matchingItem) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            state.cart.push(newItem)
            console.log(`INFO: ${item.name} added to cart`)
            renderCart()
        }
    })

    return addToCartButton
}

// TODO (#5): Add logic to incremental buttons
function addButton(cart: CartItem): HTMLButtonElement {
    const addButton = document.createElement('button')
    addButton.setAttribute('class', 'quantity-btn add-btn center')
    addButton.addEventListener('click', () => {
        cart.quantity += 1
        console.log(`INFO: ${cart.name} quantity increased by one`)
        renderCart()
    })
    return addButton
}

function removeButton(cart: CartItem): HTMLButtonElement {
    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'quantity-btn remove-btn center')

    removeButton.addEventListener('click', () => {
        if (cart.quantity > 1) {
            cart.quantity -= 1
            console.log(`INFO: ${cart.name} quantity decreased by one`)
        } else {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].name === cart.name) {
                    state.cart.splice(i, 1)
                    break
                }
            }
            console.log(`INFO: ${cart.name} removed from cart`)
        }

        renderCart()
    })

    return removeButton
}

// TODO (#6): Do the maths for the cart
function calculateTotalAmount(): string {
    let totalAmount = 0

    for (let i = 0; i < state.cart.length; i++) {
        const cartItem = state.cart[i]
        totalAmount += cartItem.price * cartItem.quantity
        console.log(`INFO: Total amount: ${totalAmount}`)
    }

    return totalAmount.toFixed(2)
}

// TODO (#4): Render the cart
function renderCart(): void {
    const cartItemList = document.querySelector('.cart--item-list')
    const totalAmount = document.querySelector('.total-number')

    if (!cartItemList || !totalAmount) {
        console.error(
            'ERROR: No cart--item-list or total-number class found in DOM',
            Error
        )
        return
    }

    cartItemList.innerHTML = ''

    for (let i = 0; i < state.cart.length; i++) {
        const cart = state.cart[i]
        const cartItem = document.createElement('li')

        const cartItemImage = document.createElement('img')
        cartItemImage.src = `assets/icons/${cart.id}.svg`
        cartItemImage.alt = cart.name
        cartItem.appendChild(cartItemImage)

        const cartItemName = document.createElement('p')
        cartItemName.innerText = cart.name[0].toUpperCase() + cart.name.slice(1)
        cartItem.appendChild(cartItemName)

        const itemCount = document.createElement('span')
        itemCount.innerText = cart.quantity.toString()

        cartItem.appendChild(removeButton(cart))
        cartItem.appendChild(itemCount)
        cartItem.appendChild(addButton(cart))
        cartItemList.appendChild(cartItem)
    }

    totalAmount.innerHTML = `£${calculateTotalAmount()}`
}

function createFilter(list: Element): HTMLDivElement {
    const filterContainer = document.createElement('div')
    const filterButton = document.createElement('button')
    filterButton.innerText = `${state.filter} filter`
    filterButton.addEventListener('click', () => {
        switch (state.filter) {
            case 'Fruit':
                state.filter = 'Berry'
                break
            case 'Berry':
                state.filter = 'Vegetable'
                break
            case 'Vegetable':
                state.filter = null
                break
            default:
                state.filter = 'Fruit'
        }
        filterButton.innerText = `${state.filter} filter`
        render(list)
    })

    const sortButton = document.createElement('button')
    sortButton.innerText = 'Sorting by ID'
    sortButton.addEventListener('click', () => {
        if (!state.sorted) {
            state.sorted = true
            sortButton.innerText = 'Sorting by name'
        } else {
            state.sorted = false
            sortButton.innerText = 'Sorting by ID'
        }
        render(list)
    })

    filterContainer.appendChild(filterButton)
    filterContainer.appendChild(sortButton)
    return filterContainer
}

// TODO (#1): Render the initial state
function render(list: Element): void {
    let filteredItems = state.items

    if (state.filter != null) {
        filteredItems = state.items.filter((item) => item.kind === state.filter)
    }

    if (state.sorted) {
        filteredItems = filteredItems.sort((a, b) =>
            a.name.localeCompare(b.name)
        )
    } else if (!state.sorted) {
        filteredItems = filteredItems.sort((a, b) => a.id.localeCompare(b.id))
    }

    list.innerHTML = ''

    for (let i = 0; i < filteredItems.length; i++) {
        const item = filteredItems[i]
        const listItem = document.createElement('li')

        const nameAndPrice = document.createElement('p')
        nameAndPrice.innerText = `
            ${item.name[0].toUpperCase() + item.name.slice(1)}
            £${item.price}
        `
        listItem.appendChild(createItemImage(item))
        listItem.appendChild(nameAndPrice)
        listItem.appendChild(createAddToCartButton(item))
        list.appendChild(listItem)
    }
}

// TODO (#2): Load the initial state
document.addEventListener('DOMContentLoaded', function () {
    const storeItemList = document.querySelector('.store--item-list')
    const title = document.querySelector('h1')

    if (!storeItemList || !title) {
        console.error('No store--item-list or header class found in DOM', Error)
        return
    }

    title.appendChild(createFilter(storeItemList))
    render(storeItemList)
    renderCart()
})
