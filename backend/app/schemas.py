from pydantic import BaseModel, ConfigDict


class CourseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category: str
    duration_hours: int
    status: str
