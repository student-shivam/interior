import re

css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find all media query blocks
media_queries = re.findall(r"@media[^{]+\{(?:[^{}]+|\{[^{}]*\})*\}", content)
for mq in media_queries:
    if ".hero" in mq or "height" in mq:
        print("--- MATCHING MEDIA BLOCK ---")
        print(mq[:400])
        print("...")
        print(mq[-400:])
