# Hitech Testing USA - Flask Backend

AI-powered backend API for the Hitech Testing USA website with OpenRouter integration.

## Features

- **OpenRouter AI Integration**: Product recommendations and quote generation
- **CSV Product Management**: Load and process product data from CSV files
- **RESTful API**: Clean endpoints for frontend integration
- **Rate Limiting**: Protection against abuse
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Cross-origin requests for frontend integration

## API Endpoints

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
  "customer": {
    "name": "John Doe",
    "company": "ACME Corp",
    "email": "john@acme.com",
    "phone": "(555) 123-4567",
    "city": "Chicago, IL"
  },
  "requirements": {
    "material": "Aluminum",
    "test_type": "Tensile",
    "capacity": "50 kN",
    "standard": "ASTM E8",
    "extras": "Digital extensometer"
  },
  "selectedProducts": ["HTUS-UTM-050"]
}
```
Generates AI-powered professional quotes.

### Send Quote
```
POST /api/quote/send
Content-Type: application/json

{
  "quote_id": "QUO-20241201-ABC12345"
}
```
Sends quote via email and creates CRM lead.

## Setup

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file and add your API keys:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Run the backend**
   ```bash
   python run.py
   ```

   Or using Flask directly:
   ```bash
   python app.py
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features | Yes |
| `RESEND_API_KEY` | Email service API key | No |
| `TWILIO_ACCOUNT_SID` | Twilio account SID for SMS | No |
| `TWILIO_AUTH_TOKEN` | Twilio auth token for SMS | No |
| `HUBSPOT_API_KEY` | HubSpot API key for CRM | No |

## Product Data

Products are loaded from `data/products.csv`. The CSV should have the following columns:

- `id`: Unique product identifier
- `title`: Product name
- `category`: Product category
- `subcategory`: Product subcategory
- `description`: Product description
- `capacity`: Capacity/range specifications
- `accuracy`: Accuracy specifications
- `standards`: Compliance standards (pipe-separated)
- `power`: Power requirements
- `warranty`: Warranty information
- `display`: Display type
- `control`: Control type
- `resolution`: Resolution specifications
- `scale`: Scale/measurement type
- `price_hint`: Price hint text
- `image`: Image path

## AI Integration

### OpenRouter Models Used

- **Product Recommendations**: `meta-llama/llama-3.1-70b-instruct`
- **Quote Generation**: `anthropic/claude-3-5-sonnet`
- **Documentation Q&A**: `google/gemini-1.5-flash`

### AI Features

1. **Product Matching**: Analyzes user requirements and matches with product specifications
2. **Quote Generation**: Creates professional quotes with line items and accessories
3. **Technical Support**: Answers questions based on product documentation

## Development

### Project Structure
```
backend/
├── app.py              # Main Flask application
├── ai_services.py      # AI integration services
├── requirements.txt    # Python dependencies
├── run.py             # Startup script
├── data/
│   └── products.csv   # Product data
└── README.md          # This file
```

### Adding New Endpoints

1. Add route function in `app.py`
2. Update API documentation in this README
3. Add frontend integration in `lib/api.ts`

### Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Search products
curl -X POST http://localhost:5000/api/products/search \
  -H "Content-Type: application/json" \
  -d '{"query": "hardness tester for steel"}'
```

## Production Deployment

### Using Gunicorn
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using Docker
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["python", "run.py"]
```

### Environment Setup
- Set `FLASK_ENV=production`
- Use production database
- Configure proper logging
- Set up monitoring and health checks

## Troubleshooting

### Common Issues

1. **OpenRouter API errors**: Check API key and rate limits
2. **CSV loading errors**: Verify file format and encoding
3. **CORS errors**: Ensure frontend URL is allowed
4. **Rate limiting**: Adjust limits in Flask-Limiter configuration

### Logs
Check console output for detailed error messages and API call logs.

## Support

For technical support:
- Email: dev@hitechtesting.com
- Phone: (800) 555-0123

