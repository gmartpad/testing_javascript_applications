// import { db, closeConnection } from "../../dbConnection";
// import { createCart } from "./Cart";

// test("createCart creates a cart for a username", async () => {
//   // Deletes every row in the carts table
//   await db("carts").truncate();
//   await createCart("Gabriel Martins Padoin");

//   // Selects value in the username column
//   // for all the itmes in the carts table
//   const result = await db.select("username").from("carts");

//   console.log(result)

//   // Checks if the result value is equal to the array of users
//   expect(result).toEqual([{ username: "Gabriel Martins Padoin" }]);

//   // Tears down the connection pools
//   await closeConnection()
// })

// -------
import { db, closeConnection } from "../../dbConnection"
import { addItem, createCart } from "./Cart"

beforeEach(async () => {
  await db("carts_items").truncate();
  await db("carts").truncate();
})

afterAll(async () => await closeConnection())

test("createCart creates a cart for a username", async () => {
  await createCart("Gabriel Martins Padoin")
  const result = await db.select("username").from("carts")
  expect(result).toEqual([{ username: "Gabriel Martins Padoin" }]);
})

test("addItem adds an item to a cart", async () => {
  const username = "Gabriel Martins Padoin";
  await createCart(username);
  const arrayOfIdObjects = await db
    .select()
    .from("carts")
    // Selects all the rows in the carts table whose
    // username column matches the username used
    // for the test
    .where({ username });

  const cartId = arrayOfIdObjects[0].id

  await addItem(cartId, "cheesecake");
  const result = await db.select().from("carts_items");

  expect(result).toEqual([{ cartId, itemName: "cheesecake" }])
})