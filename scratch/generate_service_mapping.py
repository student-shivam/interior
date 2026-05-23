import os
import json

base_dir = r"c:\Users\DELL\OneDrive\Desktop\Interior"
services_dir = os.path.join(base_dir, "assets", "services")

# Folder mappings: we map folder name to the service ID
folder_to_id = {
    "New folderPVC Panel & PVC Ceiling": "pvc-panel",
    "WPC Panel": "wpc-panel",
    "UV Marble Sheets": "uv-marble",
    "3D Panels": "3d-panels",
    "Wallpaper & Customized Wallpaper": "wallpaper",
    "Wooden Flooring": "wooden-flooring",
    "PVC Flooring": "pvc-flooring",
    "Artificial Garden & Grass Design": "artificial-grass",
    "Wall Molding with Wallpaper": "wall-molding",
    "Mosaic Glass Work": "mosaic-glass",
    "Sofit Panel": "sofit-panel",
    "Window Curtains": "window-curtains"
}

mapping = {}

for folder_name, service_id in folder_to_id.items():
    folder_path = os.path.join(services_dir, folder_name)
    if os.path.isdir(folder_path):
        files = sorted(os.listdir(folder_path))
        # Filter for image files
        images = [f"assets/services/{folder_name}/{f}" for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        mapping[service_id] = images
    else:
        print(f"Warning: {folder_path} is not a directory")

print(json.dumps(mapping, indent=2))

# Let's save this mapping to a js file as well for reference
with open(os.path.join(base_dir, "js", "services-data.js"), "w", encoding="utf-8") as f:
    f.write("// Auto-generated service images mapping\n")
    f.write("const SERVICE_IMAGES = ")
    f.write(json.dumps(mapping, indent=2))
    f.write(";\n")
