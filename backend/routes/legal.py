import json
import os
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Legal Rights"])

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "legal_rights.json")


class LegalRight(BaseModel):
    title: str
    category: str
    description: str


class LegalRightsListResponse(BaseModel):
    rights: List[LegalRight]


def load_legal_rights() -> list:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


@router.get("/legal-rights", response_model=LegalRightsListResponse)
def get_legal_rights():
    rights_data = load_legal_rights()
    return LegalRightsListResponse(rights=rights_data)
