import assert from "assert";
import Cart from "./Cart.ts";

// Encapsulates the first test into a different namespace, 
// isolating its variables and producing more readable output
test("The addToCart function can add an item to the cart", () => {
  // Arrange: creates an empty cart
  const cart = new Cart();
  // Act: exercises the addToCart function
  cart.addToCart("cheesecake")

  // Asset: checks whether the cart is empty
  expect(cart.items).toStrictEqual(["cheesecake"]);
})

// Encapsulates the second test into a different namespace
test("The removeFromCart function can remove an items from the cart", () => {
  // Arrange: creates an empty cart, and adds an item to it
  const cart = new Cart();
  cart.addToCart("cheesecake");

  // Act: exercises the remove FromCart function
  cart.removeFromCart("cheesecake");

  // Assert: checks wheter the cart is empty
  expect(cart.items).toStrictEqual([]);
})