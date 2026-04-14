from pydantic import BaseModel, Field

class PredictionOutput(BaseModel):
    title: str = Field(..., example="Amazing AI Tool You Must Try!")
    description: str = Field(..., example="This video explains...")
    tags: str = Field(..., example="AI, technology, tools")
    video_length: float = Field(..., example=300)
    category_id: str = Field(..., example="Music")
    upload_hour: int = Field(..., example=18)