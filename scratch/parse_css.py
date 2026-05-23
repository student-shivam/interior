import re

css_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\css\style.css"

with open(css_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("CSS Line Count:", len(lines))

# Find lines containing comments like /* ==================== ... ==================== */
# or classes like .service-card, .why-choose-us, .testimonials, .footer
keywords = [
    r"/\* =+.*=+ \*/",
    r"\.services-preview",
    r"\.service-card",
    r"\.why-choose-us",
    r"\.about-section",
    r"\.testimonials",
    r"\.testimonial-card",
    r"\.faq-section",
    r"\.faq-item",
    r"\.stats-section",
    r"\.team-section",
    r"\.blog-section",
    r"\.contact-section",
    r"\.footer",
    r"\.btn-primary",
    r"\.btn-secondary",
    r"\.btn-outline",
    r"\.cta-btn",
    r"@keyframes",
    r"\.scroll-to-top"
]

results = []
for idx, line in enumerate(lines):
    line_num = idx + 1
    for kw in keywords:
        if re.search(kw, line):
            results.append((line_num, line.strip()))
            break

for line_num, text in results:
    print(f"Line {line_num}: {text}")
