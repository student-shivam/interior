from html.parser import HTMLParser

class ServiceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_card = False
        self.current_title = ""
        self.current_id = ""
        self.current_img = ""
        self.cards = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "div" and "service-card-full" in attrs_dict.get("class", ""):
            self.in_card = True
            self.current_id = attrs_dict.get("id", "No ID")
            self.current_title = ""
            self.current_img = ""
        elif self.in_card:
            if tag in ["h2", "h3"] and not self.current_title:
                # We will capture data next
                pass
            elif tag == "img":
                self.current_img = attrs_dict.get("src", "")

    def handle_data(self, data):
        if self.in_card and not self.current_title:
            # Check if we are inside a title tag by looking at parent/state, or just grab the first non-empty text
            txt = data.strip()
            if txt and len(txt) > 3:
                self.current_title = txt

    def handle_endtag(self, tag):
        if tag == "div" and self.in_card:
            # We assume div closes the card, let's keep it simple
            # We'll just finalize it if we have both title and image
            pass

    def feed(self, data):
        # We can also do a simple regex since HTML is well-structured
        super().feed(data)

# Let's use regex instead as it is extremely robust for this specific format
import re
with open(r"c:\Users\DELL\OneDrive\Desktop\Interior\services.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find all blocks of service-card-full
blocks = re.findall(r'<div class="service-card-full"[^>]*>([\s\S]*?)</div>\s*</div>', html)
# Actually, let's just find the section or the card containers using a simple split
cards = html.split('class="service-card-full"')
for idx, card in enumerate(cards[1:]):
    # Find ID
    id_match = re.search(r'id="([^"]+)"', card)
    card_id = id_match.group(1) if id_match else "No ID"
    
    # Find heading (h2 or h3)
    heading_match = re.search(r'<h[23][^>]*>([^<]+)</h[23]>', card)
    title = heading_match.group(1).strip() if heading_match else "No Title"
    
    # Find img src
    img_match = re.search(r'<img[^>]+src="([^"]+)"', card)
    img_src = img_match.group(1) if img_match else "No Image"
    
    print(f"Card {idx+1}: {title} (ID: {card_id}) -> Image: {img_src}")
