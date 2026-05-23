import os
import re

html_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\services.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Match img tags and print src
img_tags = re.findall(r'<div class="service-image">\s*<img\s+src="([^"]+)"\s+alt="([^"]+)"', html)
print(f"Found {len(img_tags)} service images:")
for src, alt in img_tags:
    exists = os.path.exists(os.path.join(r"c:\Users\DELL\OneDrive\Desktop\Interior", src.replace("/", "\\")))
    print(f"  - Src: {src} (Exists: {exists}) | Alt: {alt}")
