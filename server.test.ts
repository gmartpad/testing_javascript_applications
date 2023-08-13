import app from "./server";
import fetch from "isomorphic-fetch";

const apiRoot = "http://localhost:3000";

// Sends POST requests to the route
// that adds items to a user's cart
const addItem = (username: string, item: string) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "POST"
  });
}

// Sends DELETE request to the route
// that removes an item from the user's cart
const removeItem = (username: string, item: string) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "DELETE"
  })
}

// Sends GET request to the route
// that lists the contents of a user's carts
const getItems = (username: string) => {
  return fetch(`${apiRoot}/carts/${username}/items`, { method: "GET" });
}

// Sends DELETE request to the route
// that empties the cart for that user
const emptyTheCart = (username: string) => {
  return fetch(`${apiRoot}/carts/${username}/items`, { 
    method: "DELETE"
  })
}

beforeEach(() => {
  if(!app.listening) {
    app.listen(3000)
  }
})

afterEach(() => app.close())

test("adding items to a cart", async () => {
  // Lists the items in a user's cart
  const initialItemsResponse = await getItems("gabriel");
  // Checks whether the response's status is 404
  expect(initialItemsResponse.status).toEqual(404);

  // Sends a request to add an item to a user's cart
  const addItemResponse = await addItem("gabriel", "cheesecake");
  // Checks whether the server responded with the
  // cart's new contents
  expect(await addItemResponse.json()).toEqual(["cheesecake"]);

  // Sends another request to list the items in the 
  // user's cart
  const finalItemsResponse = await getItems("gabriel");
  // Checks whether the server's response includes
  // the item you've added
  expect(await finalItemsResponse.json()).toEqual(["cheesecake"]);
})

test("removing items from a cart", async () => {
  // Emptying the cart
  const initialEmptyingResponse = await emptyTheCart("gabriel")
  // Checks whether status is 204, therefore, no content
  expect(initialEmptyingResponse.status).toEqual(204)

  // Lists the items in a user's cart
  const initialItemsResponse = await getItems("gabriel");
  // Checks whether the response's status is 404, due to that
  // user's cart being empty
  expect(initialItemsResponse.status).toEqual(404);

  // Sends a request to add an item to a user's cart
  const addItemResponse = await addItem("gabriel", "cheesecake");
  // Checks whether the server responded with the
  // cart's new contents
  expect(await addItemResponse.json()).toEqual(["cheesecake"])

  // Sends a request to remove an item to a user's cart
  const removeItemResponse = await removeItem("gabriel", "cheesecake");
  // Checks whether the server responded with the
  // cart's new contents
  expect(await removeItemResponse.json()).toEqual([])
})