import json
import os

transcript_path = r"C:\Users\DELL\.gemini\antigravity\brain\a8d32d4b-de29-40cf-af0a-7342311abfb2\.system_generated\logs\transcript.jsonl"

def search():
    if not os.path.exists(transcript_path):
        print("No transcript")
        return
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            try:
                data = json.loads(line)
                content = data.get('content', '')
                if "Krishna Interior" in content:
                    print(f"Line {idx}: length {len(content)}, keys: {list(data.keys())}")
                    # check if content has "<truncated"
                    if "<truncated" in content:
                        print("  Contains truncation notice")
                    else:
                        print("  NO truncation notice!")
                        print(content[:200])
            except Exception as e:
                pass

if __name__ == "__main__":
    search()
