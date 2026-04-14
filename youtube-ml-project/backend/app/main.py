from fastapi import FastAPI
from app.routes.predict import router as predict_router

app = FastAPI()

app.include_router(predict_router)

@app.get("/")
def root():
    return {"message": "YouTube ML API running"}