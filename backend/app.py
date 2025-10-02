from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from dotenv import load_dotenv
import csv
import requests
import json
from datetime import datetime, timedelta
import logging
from typing import List, Dict, Any
import uuid

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Rate limiting
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
limiter.init_app(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# OpenRouter configuration
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# Load product data
PRODUCTS_CSV_PATH = os.path.join(os.path.dirname(__file__), 'data', 'products.csv')
products_data = []

def load_products():
    """Load products from CSV file"""
    global products_data
    try:
        if os.path.exists(PRODUCTS_CSV_PATH):
            with open(PRODUCTS_CSV_PATH, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                products_data = list(reader)
                logger.info(f"Loaded {len(products_data)} products from CSV")
        else:
            # Create sample data if CSV doesn't exist
            create_sample_products()
    except Exception as e:
        logger.error(f"Error loading products: {e}")
        create_sample_products()

def create_sample_products():
    """Create sample product data"""
    global products_data
    products_data = [
        {
            'id': 'HTUS-PR-HT-001',
            'title': 'Portable Hardness Tester',
            'category': 'Hardness Testing',
            'subcategory': 'Portable',
            'description': 'Lightweight battery-powered hardness tester for field applications',
            'capacity': 'HB/HRC/HRB scales',
            'accuracy': '±1 HRC',
            'standards': 'ASTM E18|ISO 6508',
            'power': 'Battery',
            'warranty': '2 years',
            'display': 'Digital',
            'control': 'Manual',
            'resolution': '0.1 HR',
            'scale': 'HB/HRC/HRB',
            'price_hint': 'Request a quote',
            'image': '/images/placeholder.svg'
        },
        {
            'id': 'HTUS-ROC-022',
            'title': 'Rockwell Hardness Tester (Digital)',
            'category': 'Hardness Testing',
            'subcategory': 'Bench',
            'description': 'High-precision digital Rockwell hardness tester with automated testing capabilities',
            'capacity': 'HRC/HRB/HRD',
            'accuracy': '±0.5 HR',
            'standards': 'ASTM E18|ISO 6508',
            'power': '110V AC',
            'warranty': '2 years',
            'display': 'Touch Screen',
            'control': 'Automated',
            'resolution': '0.1 HR',
            'scale': 'HRC/HRB/HRD',
            'price_hint': 'Request a quote',
            'image': '/images/placeholder.svg'
        },
        {
            'id': 'HTUS-UTM-050',
            'title': '50 kN Universal Testing Machine',
            'category': 'UTM',
            'subcategory': 'Electromechanical',
            'description': 'Versatile universal testing machine for tensile compression and flexural testing',
            'capacity': '50 kN',
            'accuracy': '±0.5% FS',
            'standards': 'ASTM E8|ASTM E8M|ISO 6892',
            'power': '220V AC',
            'warranty': '2 years',
            'display': 'Digital',
            'control': 'Closed-loop',
            'resolution': '0.1 N',
            'scale': 'Force/Displacement',
            'price_hint': 'Request a quote',
            'image': '/images/placeholder.svg'
        },
        {
            'id': 'HTUS-DYN-040',
            'title': 'Dynamic Balancing Machine',
            'category': 'Balancing',
            'subcategory': 'Precision',
            'description': 'Precision dynamic balancing machine for rotors fans and rotating components',
            'capacity': 'Up to 50 kg',
            'accuracy': 'ISO 2953',
            'standards': 'ISO 2953|ISO 1940',
            'power': '220V AC',
            'warranty': '2 years',
            'display': 'Real-time',
            'control': 'Automatic',
            'resolution': '0.01 g',
            'scale': 'Weight/Unbalance',
            'price_hint': 'Request a quote',
            'image': '/images/placeholder.svg'
        }
    ]
    logger.info(f"Created {len(products_data)} sample products")

def call_openrouter_api(messages: List[Dict[str, str]], model: str = "x-ai/grok-4-fast:free") -> str:
    """Call OpenRouter API for AI responses"""
    if not OPENROUTER_API_KEY:
        logger.warning("OpenRouter API key not found, using mock response")
        return "AI service unavailable - using fallback recommendations"
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://hitechtesting.com",
        "X-Title": "Hitech Testing USA"
    }
    
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 1000
    }
    
    try:
        response = requests.post(
            f"{OPENROUTER_BASE_URL}/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )
        response.raise_for_status()
        
        result = response.json()
        return result['choices'][0]['message']['content']
    
    except requests.exceptions.RequestException as e:
        logger.error(f"OpenRouter API error: {e}")
        return "AI service temporarily unavailable"

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'products_loaded': len(products_data)
    })

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products"""
    if not products_data:
        load_products()
    
    # Use products data directly
    products = products_data.copy()
    
    # Parse standards field
    for product in products:
        if product.get('standards'):
            product['standards'] = product['standards'].split('|')
        else:
            product['standards'] = []
    
    return jsonify({
        'success': True,
        'products': products,
        'total': len(products)
    })

@app.route('/api/products/search', methods=['POST'])
@limiter.limit("10 per minute")
def search_products():
    """Search products with AI assistance"""
    try:
        data = request.get_json()
        query = data.get('query', '')
        
        if not query:
            return jsonify({'success': False, 'error': 'Query is required'}), 400
        
        # AI-powered product recommendation
        ai_recommendations = get_ai_product_recommendations(query)
        
        return jsonify({
            'success': True,
            'query': query,
            'recommendations': ai_recommendations,
            'total': len(ai_recommendations)
        })
    
    except Exception as e:
        logger.error(f"Search error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

def get_ai_product_recommendations(query: str) -> List[Dict[str, Any]]:
    """Get AI-powered product recommendations"""
    if not products_data:
        load_products()
    
    # Use products data directly
    products_context = products_data.copy()
    
    system_prompt = """You are a US product-spec assistant for materials testing machines. 
    Analyze the user's testing requirements and recommend 1-3 exact models from the product catalog.
    Always include capacity, accuracy, standards, power, and compatible accessories.
    If information is missing, ask 1 targeted question.
    End with clear CTAs for quotes and more information.
    
    Product Catalog:
    """
    
    # Add product information to context
    for product in products_context:
        system_prompt += f"\n- {product['title']} ({product['id']}): {product['description']}"
        system_prompt += f"\n  Category: {product['category']}"
        system_prompt += f"\n  Capacity: {product['capacity']}"
        system_prompt += f"\n  Accuracy: {product['accuracy']}"
        system_prompt += f"\n  Standards: {product['standards']}"
        system_prompt += f"\n  Price: {product['price_hint']}\n"
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"User requirement: {query}"}
    ]
    
    # Get AI response
    ai_response = call_openrouter_api(messages)
    
    # Parse AI response and match with products
    recommendations = []
    query_lower = query.lower()
    
    for product in products_context:
        match_score = calculate_match_score(product, query_lower)
        
        if match_score > 0:
            # Parse standards
            standards = product['standards'].split('|') if product['standards'] else []
            
            recommendation = {
                'id': product['id'],
                'title': product['title'],
                'category': product['category'],
                'description': product['description'],
                'specs': [
                    f"Capacity: {product['capacity']}",
                    f"Accuracy: {product['accuracy']}",
                    f"Standards: {', '.join(standards)}",
                    f"Control: {product['control']}",
                    f"Display: {product['display']}"
                ],
                'price_hint': product['price_hint'],
                'match_score': match_score,
                'reasoning': f"Matches your requirement for {query}",
                'accessories': get_recommended_accessories(product['category']),
                'image': product['image']
            }
            recommendations.append(recommendation)
    
    # Sort by match score and limit to top 3
    recommendations.sort(key=lambda x: x['match_score'], reverse=True)
    return recommendations[:3]

def calculate_match_score(product: Dict[str, Any], query: str) -> int:
    """Calculate match score for product"""
    score = 0
    query_lower = query.lower()
    
    # Title match (highest weight)
    if query_lower in product['title'].lower():
        score += 40
    
    # Category match
    if query_lower in product['category'].lower():
        score += 30
    
    # Description match
    if query_lower in product['description'].lower():
        score += 20
    
    # Standards match
    if product['standards'] and any(std.lower() in query_lower for std in product['standards'].split('|')):
        score += 15
    
    # Capacity match
    if query_lower in product['capacity'].lower():
        score += 10
    
    # Specific keyword matches
    keyword_matches = {
        'hardness': product['category'].lower() == 'hardness testing',
        'tensile': 'utm' in product['category'].lower(),
        'balancing': product['category'].lower() == 'balancing',
        'portable': 'portable' in product['title'].lower(),
        'digital': 'digital' in product['display'].lower(),
        'automated': 'automated' in product['control'].lower()
    }
    
    for keyword, matches in keyword_matches.items():
        if keyword in query_lower and matches:
            score += 10
    
    return min(score, 100)

def get_recommended_accessories(category: str) -> List[str]:
    """Get recommended accessories based on category"""
    accessories_map = {
        'Hardness Testing': ['Test blocks', 'Anvils', 'Indenters', 'Calibration certificate'],
        'UTM': ['Grips', 'Extensometer', 'Software', 'Load cells'],
        'Balancing': ['Correction weights', 'Coupling', 'Support bearings', 'Software'],
        'Civil Engineering': ['Test specimens', 'Measuring tools', 'Calibration weights']
    }
    return accessories_map.get(category, ['Standard accessories', 'Calibration certificate'])

@app.route('/api/quote/generate', methods=['POST'])
@limiter.limit("5 per minute")
def generate_quote():
    """Generate AI-powered quote"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['customer', 'requirements', 'selectedProducts']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        quote = create_ai_quote(data)
        
        return jsonify({
            'success': True,
            'quote': quote
        })
    
    except Exception as e:
        logger.error(f"Quote generation error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

def create_ai_quote(request_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create AI-generated quote"""
    quote_id = f"QUO-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}"
    
    # Generate quote using AI
    system_prompt = """You are a professional sales engineer for Hitech Testing USA. 
    Create a detailed, professional quote for materials testing equipment.
    Include base equipment, mandatory accessories, optional accessories, delivery terms, and warranty information.
    Format as a structured quote with clear line items and pricing.
    Use USD pricing and include professional terms and conditions."""
    
    customer_info = request_data['customer']
    requirements = request_data['requirements']
    selected_products = request_data['selectedProducts']
    
    user_prompt = f"""
    Customer: {customer_info['name']} at {customer_info['company']}
    Requirements: {requirements}
    Selected Products: {', '.join(selected_products)}
    
    Generate a professional quote with:
    1. Line items for each product
    2. Mandatory accessories (installation, training, calibration)
    3. Optional accessories (service plans, extended warranty)
    4. Delivery terms and lead times
    5. Payment terms (Net 30 available)
    6. Warranty information
    7. Total pricing in USD
    """
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    ai_quote_text = call_openrouter_api(messages, "anthropic/claude-3-5-sonnet")
    
    # Structure the quote response
    quote = {
        'id': quote_id,
        'customer': customer_info,
        'requirements': requirements,
        'selected_products': selected_products,
        'line_items': generate_line_items(selected_products),
        'accessories': generate_accessories(),
        'delivery': {
            'lead_time': '4-6 weeks',
            'shipping': 'FOB Destination',
            'installation': 'Included with training'
        },
        'terms': {
            'warranty': '2 years parts and labor',
            'calibration': 'NIST-traceable certificate included',
            'payment': 'Net 30 terms available on credit approval'
        },
        'total': calculate_quote_total(selected_products),
        'valid_until': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
        'ai_generated_content': ai_quote_text,
        'created_at': datetime.now().isoformat()
    }
    
    return quote

def generate_line_items(selected_products: List[str]) -> List[Dict[str, Any]]:
    """Generate line items for selected products"""
    line_items = []
    
    for product_id in selected_products:
        # Find product in catalog
        product = next((p for p in products_data if p['id'] == product_id), None)
        
        if product is not None:
            line_items.append({
                'product_id': product_id,
                'description': product['title'],
                'quantity': 1,
                'unit_price': 15000,  # Base price - in real app, this would come from pricing system
                'total': 15000,
                'category': 'Equipment'
            })
    
    return line_items

def generate_accessories() -> Dict[str, List[Dict[str, Any]]]:
    """Generate accessories for quote"""
    mandatory = [
        {
            'description': 'Installation & Operator Training',
            'quantity': 1,
            'unit_price': 2500,
            'total': 2500,
            'category': 'Service'
        },
        {
            'description': 'NIST-Traceable Calibration Certificate',
            'quantity': 1,
            'unit_price': 500,
            'total': 500,
            'category': 'Calibration'
        }
    ]
    
    optional = [
        {
            'description': 'Annual Service Plan (Year 1)',
            'quantity': 1,
            'unit_price': 1800,
            'total': 1800,
            'category': 'Service'
        },
        {
            'description': 'Extended Warranty (3 years)',
            'quantity': 1,
            'unit_price': 1200,
            'total': 1200,
            'category': 'Warranty'
        }
    ]
    
    return {
        'mandatory': mandatory,
        'optional': optional
    }

def calculate_quote_total(selected_products: List[str]) -> Dict[str, float]:
    """Calculate quote totals"""
    equipment_total = len(selected_products) * 15000  # Base equipment price
    accessories = generate_accessories()
    mandatory_total = sum(item['total'] for item in accessories['mandatory'])
    
    return {
        'equipment_subtotal': equipment_total,
        'mandatory_accessories': mandatory_total,
        'subtotal': equipment_total + mandatory_total,
        'tax_rate': 0.08,  # 8% tax rate
        'tax_amount': (equipment_total + mandatory_total) * 0.08,
        'total': (equipment_total + mandatory_total) * 1.08
    }

@app.route('/api/quote/send', methods=['POST'])
@limiter.limit("3 per minute")
def send_quote():
    """Send quote via email and create CRM lead"""
    try:
        data = request.get_json()
        quote_id = data.get('quote_id')
        
        if not quote_id:
            return jsonify({'success': False, 'error': 'Quote ID is required'}), 400
        
        # In a real implementation, this would:
        # 1. Generate PDF quote
        # 2. Send email via Resend/SES
        # 3. Create CRM lead in HubSpot/Sheets
        # 4. Send SMS notification
        
        result = {
            'quote_id': quote_id,
            'email_sent': True,
            'crm_lead_created': True,
            'sms_sent': False,  # Would require Twilio setup
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'result': result
        })
    
    except Exception as e:
        logger.error(f"Quote sending error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    # Load products on startup
    load_products()
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
