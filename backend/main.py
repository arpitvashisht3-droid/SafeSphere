from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.complaints import router as complaints_router
from routes.resources import router as resources_router
from routes.legal import router as legal_router
from routes.emergency import router as emergency_router
from routes.safety import router as safety_router
from routes.sos import router as sos_router

app = FastAPI(title="SafeSphere API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaints_router, prefix="/api")
app.include_router(resources_router, prefix="/api")
app.include_router(legal_router, prefix="/api")
app.include_router(emergency_router, prefix="/api")
app.include_router(safety_router, prefix="/api")
app.include_router(sos_router, prefix="/api")


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "SafeSphere"
    }
