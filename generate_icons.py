from PIL import Image, ImageDraw, ImageFont
import os

# Couleurs du projet
GUINEA_RED = (184, 32, 46)
GUINEA_YELLOW = (232, 197, 71)
GUINEA_GREEN = (45, 134, 89)

def create_icon(size, filename):
    # Créer une image avec gradient
    img = Image.new('RGB', (size, size), GUINEA_RED)
    draw = ImageDraw.Draw(img)
    
    # Ajouter un cercle central
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill=GUINEA_YELLOW)
    
    # Ajouter du texte "PIJ"
    try:
        font_size = size // 4
        font = ImageFont.load_default()
        text = "PIJ"
        
        # Calculer la position du texte pour le centrer
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2
        
        draw.text((x, y), text, fill=GUINEA_GREEN, font=font)
    except:
        pass  # Si problème avec la police, ignorer le texte
    
    img.save(f"public/icons/{filename}")
    print(f"Créé: {filename}")

# Créer toutes les tailles d'icônes
sizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512]

for size in sizes:
    if size == 180:
        create_icon(size, f"apple-icon-{size}x{size}.png")
    else:
        create_icon(size, f"icon-{size}x{size}.png")

print("Toutes les icônes ont été créées!")
