# Zelion Grid

Infrastructure-first energy validation network built with React and modern web technologies.

## About

Zelion is a decentralized infrastructure system focused on real-world energy validation through hardware-based validators, deterministic processing, and blockchain coordination. This repository contains the official website and documentation platform.

**Key Features:**
- Infrastructure-first validation architecture
- Hardware-backed energy data verification
- Industrial-grade design system with silver-primary color scheme
- Mobile-optimized content presentation
- Comprehensive tokenomics and technical documentation

## Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd zelion-grid

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

### Available Scripts

```sh
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm run test
```

## Project Structure

```
zelion-grid/
├── src/
│   ├── components/
│   │   ├── landing/          # Homepage sections
│   │   ├── ui/               # Reusable UI components
│   │   ├── Navbar.jsx        # Main navigation
│   │   └── Footer.jsx        # Site footer
│   ├── pages/                # Route pages
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── App.jsx               # Root component
│   └── main.jsx              # Entry point
├── public/                   # Static assets
└── index.html                # HTML template
```

## Design System

The project uses a silver-primary industrial design system reflecting infrastructure-grade reliability:

- **Primary Color**: Metallic silver gradients (#F1F5F9 → #C7CCD4 → #8F96A3)
- **Accent**: Subtle blue (≤20% opacity, micro-interactions only)
- **Typography**: System fonts with heading emphasis
- **Components**: Glass-morphism cards with industrial aesthetic

## Development

### Code Style

- ESLint configuration included
- Follow React best practices
- Use functional components with hooks
- Maintain component modularity

### Content Guidelines

- Keep paragraphs to 1-3 sentences for mobile readability
- Preserve all legal and compliance language
- Maintain whitepaper alignment
- Use institutional tone throughout

## Deployment

Build the production-ready application:

```sh
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

All rights reserved.

## Contact

For questions or support regarding the Zelion infrastructure network, please refer to the official documentation or contact the development team through official channels.
