import json
import os
import uuid
from typing import Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter(tags=["Complaints"])

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "complaints.json")


class ComplaintCreate(BaseModel):
    category: str
    description: str
    incident_date: Optional[str] = None
    organization: Optional[str] = None


class ComplaintResponse(BaseModel):
    success: bool
    complaint_id: str
    message: str


def load_complaints() -> list:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


def save_complaints(complaints: list) -> None:
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(complaints, f, indent=2, ensure_ascii=False)


@router.post(
    "/complaints",
    response_model=ComplaintResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_complaint(complaint: ComplaintCreate):
    if not complaint.category or not complaint.category.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category cannot be empty.",
        )
    if not complaint.description or not complaint.description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Description cannot be empty.",
        )

    complaint_id = f"SS-{uuid.uuid4().hex[:8].upper()}"

    new_complaint = {
        "complaint_id": complaint_id,
        "category": complaint.category.strip(),
        "description": complaint.description.strip(),
        "incident_date": complaint.incident_date,
        "organization": complaint.organization,
    }

    complaints = load_complaints()
    complaints.append(new_complaint)
    save_complaints(complaints)

    return ComplaintResponse(
        success=True,
        complaint_id=complaint_id,
        message="Complaint submitted anonymously.",
    )
