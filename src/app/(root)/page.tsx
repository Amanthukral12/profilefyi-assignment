import { getAllProducts } from "@/lib/actions/product.action";
import ProductsPage from "@/components/ProductsPage";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main>
      <ProductsPage products={products} />
    </main>
  );
}
