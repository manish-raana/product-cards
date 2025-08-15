import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { headers } from "next/headers";
import type { ProductCardData } from "@/types/product";

const getProducts = async () => {
  const hdrs = await headers();
  const host = hdrs.get("host") || "localhost:3000";
  const protocol = hdrs.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/products`);
  const data: { products: ProductCardData[] } = await res.json();
  return data.products;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start gap-10">
      <Navbar />
      <div className="container mx-auto px-4 flex-1">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">
          Product Cards Showcase
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto py-10">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              imageUrl={p.imageUrl}
              title={p.title}
              description={p.description}
              price={p.price}
              inStock={p.inStock}
              isOnSale={p.isOnSale}
              salePrice={p.salePrice}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
