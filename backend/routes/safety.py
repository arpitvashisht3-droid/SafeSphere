import json
import os
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Safety Tips"])

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "safety_tips.json")


class SafetyTip(BaseModel):
    title: str
    description: str
    category: str


class SafetyTipsListResponse(BaseModel):
    tips: List[SafetyTip]


def load_safety_tips() -> list:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


@router.get("/safety-tips", response_model=SafetyTipsListResponse)
def get_safety_tips():
    tips_data = load_safety_tips()
    return SafetyTipsListResponse(tips=tips_data)
