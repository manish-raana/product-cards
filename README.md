# Product Card App

A modern, responsive product display application built with Next.js, featuring beautiful product cards with interactive animations and dark mode support.

## ✨ Features

- **Responsive Product Cards** - Beautiful, reusable product cards with hover effects
- **Dark Mode Support** - Toggle between light and dark themes
- **Framer Motion Animations** - Smooth, interactive animations for better UX
- **Accessibility First** - Semantic HTML, ARIA labels, and keyboard navigation
- **Sale & Stock Management** - Display sale badges, discount percentages, and stock status
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **TypeScript** - Full type safety throughout the application
- **Comprehensive Testing** - Jest and React Testing Library with 90%+ coverage

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Theme**: next-themes for dark mode
- **Testing**: Jest + React Testing Library
- **Language**: TypeScript
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd product-card-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test ProductCard.test.tsx
```

### Run linter
```bash
npm run lint
```

## 🏗️ Build

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

## 📱 Responsive Testing

Test the application's responsiveness using Chrome DevTools:

1. Open DevTools (`F12`)
2. Click the device toolbar (📱 icon)
3. Test different screen sizes:
   - **Mobile**: 375px, 390px
   - **Tablet**: 768px, 1024px
   - **Desktop**: 1280px, 1920px

## 🎨 Features in Detail

### Product Cards
- **Image Display**: Optimized images with Next.js Image component
- **Price Formatting**: Consistent currency display with proper formatting
- **Sale Badges**: Dynamic sale indicators with percentage discounts
- **Stock Status**: Visual indicators for out-of-stock items
- **Hover Effects**: Smooth animations on card interaction
- **Accessibility**: Proper ARIA labels and semantic HTML

### Theme System
- **Dark/Light Mode**: Seamless theme switching
- **Hydration Safe**: No SSR/CSR mismatches
- **Persistent**: Theme preference saved in localStorage

### Animations
- **Card Hover**: Subtle lift and scale effects
- **Image Zoom**: Gentle image scaling on hover
- **Button Feedback**: Tap animations for better interactivity
- **Smooth Transitions**: Spring-based animations for natural feel

## 📊 Test Coverage

- **ProductCard Component**: 88.46% statements, 93.18% branches, 100% functions
- **Navbar Component**: 100% statements, 50% branches, 100% functions
- **Overall Coverage**: 83.78% statements, 89.58% branches, 85.71% functions

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ProductCard.tsx      # Main product card component
│   │   ├── Navbar.tsx           # Navigation with theme toggle
│   │   ├── theme-provider.tsx   # Theme context provider
│   │   └── __tests__/           # Test files
│   ├── api/
│   │   └── products/
│   │       └── route.ts         # Product data API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
└── types/
    └── product.ts               # TypeScript type definitions
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Deploy to other platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Manish Rana**

- **LinkedIn**: [Manish Rana](https://www.linkedin.com/in/manishraana/)
- **GitHub**: [@manishraana](https://github.com/manish-raana)

---

⭐ If you found this project helpful, please give it a star!
