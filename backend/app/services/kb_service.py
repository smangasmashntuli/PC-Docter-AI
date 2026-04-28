import json
import os
from typing import Optional

_KB_PATH = os.path.join(os.path.dirname(__file__), "../data/issues.json")
_knowledge_base: list = []


def _load_kb() -> list:
    global _knowledge_base
    if not _knowledge_base:
        with open(_KB_PATH, "r") as f:
            _knowledge_base = json.load(f)
    return _knowledge_base


def search_knowledge_base(problem: str) -> Optional[dict]:
    """Return the best matching KB entry for the given problem description, or None."""
    kb = _load_kb()
    problem_lower = problem.lower()
    for entry in kb:
        if any(keyword in problem_lower for keyword in entry.get("keywords", [])):
            return entry
    return None
