from fastapi import HTTPException, status


class EmailNotFoundError(HTTPException):
    def __init__(self, email_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Email com ID {email_id} não encontrado"
        )


class EmailProcessingError(HTTPException):
    def __init__(self, detail: str = "Erro ao processar email"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail
        )


class ValidationError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )
