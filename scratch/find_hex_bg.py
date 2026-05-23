import re

css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Occurrences of light background colors/gradients:")
for idx, line in enumerate(lines):
    if "background" in line or "background-color" in line:
        # Check if it contains light hexes or white
        if any(color in line.lower() for color in ["#ffffff", "f5f1eb", "var(--white)", "linear-gradient"]):
            # Exclude lines that are obviously dark or variables
            if not any(dark in line.lower() for dark in ["1a1a1a", "2d2d2d", "var(--primary-color)"]):
                print(f"Line {idx+1}: {line.strip()}")
