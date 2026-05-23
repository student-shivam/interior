import re

css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "nav-logo" in line or "logo-img" in line or "navbar" in line:
        # print line and 5 lines before and after
        start = max(0, i - 3)
        end = min(len(lines), i + 7)
        print(f"--- Line {i+1} ---")
        for idx in range(start, end):
            print(f"{idx+1}: {lines[idx]}", end="")
