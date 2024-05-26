import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_code_diff():
    # Fetch the diff of the code changes (this is a simplified example)
    with open("diff.txt", "r") as file:
        code_diff = file.read()
    return code_diff

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
