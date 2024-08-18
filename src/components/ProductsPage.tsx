"use client";
import { IProduct } from "@/models/product.model";

import Product from "./Product";

const ProductsPage = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductsPage;
