from pydantic import BaseModel


class EmailCreate(BaseModel):
    content: str
    category: str | None = None
    response: str | None = None
    font: str | None = None


class EmailProcessRequest(BaseModel):
    content: str
