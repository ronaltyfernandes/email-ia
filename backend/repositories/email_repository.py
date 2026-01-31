"""
Camada de repositório para Email.
Responsável apenas por operações de banco de dados.
"""
from typing import Optional, Sequence
from sqlalchemy.orm import Session
from database.models import Email


class EmailRepository:
    def __init__(self, db: Session):
        """Inicializa o repositório com uma sessão do banco de dados."""
        self.db = db

    def create(self, email: Email) -> Email:
        self.db.add(email)
        self.db.commit()
        self.db.refresh(email)
        return email

    def get_by_id(self, email_id: int) -> Optional[Email]:
        return self.db.query(Email).filter(Email.id == email_id).first()

    def list_with_pagination(
        self,
        page: int,
        limit: int
    ) -> tuple[Sequence[Email], int]:
        """
        Lista emails com paginação.

        Args:
            page: Número da página (começa em 1)
            limit: Quantidade de itens por página

        Returns:
            Tupla (lista de emails, total de registros)
        """
        offset = (page - 1) * limit

        emails = (
            self.db.query(Email)
            .offset(offset)
            .limit(limit)
            .all()
        )

        total = self.db.query(Email).count()

        return emails, total

    def update(self, email_id: int, data: dict) -> Optional[Email]:
        email = self.get_by_id(email_id)

        if not email:
            return None

        for field, value in data.items():
            setattr(email, field, value)

        self.db.commit()
        self.db.refresh(email)

        return email

    def delete(self, email_id: int) -> bool:
        email = self.get_by_id(email_id)

        if not email:
            return False

        self.db.delete(email)
        self.db.commit()

        return True
