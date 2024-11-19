import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { CartItem } from '../entity/CartItem';
import { Product } from '../entity/Product';

// Add product to cart
export const addToCart = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;

    try {
        const cartRepository = AppDataSource.getRepository(CartItem);
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({ id: productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if product already exists in the cart
        let cartItem = await cartRepository.findOneBy({ product });

        if (cartItem) {
            // Update quantity if already in cart
            cartItem.quantity += quantity;
        } else {
            // Create new cart item
            cartItem = cartRepository.create({ product, quantity });
        }

        await cartRepository.save(cartItem);
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

// View cart
export const viewCart = async (_req: Request, res: Response) => {
    try {
        const cartRepository = AppDataSource.getRepository(CartItem);
        const cartItems = await cartRepository.find();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

// Update quantity of a product in the cart
export const updateCartItem = async (req: Request, res: Response) => {
    const { cartItemId, quantity } = req.body;

    try {
        const cartRepository = AppDataSource.getRepository(CartItem);
        const cartItem = await cartRepository.findOneBy({ id: cartItemId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartRepository.save(cartItem);
        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item' });
    }
};

// Remove product from cart
export const removeFromCart = async (req: Request, res: Response) => {
    const { cartItemId } = req.params;

    try {
        const cartRepository = AppDataSource.getRepository(CartItem);
        const cartItem = await cartRepository.findOneBy({ id: parseInt(cartItemId) });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartRepository.remove(cartItem);
        res.status(200).json({ message: 'Cart item removed' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Error removing from cart' });
    }
};
