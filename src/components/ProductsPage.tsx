"use client";
import { IProduct } from "@/models/product.model";

import Product from "./Product";

const ProductsPage = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      {products.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductsPage;
