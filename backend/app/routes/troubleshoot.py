from fastapi import APIRouter, HTTPException

from app.models.schemas import TroubleshootRequest, TroubleshootResponse
from app.services.ai_service import get_ai_guidance
from app.services.kb_service import search_knowledge_base

router = APIRouter()


@router.post("/", response_model=TroubleshootResponse)
async def troubleshoot(request: TroubleshootRequest):
    """Receive a problem description and return AI-guided troubleshooting steps."""
    kb_result = search_knowledge_base(request.problem)

    if kb_result:
        return TroubleshootResponse(
            problem=request.problem,
            steps=kb_result["steps"],
            source="knowledge_base",
        )

    ai_result = await get_ai_guidance(request.problem)
    if not ai_result:
        raise HTTPException(status_code=503, detail="AI service unavailable")

    return TroubleshootResponse(
        problem=request.problem,
        steps=ai_result,
        source="ai",
    )
