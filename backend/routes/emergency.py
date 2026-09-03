import json
import os
from typing import List
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Emergency Contacts"])

DATA_FILE = os.path.join(
    os.path.dirname(__file__), "..", "data", "emergency_contacts.json"
)


class EmergencyContact(BaseModel):
    name: str
    number: str
    description: str


class EmergencyContactsListResponse(BaseModel):
    contacts: List[EmergencyContact]


def load_emergency_contacts() -> list:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


@router.get("/emergency-contacts", response_model=EmergencyContactsListResponse)
def get_emergency_contacts():
    contacts_data = load_emergency_contacts()
    return EmergencyContactsListResponse(contacts=contacts_data)
