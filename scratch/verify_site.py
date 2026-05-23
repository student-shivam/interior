import os
import re
from html.parser import HTMLParser

workspace_dir = r"c:\Users\DELL\OneDrive\Desktop\Interior"
html_files = ["index.html", "about.html", "services.html", "gallery.html", "blog.html", "contact.html"]

class SiteChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.meta_desc = None
        self.h1s = []
        self.in_title = False
        self.links = []
        self.imgs = []
        self.text_content = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            if attrs_dict.get("name") == "description":
                self.meta_desc = attrs_dict.get("content")
        elif tag == "h1":
            self.current_h1 = ""
            self.h1s.append("")
        elif tag == "a":
            href = attrs_dict.get("href")
            if href:
                self.links.append((href, attrs_dict.get("title", "")))
        elif tag == "img":
            src = attrs_dict.get("src")
            if src:
                self.imgs.append(src)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title = data
        elif self.h1s and data.strip():
            # append to the last H1 if we are inside H1 (simplistic)
            pass
        self.text_content.append(data)

def verify_files():
    print("--- STARTING STANDARD LIBRARY SITE VERIFICATION ---")
    
    for filename in html_files:
        filepath = os.path.join(workspace_dir, filename)
        if not os.path.exists(filepath):
            print(f"ERROR: {filename} does not exist!")
            continue
            
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        parser = SiteChecker()
        # Custom tracking for H1 texts since standard parser handles data separately
        # We'll extract H1s using regex which is very reliable for standard H1 tags
        h1_matches = re.findall(r"<h1[^>]*>(.*?)</h1>", content, re.DOTALL | re.IGNORECASE)
        parser.feed(content)
        
        print(f"\nVerifying: {filename}")
        
        # 1. Page Title & Meta Description
        title = parser.title.strip() if parser.title else None
        meta_desc_content = parser.meta_desc.strip() if parser.meta_desc else None
        
        print(f"  Title: {title}")
        print(f"  Meta Description: {meta_desc_content}")
        
        if not title:
            print("  [FAIL] Title is missing!")
        elif len(title) > 70:
            print(f"  [WARN] Title is long ({len(title)} chars)")
            
        if not meta_desc_content:
            print("  [FAIL] Meta description is missing!")
        elif len(meta_desc_content) > 165:
            print(f"  [WARN] Meta description is long ({len(meta_desc_content)} chars)")
        elif len(meta_desc_content) < 120:
            print(f"  [WARN] Meta description is short ({len(meta_desc_content)} chars)")
            
        # 2. Heading Hierarchy (Single H1)
        print(f"  H1 count: {len(h1_matches)}")
        for i, h1 in enumerate(h1_matches):
            # Strip tags inside H1 if any
            h1_clean = re.sub(r"<[^>]+>", "", h1).strip()
            print(f"    H1 #{i+1}: {h1_clean}")
        if len(h1_matches) != 1:
            print(f"  [FAIL] Page has {len(h1_matches)} H1 tags! Should have exactly 1.")
            
        # 3. NAP Checks
        full_text = " ".join(parser.text_content)
        
        # Check Proprietor Name
        proprietor_matches = re.findall(r"Vijay\s+Kumar\s+Yadav", full_text, re.IGNORECASE)
        print(f"  Proprietor name occurrences: {len(proprietor_matches)}")
        if len(proprietor_matches) == 0 and filename not in ["blog.html", "gallery.html"]:
            print("  [WARN] Proprietor name 'Vijay Kumar Yadav' not found in text.")
            
        # Check Phone
        phone_matches = re.findall(r"73550\s*04340", full_text)
        print(f"  Phone number occurrences: {len(phone_matches)}")
        if len(phone_matches) == 0:
            print("  [FAIL] Target phone number '73550 04340' not found in text.")
            
        # Check Address
        jehta_matches = re.findall(r"Jehta", full_text, re.IGNORECASE)
        print(f"  Address ('Jehta') occurrences: {len(jehta_matches)}")
        if len(jehta_matches) == 0 and filename not in ["blog.html", "gallery.html"]:
            print("  [WARN] Address keyword 'Jehta' not found in text.")
            
        # 4. Link Checks
        broken_links = []
        for href, title_attr in parser.links:
            if not href:
                continue
            # Check internal relative links
            if href.endswith(".html") or ".html#" in href or href.startswith("index.html#") or href.startswith("#"):
                base_href = href.split("#")[0]
                if base_href and base_href not in html_files:
                    broken_links.append(href)
            # Check whatsapp link formatting
            if "wa.me" in href and "917355004340" not in href:
                print(f"  [WARN] WhatsApp link may have wrong phone: {href}")
            # Check phone link formatting
            if href.startswith("tel:") and "7355004340" not in href.replace(" ", "").replace("-", ""):
                print(f"  [WARN] Tel link may have wrong phone: {href}")
                
        if broken_links:
            print(f"  [FAIL] Broken or suspicious internal links found: {broken_links}")
        else:
            print("  [PASS] All relative internal links verified.")
            
        # 5. Image Source Checks
        missing_imgs = []
        for src in parser.imgs:
            if not src:
                continue
            if src.startswith("http"):
                continue  # Skip remote images
            # Check local file existence
            local_img_path = os.path.join(workspace_dir, src)
            if not os.path.exists(local_img_path):
                missing_imgs.append(src)
        if missing_imgs:
            print(f"  [FAIL] Missing local images: {missing_imgs}")
        else:
            print("  [PASS] All local images verified to exist.")

if __name__ == "__main__":
    verify_files()
