import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../Navbar'

// Mock next-themes
const mockSetTheme = jest.fn()
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: mockSetTheme,
  }),
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Navbar', () => {
  beforeEach(() => {
    mockSetTheme.mockClear()
  })

  it('renders the navbar with logo text', () => {
    render(<Navbar />)
    
    expect(screen.getByText('ProductCard')).toBeInTheDocument()
  })

  it('renders logo as a link to home page', () => {
    render(<Navbar />)
    
    const logoLink = screen.getByRole('link', { name: 'ProductCard' })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders theme toggle button and shows emoji after mounting', async () => {
    render(<Navbar />)
    
    const themeButton = screen.getByRole('button')
    expect(themeButton).toBeInTheDocument()
    
    // Wait for the component to mount and show the emoji
    await waitFor(() => {
      expect(themeButton).toHaveTextContent('☀️')
    })
  })

  it('calls setTheme when theme button is clicked', async () => {
    render(<Navbar />)
    
    const themeButton = screen.getByRole('button')
    
    // Wait for the component to be fully mounted
    await waitFor(() => {
      expect(themeButton).toHaveTextContent('☀️')
    })
    
    fireEvent.click(themeButton)
    
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('has proper navigation structure', () => {
    render(<Navbar />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('has proper container and layout classes', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('shadow-sm', 'w-full')
  })

  it('displays sun emoji for dark theme', async () => {
    render(<Navbar />)
    
    await waitFor(() => {
      expect(screen.getByText('☀️')).toBeInTheDocument()
    })
  })

  it('has proper aria-label for theme button', async () => {
    render(<Navbar />)
    
    await waitFor(() => {
      const themeButton = screen.getByRole('button')
      expect(themeButton).toHaveAttribute('aria-label', 'Switch to light mode')
    })
  })
})
