import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { AppDataSource } from "../config/database";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stock } = req.body;

  try {
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create({
      name,
      description,
      price,
      stock,
    });
    await productRepository.save(product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id: parseInt(id, 10) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;

    await productRepository.save(product);
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id: parseInt(id, 10) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.remove(product);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
