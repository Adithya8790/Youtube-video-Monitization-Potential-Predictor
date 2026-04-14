from pydantic import BaseModel, Field

class PredictionOutput(BaseModel):
    predicted_likes: float = Field(..., example=15000.5)
    engagement_rate: float = Field(..., example=0.08)
    monetization: str = Field(..., example="High")