from fastapi import FastAPI, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from database.database import SessionLocal, engine, Base
from database.models import Email
from schemas import EmailCreate
from ia.email_ia import classify_and_answer_email
from schemas import EmailProcessRequest


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


@app.get("/emails", tags=["Emails"])
def list_emails(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    offset = (page - 1) * limit

    emails = (
        db.query(Email)
        .offset(offset)
        .limit(limit)
        .all()
    )

    total = db.query(Email).count()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "pages": (total + limit - 1) // limit,
        "data": emails
    }


@app.get("/emails/{email_id}", tags=["Emails"])
def get_email_by_id(
    email_id: int,
    db: Session = Depends(get_db)
):
    email = db.query(Email).filter(Email.id == email_id).first()

    if not email:
        raise HTTPException(
            status_code=404,
            detail="Email não encontrado"
        )

    return email


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


@app.post("/process-email", tags=["Emails"])
def process_email(
    email: EmailProcessRequest,
    db: Session = Depends(get_db)
):
    ai_result = classify_and_answer_email(email.content)

    new_email = Email(
        content=email.content,
        category=ai_result["category"],
        response=ai_result["response"],
        font="email"
    )

    db.add(new_email)
    db.commit()
    db.refresh(new_email)

    return {
        "category": ai_result["category"],
        "response": ai_result["response"]
    }
