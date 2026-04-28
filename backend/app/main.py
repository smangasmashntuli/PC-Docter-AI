from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.troubleshoot import router as troubleshoot_router

app = FastAPI(
    title="PC-Docter-AI",
    description="AI-powered PC troubleshooting assistant",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(troubleshoot_router, prefix="/api/v1/troubleshoot", tags=["Troubleshoot"])


@app.get("/")
def health_check():
    return {"status": "ok", "message": "PC-Docter-AI is running"}
