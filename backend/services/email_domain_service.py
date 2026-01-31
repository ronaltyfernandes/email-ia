from sqlalchemy.orm import Session
from database.models import Email
from repositories.email_repository import EmailRepository
from ia.email_ia import classify_and_answer_email
from exceptions import EmailNotFoundError, EmailProcessingError
from schemas import EmailCreate, EmailUpdateRequest


class EmailService:
    """Serviço de domínio para operações com emails."""

    def __init__(self, db: Session):
        self.repository = EmailRepository(db)

    def create_email(self, email_data: EmailCreate) -> Email:
        email = Email(
            content=email_data.content,
            category=email_data.category,
            response=email_data.response,
            font=email_data.font or "manual"
        )

        return self.repository.create(email)

    def process_email(self, content: str) -> dict:
        try:
            ai_result = classify_and_answer_email(content)
        except Exception as e:
            raise EmailProcessingError(
                detail=f"Erro ao processar email com IA: {str(e)}"
            )

        email = Email(
            content=content,
            category=ai_result["category"],
            response=ai_result["response"],
            font="email"
        )

        created_email = self.repository.create(email)

        return {
            "email_id": created_email.id,
            "category": created_email.category,
            "response": created_email.response
        }

    def get_email(self, email_id: int) -> Email:
        email = self.repository.get_by_id(email_id)

        if not email:
            raise EmailNotFoundError(email_id)

        return email

    def list_emails(self, page: int, limit: int) -> dict:
        emails, total = self.repository.list_with_pagination(page, limit)

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "pages": (total + limit - 1) // limit,
            "data": emails
        }

    def update_email(self, email_id: int, data: EmailUpdateRequest) -> Email:
        update_data = data.dict(exclude_unset=True)
        email = self.repository.update(email_id, update_data)

        if not email:
            raise EmailNotFoundError(email_id)

        return email

    def delete_email(self, email_id: int) -> None:
        success = self.repository.delete(email_id)

        if not success:
            raise EmailNotFoundError(email_id)
