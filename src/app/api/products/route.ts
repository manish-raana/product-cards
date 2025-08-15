import type { ProductCardData } from '@/types/product';

export async function GET() {
  const products: ProductCardData[] = [
    {
      id: "p1",
      title: "Minimal Chair",
      description: "Modern, ergonomic chair for your workspace.",
      price: 129.99,
      imageUrl:
        "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?w=800&h=600&fit=crop&crop=center",
      inStock: true,
      isOnSale: true,
      salePrice: 109.99,
      discountPercentage: 15,
    },
    {
      id: "p2",
      title: "Wireless Headphones",
      description: "Crystal clear sound with active noise cancellation.",
      price: 199.0,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&crop=center",
      inStock: true,
    },
    {
      id: "p3",
      title: "Classic Watch",
      description: "Timeless design with premium leather strap.",
      price: 249.99,
      imageUrl:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop&crop=center",
      inStock: false,
    },
    {
      id: "p4",
      title: "Lightweight Sneakers",
      description: "Breathable and comfortable for daily wear.",
      price: 89.99,
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center",
      inStock: true,
      isOnSale: true,
      salePrice: 74.99,
      discountPercentage: 17,
    },
    {
      id: "p5",
      title: "Mirrorless Camera",
      description: "Compact body with powerful image performance.",
      price: 999.0,
      imageUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop&crop=center",
      inStock: true,
    },
    {
      id: "p6",
      title: "Leather Backpack",
      description: "Durable and stylish with multiple compartments.",
      price: 149.5,
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&crop=center",
      inStock: true,
    },
    {
      id: "p7",
      title: "Desk Lamp",
      description: "Adjustable brightness with a minimal silhouette.",
      price: 59.99,
      imageUrl:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop&crop=center",
      inStock: true,
    },
    {
      id: "p8",
      title: "Utility Knife",
      description: "Precision craftsmanship for everyday carry.",
      price: 39.99,
      imageUrl:
        "https://images.unsplash.com/photo-1622810917846-719511f8e618?w=800&h=600&fit=crop&crop=center",
      inStock: false,
    },
    {
      id: "p9",
      title: "Scented Candle",
      description: "Warm, calming fragrance for cozy nights.",
      price: 24.0,
      imageUrl:
        "https://images.unsplash.com/photo-1646143612220-45f02eade445?w=800&h=600&fit=crop&crop=center",
      inStock: true,
      isOnSale: true,
      salePrice: 19.99,
      discountPercentage: 17,
    },
    {
      id: "p10",
      title: "Ceramic Mug",
      description: "Hand-glazed stoneware mug for daily coffee.",
      price: 18.5,
      imageUrl:
        "https://images.unsplash.com/photo-1695142258472-0cf0c8599499?w=800&h=600&fit=crop&crop=center",
      inStock: true,
    },
  ];

  return Response.json({ products });
}


