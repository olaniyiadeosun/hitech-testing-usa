"""
AI Services for Hitech Testing USA
Handles OpenRouter integration and AI-powered features
"""

import requests
import json
import logging
from typing import List, Dict, Any, Optional
import os
from datetime import datetime

logger = logging.getLogger(__name__)

class OpenRouterService:
    """Service for interacting with OpenRouter API"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://openrouter.ai/api/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://hitechtesting.com",
            "X-Title": "Hitech Testing USA"
        }
    
    def generate_product_recommendations(self, user_query: str, products: List[Dict[str, Any]]) -> str:
        """Generate AI-powered product recommendations"""
        
        system_prompt = """You are a US product-spec assistant for materials testing machines at Hitech Testing USA. 
        Your role is to analyze customer testing requirements and recommend 1-3 exact models from our product catalog.
        
        Guidelines:
        1. Always include capacity, accuracy, standards, power, and compatible accessories
        2. If information is missing, ask 1 targeted question to clarify
        3. End with clear CTAs for quotes and more information
        4. Be precise and technical, but accessible
        5. Focus on US standards compliance (ASTM, ISO, ASME)
        6. Emphasize NIST-traceable calibration and US-based support
        
        Product Catalog:
        """
        
        # Add product information to context
        for product in products:
            system_prompt += f"\n- {product['title']} ({product['id']}): {product['description']}"
            system_prompt += f"\n  Category: {product['category']}"
            system_prompt += f"\n  Capacity: {product['capacity']}"
            system_prompt += f"\n  Accuracy: {product['accuracy']}"
            system_prompt += f"\n  Standards: {product['standards']}"
            system_prompt += f"\n  Price: {product['price_hint']}\n"
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Customer requirement: {user_query}"}
        ]
        
        return self._call_api(messages, model="x-ai/grok-4-fast:free")
    
    def generate_quote_content(self, customer_info: Dict[str, Any], requirements: Dict[str, Any], 
                             selected_products: List[str]) -> str:
        """Generate AI-powered quote content"""
        
        system_prompt = """You are a professional sales engineer for Hitech Testing USA. 
        Create a detailed, professional quote for materials testing equipment.
        
        Requirements:
        1. Include base equipment, mandatory accessories, optional accessories
        2. Include delivery terms, lead times, and warranty information
        3. Format as a structured quote with clear line items and pricing
        4. Use USD pricing and include professional terms and conditions
        5. Emphasize NIST-traceable calibration and US-based support
        6. Include installation and training services
        7. Mention Net 30 payment terms and W-9 availability
        
        Be professional, detailed, and customer-focused."""
        
        user_prompt = f"""
        Customer Information:
        - Name: {customer_info.get('name', 'N/A')}
        - Company: {customer_info.get('company', 'N/A')}
        - Location: {customer_info.get('city', 'N/A')}
        - Email: {customer_info.get('email', 'N/A')}
        
        Testing Requirements:
        - Material: {requirements.get('material', 'N/A')}
        - Test Type: {requirements.get('test_type', 'N/A')}
        - Capacity: {requirements.get('capacity', 'N/A')}
        - Standards: {requirements.get('standard', 'N/A')}
        - Additional Requirements: {requirements.get('extras', 'N/A')}
        
        Selected Products: {', '.join(selected_products)}
        
        Generate a professional quote with detailed line items, accessories, delivery terms, and total pricing.
        """
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        return self._call_api(messages, model="x-ai/grok-4-fast:free")
    
    def generate_manuals_response(self, question: str, manual_context: str) -> str:
        """Generate response from manual documentation"""
        
        system_prompt = """You are a technical support specialist for Hitech Testing USA.
        Answer questions strictly based on the provided manual documentation.
        
        Guidelines:
        1. Only answer from the provided manual content
        2. If unsure, say you're unsure and suggest contacting service
        3. Always cite page numbers when available
        4. Be precise and technical
        5. No hallucinations - stick to the documentation
        
        Manual Content:
        """
        
        messages = [
            {"role": "system", "content": system_prompt + manual_context},
            {"role": "user", "content": question}
        ]
        
        return self._call_api(messages, model="x-ai/grok-4-fast:free")
    
    def _call_api(self, messages: List[Dict[str, str]], model: str = "x-ai/grok-4-fast:free") -> str:
        """Make API call to OpenRouter"""
        
        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 1000,
            "stream": False
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=self.headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            result = response.json()
            return result['choices'][0]['message']['content']
        
        except requests.exceptions.RequestException as e:
            logger.error(f"OpenRouter API error: {e}")
            return "AI service temporarily unavailable. Please contact our sales team for assistance."
        except KeyError as e:
            logger.error(f"Unexpected API response format: {e}")
            return "AI service error. Please contact our sales team for assistance."

class ProductMatcher:
    """Service for matching products based on user requirements"""
    
    @staticmethod
    def calculate_match_score(product: Dict[str, Any], query: str) -> int:
        """Calculate match score for product based on query"""
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
        if product.get('standards'):
            standards = product['standards'] if isinstance(product['standards'], list) else product['standards'].split('|')
            if any(std.lower() in query_lower for std in standards):
                score += 15
        
        # Capacity match
        if product.get('capacity') and query_lower in product['capacity'].lower():
            score += 10
        
        # Specific keyword matches
        keyword_matches = {
            'hardness': product['category'].lower() == 'hardness testing',
            'tensile': 'utm' in product['category'].lower(),
            'balancing': product['category'].lower() == 'balancing',
            'portable': 'portable' in product['title'].lower(),
            'digital': 'digital' in product.get('display', '').lower(),
            'automated': 'automated' in product.get('control', '').lower(),
            'astm': 'astm' in product.get('standards', '').lower(),
            'iso': 'iso' in product.get('standards', '').lower()
        }
        
        for keyword, matches in keyword_matches.items():
            if keyword in query_lower and matches:
                score += 10
        
        return min(score, 100)
    
    @staticmethod
    def get_recommended_accessories(category: str) -> List[str]:
        """Get recommended accessories based on category"""
        accessories_map = {
            'Hardness Testing': [
                'Test blocks for calibration',
                'Anvils (various sizes)',
                'Indenters (Rockwell, Vickers)',
                'NIST-traceable calibration certificate'
            ],
            'UTM': [
                'Grips for various materials',
                'Digital extensometer',
                'Advanced testing software',
                'Load cells (various capacities)'
            ],
            'Balancing': [
                'Correction weights set',
                'Flexible coupling',
                'Support bearings',
                'Balancing software'
            ],
            'Civil Engineering': [
                'Test specimens',
                'Measuring tools',
                'Calibration weights',
                'Sample preparation equipment'
            ]
        }
        return accessories_map.get(category, ['Standard accessories', 'NIST-traceable calibration certificate'])

class QuoteGenerator:
    """Service for generating structured quotes"""
    
    @staticmethod
    def generate_line_items(selected_products: List[str], products_catalog: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate line items for selected products"""
        line_items = []
        
        for product_id in selected_products:
            # Find product in catalog
            product = next((p for p in products_catalog if p['id'] == product_id), None)
            
            if product:
                line_items.append({
                    'product_id': product_id,
                    'description': product['title'],
                    'quantity': 1,
                    'unit_price': 15000,  # Base price - in real app, this would come from pricing system
                    'total': 15000,
                    'category': 'Equipment',
                    'specifications': {
                        'capacity': product.get('capacity', ''),
                        'accuracy': product.get('accuracy', ''),
                        'standards': product.get('standards', ''),
                        'warranty': product.get('warranty', '')
                    }
                })
        
        return line_items
    
    @staticmethod
    def generate_accessories() -> Dict[str, List[Dict[str, Any]]]:
        """Generate accessories for quote"""
        mandatory = [
            {
                'description': 'Installation & Operator Training',
                'quantity': 1,
                'unit_price': 2500,
                'total': 2500,
                'category': 'Service',
                'notes': 'On-site installation and comprehensive operator training included'
            },
            {
                'description': 'NIST-Traceable Calibration Certificate',
                'quantity': 1,
                'unit_price': 500,
                'total': 500,
                'category': 'Calibration',
                'notes': 'Annual calibration certificate with NIST traceability'
            }
        ]
        
        optional = [
            {
                'description': 'Annual Service Plan (Year 1)',
                'quantity': 1,
                'unit_price': 1800,
                'total': 1800,
                'category': 'Service',
                'notes': 'Includes preventive maintenance, calibration, and priority support'
            },
            {
                'description': 'Extended Warranty (3 years)',
                'quantity': 1,
                'unit_price': 1200,
                'total': 1200,
                'category': 'Warranty',
                'notes': 'Extended warranty coverage for 3 years total'
            },
            {
                'description': 'Additional Operator Training (2 people)',
                'quantity': 1,
                'unit_price': 800,
                'total': 800,
                'category': 'Training',
                'notes': 'Additional training for 2 additional operators'
            }
        ]
        
        return {
            'mandatory': mandatory,
            'optional': optional
        }
    
    @staticmethod
    def calculate_quote_total(selected_products: List[str], include_optional: bool = False) -> Dict[str, float]:
        """Calculate quote totals"""
        equipment_total = len(selected_products) * 15000  # Base equipment price
        accessories = QuoteGenerator.generate_accessories()
        
        mandatory_total = sum(item['total'] for item in accessories['mandatory'])
        optional_total = sum(item['total'] for item in accessories['optional']) if include_optional else 0
        
        subtotal = equipment_total + mandatory_total + optional_total
        tax_rate = 0.08  # 8% tax rate
        tax_amount = subtotal * tax_rate
        total = subtotal + tax_amount
        
        return {
            'equipment_subtotal': equipment_total,
            'mandatory_accessories': mandatory_total,
            'optional_accessories': optional_total,
            'subtotal': subtotal,
            'tax_rate': tax_rate,
            'tax_amount': tax_amount,
            'total': total
        }

