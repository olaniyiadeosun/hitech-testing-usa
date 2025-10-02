#!/usr/bin/env python3
"""
Excel to CSV converter for Hitech Testing USA product data
This script converts Excel files to CSV format for the backend
"""

import pandas as pd
import os
import sys
from pathlib import Path

def convert_excel_to_csv(excel_file_path, output_csv_path=None):
    """
    Convert Excel file to CSV format
    
    Args:
        excel_file_path: Path to the Excel file
        output_csv_path: Path for the output CSV file (optional)
    """
    try:
        # Read Excel file
        print(f"Reading Excel file: {excel_file_path}")
        
        # Try to read with header=None first to see raw data
        df_raw = pd.read_excel(excel_file_path, header=None)
        print(f"Found {len(df_raw)} rows and {len(df_raw.columns)} columns")
        
        # Look for actual data (non-null rows)
        df_clean = df_raw.dropna(how='all')  # Remove completely empty rows
        
        print(f"\nAfter removing empty rows: {len(df_clean)} rows")
        print(f"\nFirst 5 rows of data:")
        for i in range(min(5, len(df_clean))):
            row_data = df_clean.iloc[i].dropna().tolist()
            if row_data:  # Only show rows with actual data
                print(f"Row {i+1}: {row_data}")
        
        # Try to find the header row
        header_row = None
        for i in range(min(10, len(df_clean))):
            row_data = df_clean.iloc[i].dropna().tolist()
            # Look for row that might be headers (contains text, not just numbers)
            if row_data and any(isinstance(x, str) and len(str(x)) > 3 for x in row_data):
                header_row = i
                break
        
        if header_row is not None:
            print(f"\nFound potential header row at index {header_row}")
            df = pd.read_excel(excel_file_path, header=header_row)
            print(f"Using row {header_row} as header")
            print(f"Columns: {list(df.columns)}")
        else:
            print(f"\nNo clear header found, using default column names")
            df = df_clean
        
        # Generate output path if not provided
        if output_csv_path is None:
            excel_path = Path(excel_file_path)
            output_csv_path = excel_path.parent / f"{excel_path.stem}.csv"
        
        # Save as CSV
        df.to_csv(output_csv_path, index=False)
        print(f"\nSuccessfully converted to CSV: {output_csv_path}")
        
        # Suggest mapping for our product format
        print(f"\nTo integrate with Hitech Testing USA backend:")
        print(f"   Map your Excel columns to these required fields:")
        print(f"   - id: Unique product identifier")
        print(f"   - title: Product name")
        print(f"   - category: Product category (e.g., 'Hardness Testing', 'UTM')")
        print(f"   - subcategory: Product subcategory")
        print(f"   - description: Product description")
        print(f"   - capacity: Capacity/range specifications")
        print(f"   - accuracy: Accuracy specifications")
        print(f"   - standards: Compliance standards (separate with |)")
        print(f"   - power: Power requirements")
        print(f"   - warranty: Warranty information")
        print(f"   - display: Display type")
        print(f"   - control: Control type")
        print(f"   - resolution: Resolution specifications")
        print(f"   - scale: Scale/measurement type")
        print(f"   - price_hint: Price hint text")
        print(f"   - image: Image path")
        
        return output_csv_path
        
    except Exception as e:
        print(f"Error converting Excel file: {e}")
        return None

def main():
    """Main function"""
    if len(sys.argv) < 2:
        print("Usage: python excel_to_csv.py <excel_file_path> [output_csv_path]")
        print("Example: python excel_to_csv.py ../M\ S\ GALAGALI\ TECHNICAL\ SUMMARY.xlsx")
        return
    
    excel_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    if not os.path.exists(excel_file):
        print(f"Excel file not found: {excel_file}")
        return
    
    convert_excel_to_csv(excel_file, output_file)

if __name__ == "__main__":
    main()
