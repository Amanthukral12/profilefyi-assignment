import Product from "@/models/product.model";
import { connectToDatabase } from "../database/mongoose";

export async function getAllProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}
