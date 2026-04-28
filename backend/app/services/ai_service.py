import os
from typing import List, Optional

from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = (
    "You are PC-Docter-AI, a friendly and patient PC troubleshooting assistant. "
    "A user has described a computer problem. Respond with a numbered list of clear, "
    "step-by-step instructions to diagnose and fix the issue. "
    "Keep each step simple enough for a non-technical user to follow."
)


async def get_ai_guidance(problem: str) -> Optional[List[str]]:
    """Call the OpenAI API and return a list of troubleshooting steps."""
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": problem},
            ],
            temperature=0.4,
            max_tokens=512,
        )
        text = response.choices[0].message.content or ""
        steps = [line.strip() for line in text.splitlines() if line.strip()]
        return steps
    except Exception:
        return None
