# OkiMart - Fast Essentials

A modern, production-grade React + TypeScript grocery delivery app built with a clean, scalable architecture.

## Features

- 🛒 **Modern UI/UX** - Clean, mobile-first design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for optimal development and build performance
- 🔧 **TypeScript** - Full type safety and excellent developer experience
- 📱 **Responsive Design** - Optimized for mobile devices with touch-friendly interactions
- 🎨 **Component Library** - Reusable UI components following design system principles
- 🏗️ **Scalable Architecture** - Feature-based folder structure for easy maintenance
- ♿ **Accessibility** - Built with accessibility best practices in mind

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **ESLint** for code quality

## Project Structure

```
src/
├── assets/          # Static images, icons, fonts
├── components/      # Reusable UI components
│   └── ui/         # Base UI components (Button, Card, etc.)
├── features/        # Feature-based modules
├── hooks/          # Custom reusable hooks
├── layouts/        # App layouts (MainLayout, AuthLayout)
├── pages/          # Page-level components
├── services/       # API services and data
├── store/          # State management
├── types/          # TypeScript interfaces
├── utils/          # Helper functions
├── App.tsx
└── main.tsx
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design System

The app follows a consistent design system with:

- **Primary Colors**: Green-based palette for branding
- **Accent Colors**: Yellow for highlights, red for prices
- **Typography**: Inter font family for clean readability
- **Spacing**: Consistent padding and margins using Tailwind's spacing scale
- **Shadows**: Subtle card shadows for depth and hierarchy

## Features Implemented

### Home Page
- Store header with logo, rating, and address
- Smart list section with interactive tags
- Delivery information banner
- Product categories (Produce, Meat, Daily Essentials)
- Reusable product cards with add to cart functionality
- Bottom navigation bar

### Components
- **SearchBar** - Search input with icon and back button
- **StoreHeader** - Store information display
- **SmartList** - Interactive grocery suggestions
- **ProductCard** - Product display with add to cart
- **ProductSection** - Category-based product listings
- **BottomNavigation** - Main app navigation

## Future Enhancements

- Shopping cart functionality
- User authentication
- Order management
- Payment integration
- Product search and filtering
- Real-time inventory updates
- Push notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details