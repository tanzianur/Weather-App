import sys
import anthropic


def generate_response(key, prompt):
    c = anthropic.Client(key)
    resp = c.completion(
        prompt=f"{anthropic.HUMAN_PROMPT} {prompt}{anthropic.AI_PROMPT}",
        model="claude-1",
        max_tokens_to_sample=100,
    )
    return resp["completion"]


arg1 = sys.argv[1]

print(
    generate_response(
        "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",
        arg1,
    ),
)
