import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../ProductCard'

// Mock motion from framer-motion
jest.mock('motion/react', () => ({
  motion: {
    article: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, whileInView, viewport, whileHover, transition, ...restProps } = props
      return <article {...restProps}>{children}</article>
    },
    figure: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileHover, transition, ...restProps } = props
      return <figure {...restProps}>{children}</figure>
    },
    button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileTap, ...restProps } = props
      return <button {...restProps}>{children}</button>
    },
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, sizes, priority, ...restProps } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...restProps} />
  },
}))

const defaultProps = {
  imageUrl: 'https://example.com/image.jpg',
  title: 'Test Product',
  description: 'Test description',
  price: 99.99,
}

describe('ProductCard', () => {
  describe('Rendering', () => {
    it('renders with all required props', () => {
      render(<ProductCard {...defaultProps} />)
      
      expect(screen.getByText('Test Product')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
      expect(screen.getByText('$99.99')).toBeInTheDocument()
      expect(screen.getByText('Add to Cart')).toBeInTheDocument()
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg')
    })

    it('renders without description when not provided', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { description, ...propsWithoutDescription } = defaultProps
      render(<ProductCard {...propsWithoutDescription} />)
      
      // Use getAllByText since the title appears in both h3 and figcaption
      const titleElements = screen.getAllByText('Test Product')
      expect(titleElements.length).toBeGreaterThan(0)
      expect(screen.queryByText('Test description')).not.toBeInTheDocument()
    })

    it('renders with custom alt text', () => {
      render(<ProductCard {...defaultProps} imageAlt="Custom alt text" />)
      
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Custom alt text')
    })

    it('renders with default alt text when not provided', () => {
      render(<ProductCard {...defaultProps} />)
      
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product product image')
    })
  })

  describe('Price formatting', () => {
    it('formats price correctly with dollar sign', () => {
      render(<ProductCard {...defaultProps} price={123.45} />)
      
      expect(screen.getByText('$123.45')).toBeInTheDocument()
    })

    it('formats zero price correctly', () => {
      render(<ProductCard {...defaultProps} price={0} />)
      
      expect(screen.getByText('$0.00')).toBeInTheDocument()
    })

    it('formats large numbers correctly', () => {
      render(<ProductCard {...defaultProps} price={9999.99} />)
      
      expect(screen.getByText('$9999.99')).toBeInTheDocument()
    })
  })

  describe('Sale functionality', () => {
    it('shows sale price and original price when on sale', () => {
      render(
        <ProductCard
          {...defaultProps}
          price={100}
          isOnSale={true}
          salePrice={80}
        />
      )
      
      expect(screen.getByText('$80.00')).toBeInTheDocument()
      expect(screen.getByText('$100.00')).toHaveClass('line-through')
    })

    it('shows discount percentage badge when discountPercentage is provided', () => {
      render(
        <ProductCard
          {...defaultProps}
          price={100}
          isOnSale={true}
          salePrice={80}
          discountPercentage={20}
        />
      )
      
      expect(screen.getByText('20% OFF')).toBeInTheDocument()
    })

    it('calculates discount percentage from sale price when not provided', () => {
      render(
        <ProductCard
          {...defaultProps}
          price={100}
          isOnSale={true}
          salePrice={75}
        />
      )
      
      expect(screen.getByText('25% OFF')).toBeInTheDocument()
    })

    it('shows sale badge on image when on sale', () => {
      render(
        <ProductCard
          {...defaultProps}
          isOnSale={true}
          salePrice={80}
        />
      )
      
      expect(screen.getByText('Sale')).toBeInTheDocument()
    })
  })

  describe('Stock status', () => {
    it('shows out of stock badge when inStock is false', () => {
      render(<ProductCard {...defaultProps} inStock={false} />)
      
      expect(screen.getByText('Out of Stock')).toBeInTheDocument()
    })

    it('disables button when out of stock', () => {
      render(<ProductCard {...defaultProps} inStock={false} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('enables button when in stock', () => {
      render(<ProductCard {...defaultProps} inStock={true} />)
      
      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })
  })

  describe('Button interactions', () => {
    it('calls onCtaClick when button is clicked', () => {
      const mockOnClick = jest.fn()
      render(<ProductCard {...defaultProps} onCtaClick={mockOnClick} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onCtaClick when button is disabled', () => {
      const mockOnClick = jest.fn()
      render(
        <ProductCard
          {...defaultProps}
          inStock={false}
          onCtaClick={mockOnClick}
        />
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(mockOnClick).not.toHaveBeenCalled()
    })

    it('renders with custom CTA label', () => {
      render(<ProductCard {...defaultProps} ctaLabel="Buy Now" />)
      
      expect(screen.getByText('Buy Now')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<ProductCard {...defaultProps} />)
      
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-labelledby',
        'product-title-test-product'
      )
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Add Test Product to cart'
      )
    })

    it('has proper ARIA label for out of stock items', () => {
      render(<ProductCard {...defaultProps} inStock={false} />)
      
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'Cannot add Test Product to cart - item is out of stock'
      )
    })

    it('has proper ARIA labels for sale items', () => {
      render(
        <ProductCard
          {...defaultProps}
          isOnSale={true}
          salePrice={80}
          discountPercentage={20}
        />
      )
      
      expect(screen.getByText('Sale')).toHaveAttribute(
        'aria-label',
        'This item is on sale'
      )
      expect(screen.getByText('20% OFF')).toHaveAttribute(
        'aria-label',
        '20% off'
      )
    })

    it('has proper heading structure', () => {
      render(<ProductCard {...defaultProps} />)
      
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveAttribute('id', 'product-title-test-product')
    })
  })

  describe('Edge cases', () => {
    it('handles very long titles', () => {
      const longTitle = 'This is a very long product title that might wrap to multiple lines and should still display correctly'
      render(<ProductCard {...defaultProps} title={longTitle} />)
      
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles very long descriptions', () => {
      const longDescription = 'This is a very long product description that might wrap to multiple lines and should still display correctly without breaking the layout'
      render(<ProductCard {...defaultProps} description={longDescription} />)
      
      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })

    it('handles zero discount percentage', () => {
      render(
        <ProductCard
          {...defaultProps}
          isOnSale={true}
          salePrice={100}
          discountPercentage={0}
        />
      )
      
      // The component should show 0% OFF when discountPercentage is explicitly 0
      expect(screen.getByText('0% OFF')).toBeInTheDocument()
    })

    it('handles negative discount percentage', () => {
      render(
        <ProductCard
          {...defaultProps}
          isOnSale={true}
          salePrice={100}
          discountPercentage={-10}
        />
      )
      
      expect(screen.queryByText('-10% OFF')).not.toBeInTheDocument()
    })

    it('handles sale price higher than original price', () => {
      render(
        <ProductCard
          {...defaultProps}
          price={100}
          isOnSale={true}
          salePrice={120}
        />
      )
      
      // Should not show sale price or discount
      expect(screen.getByText('$100.00')).toBeInTheDocument()
      expect(screen.queryByText('$120.00')).not.toBeInTheDocument()
      expect(screen.queryByText(/OFF/)).not.toBeInTheDocument()
    })
  })

  describe('CSS classes and styling', () => {
    it('applies custom className', () => {
      render(<ProductCard {...defaultProps} className="custom-class" />)
      
      expect(screen.getByRole('article')).toHaveClass('custom-class')
    })

    it('applies disabled styling when out of stock', () => {
      render(<ProductCard {...defaultProps} inStock={false} />)
      
      const article = screen.getByRole('article')
      const button = screen.getByRole('button')
      
      expect(article).toHaveClass('opacity-90')
      expect(button).toHaveClass('cursor-not-allowed', 'opacity-60')
    })

    it('applies grayscale to image when out of stock', () => {
      render(<ProductCard {...defaultProps} inStock={false} />)
      
      const figure = screen.getByRole('figure')
      expect(figure).toHaveClass('grayscale')
    })
  })
})
