import json
import os
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Resources"])

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "resources.json")


class Resource(BaseModel):
    name: str
    type: str
    description: str
    contact: str
    availability: str


class ResourceListResponse(BaseModel):
    resources: List[Resource]


def load_resources() -> list:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


@router.get("/resources", response_model=ResourceListResponse)
def get_resources():
    resources_data = load_resources()
    return ResourceListResponse(resources=resources_data)
