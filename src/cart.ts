import { state, CartItem } from './state'

// TODO (#4): Render the cart
export function renderCart(): void {
    const cartElement = document.getElementById('cart')

    if (!cartElement) {
        throw new Error('Could not find element #cart in DOM')
    }

    cartElement.innerHTML = `
        <h2>Your Cart</h2>

        <div class="cart--item-list-container">
            <ul class="item-list cart--item-list"></ul>
        </div>

        <div class="total-section">
            <div>
                <h3>Total</h3>
            </div>

            <div>
                <span class="total-number">£0.00</span>
            </div>
        </div>
    `

    const cartItemList = document.querySelector(
        '.cart--item-list'
    ) as HTMLElement
    const totalAmount = document.querySelector('.total-number') as HTMLElement

    cartItemList.innerHTML = ''

    state.cart.forEach((cart): void => {
        const cartItem = document.createElement('li')

        const cartItemImage = document.createElement('img')
        cartItemImage.src = cart.src
        cartItemImage.alt = cart.name
        cartItemImage.height = 24
        cartItemImage.width = 24

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
    })

    totalAmount.innerHTML = `£${calculateTotalAmount()}`
}

// TODO (#5): Add logic to incremental buttons
function addButton(cart: CartItem): HTMLButtonElement {
    const addButton = document.createElement('button')
    addButton.setAttribute('class', 'quantity-btn add-btn center')
    addButton.addEventListener('click', (): void => {
        cart.quantity += 1
        console.log(`INFO: ${cart.name} quantity increased by one`)
        renderCart()
    })
    return addButton
}

function removeButton(cart: CartItem): HTMLButtonElement {
    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'quantity-btn remove-btn center')

    removeButton.addEventListener('click', (): void => {
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

    state.cart.forEach((cartItem): void => {
        totalAmount += cartItem.price * cartItem.quantity
        console.log(`INFO: Total amount: ${totalAmount}`)
    })

    return totalAmount.toFixed(2)
}
