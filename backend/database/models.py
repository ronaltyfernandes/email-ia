from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database.database import Base


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    category = Column(String)
    response = Column(Text)
    font = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
