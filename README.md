# 🍳 SmartChef - AI-Powered Recipe Discovery

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF.svg)](https://vitejs.dev/)

Transform your ingredients into delicious meals with AI-powered recipe suggestions and personalized meal planning. SmartChef helps you discover creative recipes using what you have in your kitchen, making cooking easier and more enjoyable.

## ✨ Features

### �� Core Features
- **AI-Powered Recipe Generation** - Get creative recipes based on your available ingredients
- **Smart Ingredient Matching** - Find recipes that use your specific ingredients
- **Step-by-Step Instructions** - Detailed cooking instructions with timing and techniques
- **Dietary Preferences** - Filter recipes by dietary restrictions (vegan, gluten-free, etc.)
- **Recipe Favorites** - Save and organize your favorite recipes
- **Weekly Meal Planning** - Generate complete meal plans for the week
- **Nutrition Information** - Detailed nutritional breakdown for each recipe

### 🎨 User Experience
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Modern UI/UX** - Beautiful, intuitive interface with smooth animations
- **Real-time Search** - Instant recipe suggestions as you type ingredients
- **Interactive Recipe Cards** - Rich recipe previews with images and details
- **Chef's Tips** - Professional cooking advice and variations

### 🤖 AI Integration
- **Gemini AI Integration** - Powered by Google's Gemini AI for recipe generation
- **Natural Language Processing** - Understands ingredient descriptions and preferences
- **Multi-Cuisine Support** - Recipes from various cuisines (Italian, Asian, Mediterranean, etc.)
- **Fallback Systems** - Robust error handling and fallback recipes

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smartchef.git
   cd smartchef
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Sonner** - Toast notifications
- **React Hook Form** - Form handling and validation

### AI & APIs
- **Google Gemini AI** - Recipe generation and natural language processing
- **RESTful APIs** - Extensible architecture for additional recipe sources

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing


## 🎮 Usage

### Adding Ingredients
1. Type ingredient names in the search box
2. Use the quick-add buttons for common ingredients
3. Add multiple ingredients to get better recipe suggestions

### Finding Recipes
1. Click "Find Recipes" after adding ingredients
2. Browse through AI-generated recipe suggestions
3. Filter by dietary preferences if needed
4. Click "View Recipe" to see detailed instructions

### Saving Favorites
1. Click the heart icon on any recipe card
2. Access your favorites from the navigation menu
3. Organize and manage your saved recipes

### Meal Planning
1. Navigate to the Meal Plan page
2. Generate a weekly meal plan based on your ingredients
3. Get breakfast, lunch, and dinner suggestions for each day

## �� Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### API Configuration
The app uses Google's Gemini AI API. To get an API key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Ensure responsive design
- Follow the existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- **Google Gemini AI** - For providing the AI capabilities
- **Radix UI** - For accessible UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/yourusername/smartchef/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/smartchef/discussions)
- **Email**: your.email@example.com

## 🔮 Roadmap

- [ ] **Recipe Sharing** - Share recipes with friends and family
- [ ] **Shopping Lists** - Generate shopping lists from meal plans
- [ ] **Recipe Ratings** - User ratings and reviews
- [ ] **Cooking Timer** - Built-in cooking timer functionality
- [ ] **Recipe Scaling** - Scale recipes for different serving sizes
- [ ] **Offline Support** - Work without internet connection
- [ ] **Voice Commands** - Voice-controlled recipe search
- [ ] **Integration APIs** - Connect with grocery delivery services

---

Made with ❤️ by Rohit Singh
