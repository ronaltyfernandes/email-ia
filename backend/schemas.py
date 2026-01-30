from pydantic import BaseModel
from typing import Optional, Literal


class EmailCreate(BaseModel):
    content: Optional[str]
    category: Optional[Literal["Produtivo", "Improdutivo"]]
    response: Optional[str]
    font: Optional[str] = None


class EmailProcessRequest(BaseModel):
    content: str


class EmailUpdateRequest(BaseModel):
    content: Optional[str]
    category: Optional[Literal["Produtivo", "Improdutivo"]]
    response: Optional[str]
    font: Optional[str]
