import json
import os

transcript_path = r"C:\Users\DELL\.gemini\antigravity\brain\a8d32d4b-de29-40cf-af0a-7342311abfb2\.system_generated\logs\transcript.jsonl"

def check_history():
    if not os.path.exists(transcript_path):
        print(f"Transcript does not exist at {transcript_path}!")
        return

    print("Reading transcript...")
    count = 0
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            try:
                data = json.loads(line)
                count += 1
                
                # Let's inspect the keys
                # print(data.keys())
                step_idx = data.get('step_index', idx)
                source = data.get('source', '')
                type_val = data.get('type', '')
                
                tool_calls = data.get('tool_calls', [])
                if not tool_calls:
                    # check nested tool_calls in other formats
                    pass
                
                for tc in tool_calls:
                    name = tc.get('name', '')
                    args = tc.get('arguments', {})
                    if not args:
                        args = tc.get('args', {})
                    target_file = args.get('TargetFile') or args.get('AbsolutePath') or args.get('Target')
                    print(f"Step {step_idx} ({source}): Call {name} on {target_file}")
            except Exception as e:
                print(f"Error on line {idx}: {e}")
                
    print(f"Total lines parsed: {count}")

if __name__ == "__main__":
    check_history()
