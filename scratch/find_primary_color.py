css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Occurrences of var(--primary-color):")
for idx, line in enumerate(lines):
    if "var(--primary-color)" in line:
        print(f"Line {idx+1}: {line.strip()}")
