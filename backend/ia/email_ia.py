import json
from openai import OpenAI
from ia.nlp import preprocess_text
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY não configurada")

client = OpenAI(api_key=api_key)


def classify_and_answer_email(content: str) -> dict:
    clean_text = preprocess_text(content)

    prompt = f"""
Você é um assistente que classifica emails corporativos.

Classifique o email abaixo como:
- Produtivo (se requer ação, resposta ou acompanhamento)
- Improdutivo (se não requer ação)

Depois gere uma resposta adequada.

Email:
\"\"\"{clean_text}\"\"\"

Responda **apenas** no formato JSON válido:
{{
  "category": "Produtivo ou Improdutivo",
  "response": "texto da resposta"
}}
"""

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Responda somente com JSON válido."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    content = completion.choices[0].message.content

    return json.loads(content)
