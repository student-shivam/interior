import re

css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

in_hero_rules = False
for idx, line in enumerate(lines):
    if line.strip().startswith(".hero") or line.strip().startswith(".slide") or line.strip().startswith(".hero-slide"):
        # print 15 lines of context
        start = idx
        end = min(len(lines), idx + 20)
        print(f"--- Line {idx+1} ---")
        for i in range(start, end):
            print(f"{i+1}: {lines[i]}", end="")
