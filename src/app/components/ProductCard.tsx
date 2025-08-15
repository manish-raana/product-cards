"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from "motion/react";

type ProductCardProps = {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description?: string;
  price: number;
  currency?: string;
  inStock?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  discountPercentage?: number;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
};

const formatPrice = (amount: number, currency = "$") => {
  if (currency === "$") {
    // Force a consistent "$" output to avoid SSR/CSR locale differences like "US$"
    return `$${amount.toFixed(2)}`;
  }
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency}${amount.toFixed(2)}`;
  }
};

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  price,
  currency = "$",
  inStock = true,
  isOnSale = false,
  salePrice,
  discountPercentage,
  ctaLabel = "Add to Cart",
  onCtaClick,
  className = "",
}) => {
  const showSale =
    isOnSale && typeof salePrice === "number" && salePrice < price;
  const isDisabled = !inStock;
  const defaultAltText = `${title} product image`;
  const finalAltText = imageAlt || defaultAltText;
  const computedDiscount = (() => {
    if (typeof discountPercentage === "number")
      return Math.max(0, Math.round(discountPercentage));
    if (showSale && typeof salePrice === "number") {
      const pct = Math.round(100 - (salePrice / price) * 100);
      return pct > 0 ? pct : undefined;
    }
    return undefined;
  })();

  return (
    <motion.article
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:shadow-lg ${
        isDisabled ? "opacity-90" : ""
      } ${className}`}
      aria-labelledby={`product-title-${title
        .replace(/\s+/g, "-")
        .toLowerCase()}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ type: "spring", duration: 0.45, bounce: 0.18 }}
    >
      {/* Image */}
      <motion.figure
        className={`relative w-full aspect-[4/3] ${
          isDisabled ? "grayscale" : ""
        }`}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <Image
          src={imageUrl}
          alt={finalAltText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          priority={false}
        />
        <figcaption className="sr-only">
          {title} {description ? `- ${description}` : ""}
        </figcaption>

        {/* Badges */}
        <div
          className="pointer-events-none absolute left-3 top-3 flex flex-wrap items-center gap-2"
          role="status"
          aria-live="polite"
        >
          {showSale && (
            <span
              className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground/90 shadow-sm"
              aria-label="This item is on sale"
            >
              Sale
            </span>
          )}
          {!inStock && (
            <span
              className="rounded-full bg-destructive px-2.5 py-1 text-xs font-medium text-destructive-foreground shadow-sm"
              aria-label="This item is out of stock"
            >
              Out of Stock
            </span>
          )}
        </div>
      </motion.figure>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <header>
          <h3
            id={`product-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-left text-lg font-semibold md:text-xl"
          >
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-left text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </header>

        {/* Price row (left aligned) */}
        <div
          className="mt-3 flex items-center justify-start gap-3"
          role="text"
          aria-label="Product price"
        >
          {showSale ? (
            <>
              <span
                className="text-base font-semibold text-primary"
                aria-label="Sale price"
              >
                {formatPrice(salePrice as number, currency)}
              </span>
              <span
                className="text-sm text-muted-foreground line-through"
                aria-label="Original price"
              >
                {formatPrice(price, currency)}
              </span>
            </>
          ) : (
            <span
              className="text-base font-semibold"
              aria-label="Product price"
            >
              {formatPrice(price, currency)}
            </span>
          )}
          {(() => {
            const pct = computedDiscount;
            if (pct === undefined) return null;
            return (
              <span
                className="ml-1 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold text-yellow-800"
                aria-label={`${pct}% off`}
              >
                {pct}% OFF
              </span>
            );
          })()}
        </div>

        {/* CTA pinned to bottom */}
        <footer className="mt-auto pt-4">
          <motion.button
            type="button"
            whileTap={{ scale: isDisabled ? 1 : 0.98 }}
            className={`inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              isDisabled ? "cursor-not-allowed opacity-60" : ""
            }`}
            aria-label={`${isDisabled ? "Cannot add" : "Add"} ${title} to cart${
              isDisabled ? " - item is out of stock" : ""
            }`}
            onClick={onCtaClick}
            disabled={isDisabled}
            aria-describedby={isDisabled ? "out-of-stock-notice" : undefined}
          >
            {ctaLabel}
          </motion.button>
          {isDisabled && (
            <div id="out-of-stock-notice" className="sr-only">
              This item is currently out of stock and cannot be added to cart.
            </div>
          )}
        </footer>
      </div>
    </motion.article>
  );
};

export default ProductCard