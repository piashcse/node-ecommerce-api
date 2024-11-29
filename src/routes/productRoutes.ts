import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController";
import {authenticateCustomerJWT, authenticateSellerJWT} from "../middleware/authmiddleware";

const router = Router();

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all Products
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Access denied for non-CUSTOMER role
 */
router.get("/", authenticateCustomerJWT, getProducts);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Access denied for non-SELLER role
 */
router.post("/", authenticateSellerJWT, createProduct);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Access denied for non-SELLER role
 *       404:
 *         description: Product not found
 */
router.put("/:id", authenticateSellerJWT, updateProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Success message
 *       401:
 *         description: Unauthorized - No token provided
 *       403:
 *         description: Forbidden - Access denied for non-SELLER role
 *       404:
 *         description: Product not found
 */
router.delete("/:id", authenticateSellerJWT, deleteProduct);

export default router;
