import json
import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, status
from pydantic import BaseModel

router = APIRouter(tags=["SOS Alert"])

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "sos_alerts.json")


class SOSCreate(BaseModel):
    message: Optional[str] = "Emergency! I need help."
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SOSItem(BaseModel):
    alert_id: str
    timestamp: str
    message: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: str


class SOSListResponse(BaseModel):
    alerts: List[SOSItem]


class SOSResponse(BaseModel):
    success: bool
    alert_id: str
    timestamp: str
    message: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: str


def load_sos_alerts() -> list:
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


def save_sos_alerts(alerts: list) -> None:
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(alerts, f, indent=2, ensure_ascii=False)


@router.get("/sos", response_model=SOSListResponse)
def get_sos_alerts():
    alerts_data = load_sos_alerts()
    return SOSListResponse(alerts=alerts_data)


@router.post(
    "/sos",
    response_model=SOSResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_sos_alert(sos_data: SOSCreate):
    alert_id = f"SOS-{uuid.uuid4().hex[:8].upper()}"
    timestamp = datetime.now(timezone.utc).isoformat()

    alert_record = {
        "alert_id": alert_id,
        "timestamp": timestamp,
        "message": sos_data.message,
        "latitude": sos_data.latitude,
        "longitude": sos_data.longitude,
        "status": "active",
    }

    alerts = load_sos_alerts()
    alerts.append(alert_record)
    save_sos_alerts(alerts)

    return SOSResponse(
        success=True,
        alert_id=alert_id,
        timestamp=timestamp,
        message=sos_data.message,
        latitude=sos_data.latitude,
        longitude=sos_data.longitude,
        status="active",
    )
