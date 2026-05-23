import os

services_dir = r"c:\Users\DELL\OneDrive\Desktop\Interior\assets\services"
for root, dirs, files in os.walk(services_dir):
    if files:
        rel_path = os.path.relpath(root, services_dir)
        print(f"Folder: {rel_path}")
        for f in files[:5]: # print first 5 files
            print(f"  - {f}")
        if len(files) > 5:
            print(f"  ... and {len(files) - 5} more")
