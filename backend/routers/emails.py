"""
Router para endpoints de Email.
Responsável apenas por HTTP, delegando lógica para serviços.
"""
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from database.database import SessionLocal
from services.email_domain_service import EmailService
from schemas import EmailCreate, EmailProcessRequest, EmailUpdateRequest
from config import settings


router = APIRouter(prefix="/emails", tags=["Emails"])


def get_db():
    """Dependência para gerenciar sessão do banco."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_email_service(db: Session = Depends(get_db)) -> EmailService:
    """Dependência para injetar serviço de email."""
    return EmailService(db)


@router.get("", status_code=status.HTTP_200_OK)
def list_emails(
    page: int = Query(
        settings.default_page,
        ge=1,
        description="Número da página"
    ),
    limit: int = Query(
        settings.default_limit,
        ge=1,
        le=settings.max_limit,
        description="Quantidade de itens por página"
    ),
    service: EmailService = Depends(get_email_service)
):
    """
    Lista emails com paginação.

    - **page**: Número da página (padrão: 1)
    - **limit**: Itens por página (padrão: 10, máximo: 100)
    """
    return service.list_emails(page, limit)


@router.get("/{email_id}", status_code=status.HTTP_200_OK)
def get_email(
    email_id: int,
    service: EmailService = Depends(get_email_service)
):
    return service.get_email(email_id)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_email(
    email: EmailCreate,
    service: EmailService = Depends(get_email_service)
):
    created_email = service.create_email(email)
    return {
        "message": "Email salvo com sucesso",
        "email_id": created_email.id,
        "status_code": status.HTTP_201_CREATED
    }


@router.post("/process", status_code=status.HTTP_201_CREATED)
def process_email(
    request: EmailProcessRequest,
    service: EmailService = Depends(get_email_service)
):
    """
    Processa um email com IA.

    Classifica e gera resposta automaticamente usando IA.

    - **content**: Conteúdo do email a processar
    """
    return service.process_email(request.content)


@router.put("/{email_id}", status_code=status.HTTP_200_OK)
def update_email(
    email_id: int,
    data: EmailUpdateRequest,
    service: EmailService = Depends(get_email_service)
):
    """
    Atualiza um email existente.

    - **email_id**: ID do email a atualizar
    """
    email = service.update_email(email_id, data)
    return {
        "message": "Email atualizado com sucesso",
        "email": email,
        "status_code": status.HTTP_200_OK
    }


@router.delete("/{email_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_email(
    email_id: int,
    service: EmailService = Depends(get_email_service)
):
    """
    Deleta um email.

    - **email_id**: ID do email a deletar
    """
    service.delete_email(email_id)
    return None
