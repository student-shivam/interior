import glob
import re

for filepath in glob.glob("*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    # Find the nav-logo block
    match = re.search(r'<a href="index\.html" class="nav-logo">[\s\S]*?</a>', content)
    if match:
        print(f"--- {filepath} ---")
        print(match.group(0))
    else:
        print(f"--- {filepath} --- No match found")
