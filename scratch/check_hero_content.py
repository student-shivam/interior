css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if ".hero-content" in line:
        print(f"--- Match at line {idx+1} ---")
        for i in range(max(0, idx - 2), min(len(lines), idx + 18)):
            print(f"{i+1}: {lines[i]}", end="")
