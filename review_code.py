import openai
import os
import requests

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_code_diff():
    # Get GitHub event data
    event_path = os.getenv("GITHUB_EVENT_PATH")
    with open(event_path) as f:
        event = json.load(f)
    
    # Extract pull request data
    pull_request_url = event["pull_request"]["url"]
    
    # Get the diff of the pull request
    headers = {
        "Accept": "application/vnd.github.v3.diff",
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}"
    }
    response = requests.get(pull_request_url, headers=headers)
    return response.text

def review_code(code_diff):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Review the following code diff and provide feedback:\n\n{code_diff}",
        max_tokens=500
    )
    return response.choices[0].text.strip()

def main():
    code_diff = get_code_diff()
    feedback = review_code(code_diff)
    print("Code Review Feedback:\n", feedback)

if __name__ == "__main__":
    main()
