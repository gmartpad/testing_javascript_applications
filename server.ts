import Koa from "koa"
import Router from "koa-router"

const app = new Koa();
const router = new Router();

// The Map that stores the application's state
const carts = new Map();

// Handles requests to GET /carts/:username/items, 
// listing the items in a user's cart
router.get("/carts/:username/items", ctx => {
  const cart = carts.get(ctx.params.username);
  // If the cart has been found, the application responds with a 
  // 200 status and the cart found.
  // Otherwise, it responds with a 404 status.
  cart ? (ctx.body = cart) : (ctx.status = 404);
})

// Handles requests to DELETE /carts/:username/items
// emptying the user's cart
router.del("/carts/:username/items", ctx => {
  carts.set(ctx.params.username, undefined);

  // app responds with new cart value for
  // that specific user
  ctx.body = undefined
})

// Handles requests to POST /carts/:username/items/:item,
// adding items to a user's cart
router.post("/carts/:username/items/:item", ctx => {
  const { username, item } = ctx.params;
  const newItems = (carts.get(username) || []).concat(item);
  carts.set(username, newItems);
  // Responds with the cart's new content
  ctx.body = newItems
})

// Handles requests to DELETE /carts/:username/items/:item,
// removing items from a user's cart
router.del("/carts/:username/items/:item", ctx => {
  const { username, item } = ctx.params;
  const newItems = (carts.get(username) || []).filter((i: string) => i !== item)
  carts.set(username, newItems);
  // Responds with the cart's new content
  ctx.body = newItems
})

// Attaches the routes to the Koa instance
app.use(router.routes())

// Binds the server to port 3000
export default app.listen(3000);