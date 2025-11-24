#!/bin/bash

# Quick script to create placeholder icons for Date Detective addon

echo "Creating placeholder icons..."

cd "$(dirname "$0")/icons"

# Try to create icons using Python with PIL (common on macOS)
python3 - << 'EOF'
try:
    from PIL import Image, ImageDraw, ImageFont
    
    # Create 48x48 icon
    img48 = Image.new('RGBA', (48, 48), (102, 126, 234, 255))
    draw48 = ImageDraw.Draw(img48)
    draw48.ellipse([4, 4, 44, 44], fill=(118, 75, 162, 255))
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 28)
    except:
        font = ImageFont.load_default()
    draw48.text((24, 24), "📅", font=font, anchor="mm", fill=(255, 255, 255, 255))
    img48.save('icon-48.png')
    
    # Create 96x96 icon
    img96 = Image.new('RGBA', (96, 96), (102, 126, 234, 255))
    draw96 = ImageDraw.Draw(img96)
    draw96.ellipse([8, 8, 88, 88], fill=(118, 75, 162, 255))
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 56)
    except:
        font = ImageFont.load_default()
    draw96.text((48, 48), "📅", font=font, anchor="mm", fill=(255, 255, 255, 255))
    img96.save('icon-96.png')
    
    print("✓ Icons created successfully using PIL")
    exit(0)
except ImportError:
    exit(1)
except Exception as e:
    print(f"Error: {e}")
    exit(1)
EOF

if [ $? -eq 0 ]; then
    echo "Icons created successfully!"
    exit 0
fi

# Fallback: Create simple colored squares
echo "PIL not available, creating simple placeholder icons..."

# Try with sips (macOS)
if command -v sips &> /dev/null; then
    # Create a simple gradient or solid color image
    python3 - << 'EOF'
from PIL import Image, ImageDraw

# Simple fallback icons
img48 = Image.new('RGBA', (48, 48), (102, 126, 234, 255))
draw = ImageDraw.Draw(img48)
draw.rectangle([8, 8, 40, 40], fill=(255, 255, 255, 255))
draw.rectangle([12, 12, 36, 36], fill=(102, 126, 234, 255))
img48.save('icon-48.png')

img96 = Image.new('RGBA', (96, 96), (102, 126, 234, 255))
draw = ImageDraw.Draw(img96)
draw.rectangle([16, 16, 80, 80], fill=(255, 255, 255, 255))
draw.rectangle([24, 24, 72, 72], fill=(102, 126, 234, 255))
img96.save('icon-96.png')

print("✓ Simple placeholder icons created")
EOF
else
    echo "❌ Could not create icons automatically."
    echo "Please create icon-48.png and icon-96.png manually in the icons/ folder"
    echo "You can use any image editor or find calendar icons online"
fi

echo ""
echo "Note: For best results, replace these placeholders with proper calendar/date icons"
