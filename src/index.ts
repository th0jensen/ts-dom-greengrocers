import { StoreItem, CartItem, state } from './state'
import { renderCart } from './cart'

function createItemImage(item: StoreItem): HTMLDivElement {
    const itemIconContainer = document.createElement('div')

    const itemIcon = document.createElement('img')
    itemIcon.src = item.src
    itemIcon.alt = item.name
    itemIcon.height = 125
    itemIcon.width = 125

    itemIconContainer.appendChild(itemIcon)
    return itemIconContainer
}

// TODO (#3): Add items to cart
function createAddToCartButton(item: StoreItem): HTMLButtonElement {
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'

    addToCartButton.addEventListener('click', (): void => {
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
            console.log(state.cart)
            console.log(`INFO: ${item.name} added to cart`)
            renderCart()
        }
    })

    return addToCartButton
}

function createHeaderButtons(list: Element): HTMLDivElement {
    const headerButtonsContainer = document.createElement('div')

    const filterButton = document.createElement('button')
    filterButton.innerText = `${state.filter} filter`
    filterButton.addEventListener('click', (): void => {
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
    sortButton.addEventListener('click', (): void => {
        if (!state.sorted) {
            state.sorted = true
            sortButton.innerText = 'Sorting by name'
        } else {
            state.sorted = false
            sortButton.innerText = 'Sorting by ID'
        }
        render(list)
    })

    const adminButton = document.createElement('button')
    adminButton.innerText = 'Enter Admin Mode'
    adminButton.addEventListener('click', (): void => {
        if (!state.isAdmin) {
            state.isAdmin = true
            adminButton.innerText = 'Return to sanity'
        } else {
            state.isAdmin = false
            adminButton.innerText = 'Enter Admin Mode'
        }
        render(list)
    })

    headerButtonsContainer.appendChild(filterButton)
    headerButtonsContainer.appendChild(sortButton)
    headerButtonsContainer.appendChild(adminButton)
    return headerButtonsContainer
}

function renderAdmin(list: Element): void {
    const cartElement = document.getElementById('cart')

    if (!cartElement) {
        throw new Error('Could not find element #cart in DOM')
    }

    cartElement.innerHTML = ''

    const form = document.createElement('form')
    form.setAttribute('id', 'add-new-item')

    const nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name')
    nameLabel.innerText = 'Item name'

    const nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'name')
    nameInput.required = true

    const priceLabel = document.createElement('label')
    priceLabel.setAttribute('for', 'price')
    priceLabel.innerText = 'Item price (£)'

    const priceInput = document.createElement('input')
    priceInput.setAttribute('type', 'number')
    priceInput.setAttribute('name', 'price')
    priceInput.required = true

    const kindLabel = document.createElement('label')
    kindLabel.setAttribute('for', 'kind')
    kindLabel.innerText = 'Item kind'

    const kindInput = document.createElement('input')
    kindInput.setAttribute('type', 'text')
    kindInput.setAttribute('name', 'kind')
    kindInput.required = true

    const imageLabel = document.createElement('label')
    imageLabel.setAttribute('for', 'src')
    imageLabel.innerText = 'Item image'

    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'url')
    imageInput.setAttribute('name', 'src')
    imageInput.required = true

    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('name', 'submit')
    submit.setAttribute('id', 'submit')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const newItemData = new FormData(form)

        // Just make sure we can sort
        // and filter stuff when the
        // inputs are user generated

        const newData: StoreItem = {
            id: `0${state.items.length + 1}-${(newItemData.get('name') as string).toLowerCase()}`,
            name: (newItemData.get('name') as string).toLowerCase(),
            price: Number(newItemData.get('price')),
            src: newItemData.get('src') as string,
            kind:
                (newItemData.get('kind') as string)[0].toUpperCase() +
                (newItemData.get('kind') as string).slice(1),
        }

        state.items.push(newData)
        state.isAdmin = false
        render(list)
    })

    form.append(nameLabel, nameInput)
    form.append(priceLabel, priceInput)
    form.append(kindLabel, kindInput)
    form.append(imageLabel, imageInput)
    form.append(submit)
    cartElement.append(form)
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

    if (state.isAdmin) {
        renderAdmin(list)
    } else {
        renderCart()
    }

    list.innerHTML = ''

    filteredItems.forEach((item): void => {
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
    })
}

// TODO (#2): Load the initial state
document.addEventListener('DOMContentLoaded', function () {
    const storeItemList = document.querySelector(
        '.store--item-list'
    ) as HTMLElement
    const title = document.querySelector('h1') as HTMLElement

    title.appendChild(createHeaderButtons(storeItemList))
    render(storeItemList)
})
