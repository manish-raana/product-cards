export type ProductCardData = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  discountPercentage?: number;
};
