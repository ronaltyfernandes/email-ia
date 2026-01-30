from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal, engine, Base
from database.models import Email
from schemas import EmailCreate


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Email Classification API",
    version="1.0.0",
    description="API para classificação automática de emails e "
                "sugestão de respostas usando IA"
)


# Dependência para abrir/fechar sessão
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}


@app.get("/", tags=["Root"])
def root():
    return {"status": "testes s"}


@app.post("/emails", tags=["Emails"])
def create_email(email: EmailCreate, db: Session = Depends(get_db)):
    new_email = Email(
        content=email.content,
        category=email.category,
        response=email.response,
        font=email.font
    )

    db.add(new_email)
    db.commit()
    db.refresh(new_email)

    return {
        "message": "Email salvo com sucesso",
        "email_id": new_email.id
    }
