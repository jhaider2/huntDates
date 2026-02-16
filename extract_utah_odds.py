#!/usr/bin/env python3
"""
Extract Utah draw odds from PDF and convert to JSON for database import.
Focuses on Elk and Deer data.

Requirements:
pip install tabula-py pandas requests
"""

import tabula
import pandas as pd
import json
import requests
from pathlib import Path

# Download the PDF
PDF_URL = "https://wildlife.utah.gov/pdf/bg/2025/25_bg-odds.pdf"
PDF_PATH = "25_bg-odds.pdf"

def download_pdf():
    """Download the PDF if not already present"""
    if not Path(PDF_PATH).exists():
        print(f"Downloading PDF from {PDF_URL}...")
        response = requests.get(PDF_URL)
        with open(PDF_PATH, 'wb') as f:
            f.write(response.content)
        print("Download complete!")
    else:
        print("PDF already exists")

def extract_tables_from_pdf():
    """Extract all tables from the PDF"""
    print("Extracting tables from PDF (this may take a while for 600+ pages)...")

    # Extract all tables from all pages
    # lattice=True works better for PDFs with clear table borders
    tables = tabula.read_pdf(
        PDF_PATH,
        pages='all',
        multiple_tables=True,
        lattice=True,
        pandas_options={'header': None}  # We'll identify headers manually
    )

    print(f"Extracted {len(tables)} tables")
    return tables

def parse_table_for_species(table, current_species=None):
    """
    Parse a single table and extract relevant data.
    Returns list of dicts with structured data.
    """
    results = []

    # Try to identify species and unit from the table
    # This is PDF-specific logic that may need adjustment

    for idx, row in table.iterrows():
        try:
            # Skip header rows and empty rows
            if pd.isna(row).all():
                continue

            # Look for species indicators (ELK, DEER, etc.)
            row_str = ' '.join([str(x) for x in row if pd.notna(x)])

            if 'ELK' in row_str.upper():
                current_species = 'Elk'
            elif 'DEER' in row_str.upper():
                current_species = 'Deer'

            # Try to parse data rows
            # Typical format: [Bonus Points] [Total Applicants] ... [Total Permits] ... [Success Ratio]
            # This will need to be adjusted based on actual PDF structure

            if current_species and len(row) >= 4:
                # Attempt to extract numeric data
                row_data = [x for x in row if pd.notna(x)]

                # Basic validation that this looks like a data row
                if len(row_data) >= 3 and str(row_data[0]).isdigit():
                    results.append({
                        'species': current_species,
                        'raw_data': row_data,
                        'table_index': idx
                    })
        except Exception as e:
            print(f"Error parsing row {idx}: {e}")
            continue

    return results, current_species

def process_all_tables(tables):
    """Process all extracted tables and structure the data"""
    all_data = []
    current_species = None

    for i, table in enumerate(tables):
        print(f"Processing table {i+1}/{len(tables)}...")
        parsed_data, current_species = parse_table_for_species(table, current_species)
        all_data.extend(parsed_data)

    return all_data

def main():
    # Download PDF
    download_pdf()

    # Extract tables
    tables = extract_tables_from_pdf()

    # Save first few tables for manual inspection
    print("\nSaving sample tables for inspection...")
    for i in range(min(5, len(tables))):
        print(f"\n=== Table {i+1} ===")
        print(tables[i].head(20))
        tables[i].to_csv(f"sample_table_{i+1}.csv", index=False)

    print(f"\nSaved first 5 tables as CSV files for inspection")
    print("Please review the CSV files to understand the data structure")
    print("Then we can refine the parsing logic")

    # Uncomment after reviewing structure:
    # all_data = process_all_tables(tables)
    # with open('utah_odds_data.json', 'w') as f:
    #     json.dump(all_data, f, indent=2)
    # print(f"\nExtracted {len(all_data)} data rows")

if __name__ == "__main__":
    main()
