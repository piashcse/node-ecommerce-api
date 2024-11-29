import { Router } from "express";
import {
  addToCart,
  viewCart,
  updateCartItem,
  removeFromCart,
} from "../controller/cartController";
import { authenticateCustomerJWT } from "../middleware/authmiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing the shopping cart
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID of the product to add
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       201:
 *         description: Product added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Product not found
 */
router.post("/", authenticateCustomerJWT, addToCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: View items in the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of items in the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Error fetching cart items
 */
router.get("/", authenticateCustomerJWT, viewCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update the quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItemId:
 *                 type: integer
 *                 description: ID of the cart item to update
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the cart item
 *             required:
 *               - cartItemId
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart item not found
 */
router.put("/", authenticateCustomerJWT, updateCartItem);

/**
 * @swagger
 * /cart/{cartItemId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart item to remove
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 */
router.delete("/:cartItemId", authenticateCustomerJWT, removeFromCart);

export default router;
