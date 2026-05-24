import os

root = os.path.abspath(os.getcwd())
old = 'href="https://wa.me/917355004340"'
new = 'href="https://wa.me/917355004340?text=Hi%2C%20I%20am%20interested%20in%20your%20interior%20services"'
updated = 0
for dirpath, dirnames, filenames in os.walk(root):
    for name in filenames:
        if name.endswith('.html'):
            path = os.path.join(dirpath, name)
            with open(path, 'r', encoding='utf-8') as f:
                text = f.read()
            if old in text:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(text.replace(old, new))
                updated += 1
print(f'Updated {updated} files')
