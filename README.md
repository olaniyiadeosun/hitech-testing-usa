# Hitech Testing USA - Modern Marketing Website

A modern, fast, and professional marketing website for Hitech Testing USA, featuring AI-powered product recommendations using xAI Grok 4 Fast and real product data integration.

## 🚀 Features

- **Modern Design**: Clean, professional interface with industrial aesthetic
- **AI Product Finder**: Intelligent equipment recommendations using free Grok 4 Fast model
- **Real Product Data**: Integration with Fine Group catalog (49 products)
- **Animated Interactions**: Subtle, technical animations using Anime.js and Framer Motion
- **Responsive Layout**: Mobile-first design that works on all devices
- **CSV Integration**: Product data management through CSV files
- **Quote Generation**: Automated quote generation and CRM integration
- **Performance Optimized**: Fast loading with Next.js and optimized assets

## 🏗️ Architecture

### Frontend (Next.js + React)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Anime.js + Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

### Backend (Flask + AI)
- **Framework**: Flask with CORS support
- **AI Integration**: xAI Grok 4 Fast (free tier)
- **API**: RESTful endpoints with rate limiting
- **Data**: CSV-based product management
- **Authentication**: OpenRouter API integration

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── finder/            # AI Product Finder page
│   ├── products/          # Product catalog page
│   └── contact/           # Contact page
├── components/            # Reusable UI components
│   ├── Hero.tsx           # Hero section
│   ├── CategoryGrid.tsx   # Product category grid
│   ├── AIProductFinder.tsx # AI-powered product finder
│   ├── Navbar.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── lib/                   # Utility libraries
│   ├── csv-parser.ts      # CSV data processing
│   ├── ai-integration.ts  # AI integration utilities
│   └── api.ts             # API client for Flask backend
├── backend/               # Flask backend
│   ├── app.py             # Main Flask application
│   ├── ai_services.py     # AI integration services
│   ├── convert_catalog.py # Catalog conversion utilities
│   ├── data/              # Product data (CSV files)
│   └── requirements.txt   # Python dependencies
├── public/                # Static assets
│   └── images/            # Product images
└── package.json           # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hitech-testing-usa
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy environment template
   cp backend/env.example backend/.env
   
   # Edit backend/.env and add your OpenRouter API key
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

5. **Start the development servers**
   ```bash
   # Run both frontend and backend together
   npm run dev:full
   
   # Or run separately:
   # Frontend: npm run dev
   # Backend: npm run backend
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🤖 AI Integration

### OpenRouter Setup
1. **Get API Key**: Sign up at [OpenRouter.ai](https://openrouter.ai)
2. **Add to Environment**: Set `OPENROUTER_API_KEY` in `backend/.env`
3. **Free Model**: Uses `x-ai/grok-4-fast:free` (completely free!)

### AI Features
- **Product Recommendations**: Intelligent matching based on user requirements
- **Natural Language Processing**: Understands complex testing requirements
- **Contextual Matching**: Considers capacity, accuracy, standards, and accessories
- **Reasoning**: Provides explanations for recommendations

## 📊 Product Data Management

### Adding New Products
1. Update `backend/data/products.csv`
2. Add product images to `public/images/`
3. Restart backend server

### CSV Format
```csv
id,title,category,subcategory,description,capacity,accuracy,standards,power,warranty,display,control,resolution,scale,price_hint,image
FG-XXXXX,Product Name,Category,Subcategory,Description,Capacity,Accuracy,Standards,Power,Warranty,Display,Control,Resolution,Scale,Price Hint,Image Path
```

### Converting Excel Data
```bash
cd backend
python excel_to_csv.py ../your_catalog.xlsx
python convert_catalog.py
```

## 🔧 Development Commands

```bash
# Setup everything
npm run setup

# Run full stack development
npm run dev:full

# Run frontend only
npm run dev

# Run backend only
npm run backend

# Install backend dependencies
npm run backend:install

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```
Returns backend status and product count.

### Products
```
GET /api/products
```
Returns all available products from CSV data.

### AI Product Search
```
POST /api/products/search
Content-Type: application/json

{
  "query": "tensile test for aluminum per ASTM E8"
}
```
Returns AI-powered product recommendations.

### Quote Generation
```
POST /api/quote/generate
Content-Type: application/json

{
  "customer": { "name": "John Doe", "company": "ACME Corp", ... },
  "requirements": { "material": "Aluminum", "test_type": "Tensile", ... },
  "selectedProducts": ["FG-XXXXX"]
}
```
Generates AI-powered professional quotes.

## 🎨 Brand Guidelines

### Colors
- **Background**: #0B0F14 (Dark)
- **Surface**: #0F141B
- **Cards**: #121926
- **Primary**: #2BDFFF (Cyan)
- **Accent**: #41FF9E (Green)
- **Text**: #E8F1FF
- **Muted**: #8CA2C0

### Typography
- **Display**: Inter Tight
- **Body**: Inter
- **Monospace**: IBM Plex Mono

### Tone
Industrial, precise, trustworthy

## 🚀 Deployment

### Frontend (Vercel)
1. Connect repository to Vercel
2. Set environment variables
3. Deploy automatically

### Backend (Railway/Render)
1. Connect repository
2. Set environment variables
3. Deploy with Python runtime

### Environment Variables
```env
# Frontend
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

# Backend
OPENROUTER_API_KEY=your_openrouter_api_key
FLASK_ENV=production
```

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized static asset caching

## 🔒 Security

- **Rate Limiting**: API endpoints protected
- **CORS**: Configured for production domains
- **Environment Variables**: Sensitive data in .env files
- **Input Validation**: All API inputs validated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Private - Hitech Testing USA, Inc.

## 🆘 Support

For technical support or questions:
- Email: dev@hitechtesting.com
- Phone: (800) 555-0123

---

**Built with ❤️ for Hitech Testing USA**