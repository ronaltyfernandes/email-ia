from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Configurações centralizadas da aplicação."""

    # Aplicação
    app_title: str = "Email Classification API"
    app_version: str = "1.0.0"
    app_description: str = ("API para classificação automática de emails e "
                            "sugestão de respostas usando IA")

    # CORS
    cors_origins: list[str] = ["*"]
    cors_allow_credentials: bool = True
    cors_allow_methods: list[str] = ["*"]
    cors_allow_headers: list[str] = ["*"]

    # Paginação
    default_page: int = 1
    default_limit: int = 10
    max_limit: int = 100

    # OpenAI
    openai_api_key: Optional[str] = None

    class Config:
        env_file = ".env"
        extra = "ignore"  # Ignora variáveis de ambiente extras


settings = Settings()
