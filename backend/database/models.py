from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    CheckConstraint
)
from datetime import datetime
from database.database import Base


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)

    # Conteúdo do email (OBRIGATÓRIO)
    content = Column(Text, nullable=False)

    # Categoria só pode ser Produtivo ou Improdutivo
    category = Column(
        String(20),
        nullable=False
    )

    # Resposta gerada pela IA (OBRIGATÓRIA)
    response = Column(Text, nullable=False)

    # Origem do email (ex: email, whatsapp, sistema)
    font = Column(
        String(50),
        nullable=False,
        default="email"
    )

    created_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    __table_args__ = (
        CheckConstraint(
            "category IN ('Produtivo', 'Improdutivo')",
            name="check_email_category"
        ),
    )
