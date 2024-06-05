# Greengrocers
In this exercise we explore a common scenario in eCommerce, adding and removing items from the cart, and calculating the total. Your final solution should look like this:

![Result](result.gif)

## Learning Objectives
- Implement a dynamic front-end app that uses shared state

## Instructions
- Use the `index.html` file as a starting point.
- `index.js` contains the initial state - a list of items available to purchase and an empty cart 
- Images for each item are in the assets folder
- The HTML required for the items in the list and the cart items are provided in the `templates folder`
- Implement the following requirements
  - A user can view a selection of items in the store
  - From the store, a user can add an item to their cart
    - If the item is already in the cart, increase the item's quantity in the cart
  - From the cart, a user can view and adjust the number of items in their cart
      - If an item's quantity equals zero it is removed from the cart
  - A user can view the current total in their cart

## Extension 1
- Add filters to the store ie. filter by item type; when a user clicks a filter they will only see items of that type

## Extension 2
- Add sorting to the store ie. sort by price or sort alphabetically; when a user clicks sort they will see a sorted list of items. This should work with the filters implemented in extension 1.

## Extension 3
- Add a form that allows new products to be created for sale. This can either be on the same page, hidden until the user clicks on a button, or a separate page.
