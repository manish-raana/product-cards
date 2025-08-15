import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Footer', () => {
  it('renders the footer with copyright text', () => {
    render(<Footer />)
    
    expect(screen.getByText(/© 2024 Product Card App/)).toBeInTheDocument()
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />)
    
    const linkedinLink = screen.getByLabelText("Visit Manish Rana's LinkedIn profile")
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/manishraana/')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('renders GitHub link with correct href', () => {
    render(<Footer />)
    
    const githubLink = screen.getByLabelText("Visit Manish Rana's GitHub profile")
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/manish-raana')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('renders author credit with LinkedIn link', () => {
    render(<Footer />)
    
    expect(screen.getByText(/Created with ❤️ by/)).toBeInTheDocument()
    expect(screen.getByText('Manish Rana')).toBeInTheDocument()
    
    const authorLink = screen.getByText('Manish Rana')
    expect(authorLink).toHaveAttribute('href', 'https://www.linkedin.com/in/manishraana/')
  })

  it('has proper footer structure', () => {
    render(<Footer />)
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('has proper social media icons', () => {
    render(<Footer />)
    
    // Check that SVG icons are present
    const svgElements = document.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThan(0)
  })
})
