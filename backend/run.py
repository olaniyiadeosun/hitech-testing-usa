#!/usr/bin/env python3
"""
Startup script for Hitech Testing USA Flask backend
"""

import os
import sys
from pathlib import Path

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Import and run the Flask app
from app import app, load_products

if __name__ == '__main__':
    print("Starting Hitech Testing USA Backend...")
    print("Loading product data...")
    
    # Load products on startup
    load_products()
    
    print("Backend ready!")
    print("API available at: http://localhost:5000")
    print("API Documentation:")
    print("   - Health: GET /api/health")
    print("   - Products: GET /api/products")
    print("   - Search: POST /api/products/search")
    print("   - Quote: POST /api/quote/generate")
    print("   - Send Quote: POST /api/quote/send")
    print("\nMake sure to set OPENROUTER_API_KEY in .env file for AI features")
    print("=" * 60)
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )

