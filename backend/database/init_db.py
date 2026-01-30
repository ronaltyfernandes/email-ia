from database import engine, SessionLocal
from models import Email, Base

Base.metadata.create_all(bind=engine)

db = SessionLocal()

emails = [
    Email(
        content="Olá, gostaria de saber o valor do serviço.",
        category="Comercial",
        response="Obrigado pelo contato! Em breve enviaremos os valores.",
        font="Cliente"
    ),
    Email(
        content="Estou com problemas no sistema.",
        category="Suporte",
        response="Nos informe mais detalhes para podermos ajudar.",
        font="Cliente"
    ),
]

# Insere no banco
db.add_all(emails)
db.commit()
db.close()

print("Banco criado e populado com sucesso!")
