from pydantic import BaseModel
from typing import List


class TroubleshootRequest(BaseModel):
    problem: str


class TroubleshootResponse(BaseModel):
    problem: str
    steps: List[str]
    source: str  # "knowledge_base" or "ai"
