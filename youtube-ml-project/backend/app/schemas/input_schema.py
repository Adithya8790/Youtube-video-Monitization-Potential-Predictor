from pydantic import BaseModel

class VideoInput(BaseModel):
    title: str
    description: str
    tags: str
    video_length: float
    category_id: str
    upload_hour: int