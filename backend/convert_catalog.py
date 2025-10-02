#!/usr/bin/env python3
"""
Convert Fine Group catalog to Hitech Testing USA format
"""

import pandas as pd
import re
import uuid
from pathlib import Path

def convert_fine_group_catalog(input_csv_path, output_csv_path):
    """Convert Fine Group catalog to our backend format"""
    
    # Read the Fine Group catalog
    df = pd.read_csv(input_csv_path)
    
    print(f"Converting {len(df)} products from Fine Group catalog...")
    
    converted_products = []
    
    for index, row in df.iterrows():
        # Generate unique ID
        product_id = f"FG-{str(uuid.uuid4())[:8].upper()}"
        
        # Extract capacity from specifications
        capacity = extract_capacity(row['specifications'])
        
        # Extract accuracy from specifications
        accuracy = extract_accuracy(row['specifications'])
        
        # Parse standards (convert comma-separated to pipe-separated)
        standards = row['standards'].replace(', ', '|') if pd.notna(row['standards']) else ''
        
        # Determine power requirements based on type
        power = determine_power_requirements(row['type'])
        
        # Determine display type
        display = determine_display_type(row['type'])
        
        # Determine control type
        control = determine_control_type(row['type'])
        
        # Create converted product
        product = {
            'id': product_id,
            'title': row['product_name'],
            'category': row['category'],
            'subcategory': row['type'],
            'description': f"{row['product_name']} - {row['specifications'][:200]}...",
            'capacity': capacity,
            'accuracy': accuracy,
            'standards': standards,
            'power': power,
            'warranty': '2 years',
            'display': display,
            'control': control,
            'resolution': extract_resolution(row['specifications']),
            'scale': extract_scale(row['specifications']),
            'price_hint': 'Request a quote',
            'image': '/images/placeholder.svg'
        }
        
        converted_products.append(product)
    
    # Create DataFrame and save
    converted_df = pd.DataFrame(converted_products)
    converted_df.to_csv(output_csv_path, index=False)
    
    print(f"Successfully converted {len(converted_products)} products")
    print(f"Saved to: {output_csv_path}")
    
    return converted_products

def extract_capacity(specifications):
    """Extract capacity from specifications"""
    if pd.isna(specifications):
        return 'Various'
    
    # Look for kN capacity patterns
    capacity_patterns = [
        r'(\d+)\s*kN',
        r'capacity[:\s]*(\d+[–-]\d+)\s*kN',
        r'(\d+[–-]\d+)\s*kN\s*capacity'
    ]
    
    for pattern in capacity_patterns:
        match = re.search(pattern, str(specifications), re.IGNORECASE)
        if match:
            return f"{match.group(1)} kN"
    
    # Look for other capacity indicators
    if '100–2000' in str(specifications):
        return '100-2000 kN'
    elif '2000 kN' in str(specifications):
        return '2000 kN'
    elif '1200 kN' in str(specifications):
        return '1200 kN'
    elif '400–2000' in str(specifications):
        return '400-2000 kN'
    elif '100–3000' in str(specifications):
        return '100-3000 kN'
    
    return 'Various'

def extract_accuracy(specifications):
    """Extract accuracy from specifications"""
    if pd.isna(specifications):
        return 'Standard'
    
    # Look for accuracy patterns
    accuracy_patterns = [
        r'accuracy[:\s]*([±]\d+%)',
        r'([±]\d+%)\s*accuracy',
        r'([±]\d+\.\d+%)\s*accuracy'
    ]
    
    for pattern in accuracy_patterns:
        match = re.search(pattern, str(specifications), re.IGNORECASE)
        if match:
            return match.group(1)
    
    # Default accuracy based on type
    if '±1%' in str(specifications):
        return '±1%'
    elif '±0.5%' in str(specifications):
        return '±0.5%'
    
    return '±1%'

def extract_resolution(specifications):
    """Extract resolution from specifications"""
    if pd.isna(specifications):
        return 'Standard'
    
    # Look for resolution patterns
    resolution_patterns = [
        r'resolution[:\s]*(\d+\.\d+%|\d+%)',
        r'res[:\s]*(\d+\.\d+%|\d+%)',
        r'(\d+\.\d+%)\s*resolution'
    ]
    
    for pattern in resolution_patterns:
        match = re.search(pattern, str(specifications), re.IGNORECASE)
        if match:
            return match.group(1)
    
    return '0.01%'

def extract_scale(specifications):
    """Extract scale from specifications"""
    if pd.isna(specifications):
        return 'Load/Displacement'
    
    if 'tension' in str(specifications).lower():
        return 'Force/Extension'
    elif 'compression' in str(specifications).lower():
        return 'Force/Compression'
    else:
        return 'Load/Displacement'

def determine_power_requirements(product_type):
    """Determine power requirements based on product type"""
    if pd.isna(product_type):
        return '220V AC'
    
    type_str = str(product_type).lower()
    
    if 'servo' in type_str:
        return '220V AC, 3-phase'
    elif 'computerised' in type_str or 'computerized' in type_str:
        return '220V AC'
    elif 'digital' in type_str:
        return '220V AC'
    else:
        return '220V AC'

def determine_display_type(product_type):
    """Determine display type based on product type"""
    if pd.isna(product_type):
        return 'Digital'
    
    type_str = str(product_type).lower()
    
    if 'analogue' in type_str:
        return 'Analog'
    elif 'computerised' in type_str or 'computerized' in type_str:
        return 'Touch Screen'
    elif 'digital' in type_str:
        return 'Digital'
    elif 'servo' in type_str:
        return 'Computer Screen'
    else:
        return 'Digital'

def determine_control_type(product_type):
    """Determine control type based on product type"""
    if pd.isna(product_type):
        return 'Manual'
    
    type_str = str(product_type).lower()
    
    if 'servo' in type_str:
        return 'Closed-loop Servo'
    elif 'computerised' in type_str or 'computerized' in type_str:
        return 'Computerised'
    elif 'analogue' in type_str:
        return 'Manual'
    elif 'digital' in type_str:
        return 'Digital'
    else:
        return 'Manual'

def main():
    """Main function"""
    input_file = "../fine_group_catalog.csv.csv"
    output_file = "data/fine_group_products.csv"
    
    if not Path(input_file).exists():
        print(f"Input file not found: {input_file}")
        return
    
    # Create output directory if it doesn't exist
    Path(output_file).parent.mkdir(exist_ok=True)
    
    convert_fine_group_catalog(input_file, output_file)
    
    print(f"\nConversion complete! Your Fine Group catalog is now ready for the backend.")
    print(f"To use this data:")
    print(f"1. Replace the current products.csv with the new data")
    print(f"2. Restart the backend server")
    print(f"3. The AI will now use your actual product catalog!")

if __name__ == "__main__":
    main()
