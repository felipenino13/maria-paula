from pathlib import Path
from PIL import Image, ImageOps
root = Path(__file__).resolve().parents[1]
for p in sorted((root / 'src').glob('*')):
    if p.suffix.lower() not in ('.jpg', '.jpeg'): continue
    number = 1 if 'AM-' in p.name else int(p.stem.rsplit('-', 1)[1])
    image = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
    image.thumbnail((1200, 1400))
    image.save(root / 'public' / 'photos' / f'recuerdo-{number}.webp', 'WEBP', quality=87)
    print(f'recuerdo-{number}.webp: {image.size}')
