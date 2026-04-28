# PC-Docter-AI – System Design

## Overview

PC-Docter-AI is a three-tier application: a Python/FastAPI backend with an OpenAI-powered troubleshooting engine, a React web frontend, and a React Native (Expo) mobile app. Both clients call the same REST API.

---

## Architecture Diagram

```
┌─────────────────────┐        ┌─────────────────────┐
│   Web (React/Vite)  │        │  Mobile (React Native│
│   frontend/         │        │  + Expo)  mobile/    │
└────────┬────────────┘        └──────────┬───────────┘
         │  HTTP (JSON)                   │  HTTP (JSON)
         └──────────────┬─────────────────┘
                        │
              ┌─────────▼──────────┐
              │  FastAPI Backend   │
              │  backend/          │
              │                    │
              │  ┌──────────────┐  │
              │  │  /troubleshoot│  │
              │  └──────┬───────┘  │
              │         │          │
              │  ┌──────▼───────┐  │
              │  │  KB Service  │──┼──► issues.json (local)
              │  └──────┬───────┘  │
              │         │ (fallback)│
              │  ┌──────▼───────┐  │
              │  │  AI Service  │──┼──► OpenAI API
              │  └──────────────┘  │
              └────────────────────┘
```

---

## Request Flow

1. User types a problem description in the web or mobile app.
2. Client sends `POST /api/v1/troubleshoot` with `{ "problem": "..." }`.
3. Backend first searches the **Knowledge Base** (`issues.json`) using keyword matching.
   - If a match is found → return pre-written steps immediately (fast, free).
4. If no KB match → call **OpenAI API** with a system prompt that instructs it to return numbered troubleshooting steps.
5. Response `{ problem, steps[], source }` is returned to the client and rendered as a step-by-step guide.

---

## File Structure

```
PC-Docter-AI/
├── backend/                     # Python / FastAPI
│   ├── app/
│   │   ├── main.py              # FastAPI app + CORS + router registration
│   │   ├── routes/
│   │   │   └── troubleshoot.py  # POST /api/v1/troubleshoot endpoint
│   │   ├── services/
│   │   │   ├── ai_service.py    # OpenAI API integration
│   │   │   └── kb_service.py    # Keyword-based knowledge base lookup
│   │   ├── models/
│   │   │   └── schemas.py       # Pydantic request/response schemas
│   │   └── data/
│   │       └── issues.json      # Seeded common PC issues + fix steps
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                    # React + Vite (web)
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx             # React entry point
│   │   ├── App.jsx              # Router setup
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   └── Troubleshoot.jsx # Main troubleshoot page
│   │   ├── components/
│   │   │   ├── IssueSelector.jsx # Text input form
│   │   │   └── StepGuide.jsx    # Ordered list of steps
│   │   └── services/
│   │       └── api.js           # Axios wrapper for backend calls
│   ├── package.json
│   └── .env.example
│
├── mobile/                      # React Native + Expo
│   ├── App.js                   # Navigation container + stack
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   └── TroubleshootScreen.js
│   │   ├── components/
│   │   │   └── ChatBubble.js    # Individual step card
│   │   └── services/
│   │       └── api.js           # Axios wrapper for backend calls
│   ├── package.json
│   └── .env.example
│
├── docs/
│   └── system-design.md         # This file
├── .gitignore
└── README.md
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| FastAPI (Python) | Async, fast, great OpenAI SDK support, easy Pydantic validation |
| Knowledge Base first | Reduces OpenAI API cost for the most common issues |
| OpenAI `gpt-4o-mini` | Cheap, fast, sufficient quality for simple troubleshooting |
| React + Vite | Lightweight web setup with fast HMR for development |
| React Native + Expo | Fastest path to iOS & Android from existing React knowledge |
| Shared API client pattern | Both web and mobile share the same `api.js` service module |

---

## Environment Variables

### Backend (`backend/.env.example`)
| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | OpenAI API authentication key |

### Frontend (`frontend/.env.example`)
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

### Mobile (`mobile/.env.example`)
| Variable | Purpose |
|---|---|
| `EXPO_PUBLIC_API_URL` | Base URL of the backend API |

---

## Running Locally

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your OPENAI_API_KEY
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Mobile
```bash
cd mobile
npm install
cp .env.example .env
npx expo start
```
