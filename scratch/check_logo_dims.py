import struct

def get_image_info(filepath):
    """Finds dimensions of a jpeg image using standard library"""
    with open(filepath, 'rb') as f:
        # Check JPEG signature
        if f.read(2) != b'\xff\xd8':
            print("Not a JPEG file")
            return None
        
        while True:
            marker, length = struct.unpack(">2sH", f.read(4))
            if marker[0] != 0xff:
                print("Invalid marker")
                return None
            if marker == b'\xff\xc0' or marker == b'\xff\xc2': # SOF0 or SOF2
                # Read details
                data = f.read(length - 2)
                precision, height, width = struct.unpack(">BHH", data[0:5])
                return width, height
            else:
                f.seek(length - 2, 1)

logo_path = r"c:\Users\DELL\OneDrive\Desktop\Interior\assets\logo\LOGO.jpeg"
dims = get_image_info(logo_path)
if dims:
    w, h = dims
    print(f"Dimensions: {w}x{h}, Aspect Ratio: {w/h:.2f}")
else:
    print("Could not read JPEG dimensions.")
