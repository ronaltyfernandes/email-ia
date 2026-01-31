"""
Aplicação FastAPI principal.
Responsável apenas pela inicialização da aplicação
e configuração de middlewares.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine, Base
from config import settings
from routers import emails_router, health_router


# Inicializa banco de dados
Base.metadata.create_all(bind=engine)

# Cria aplicação FastAPI
app = FastAPI(
    title=settings.app_title,
    version=settings.app_version,
    description=settings.app_description,
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=settings.cors_allow_methods,
    allow_headers=settings.cors_allow_headers,
)

# Registra routers
app.include_router(health_router)
app.include_router(emails_router)
