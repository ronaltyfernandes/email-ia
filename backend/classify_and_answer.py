# import openai

# def classify_and_answer(email_text):
#     prompt = f"""
#     Classifique o email abaixo como PRODUTIVO ou IMPRODUTIVO
#     e gere uma resposta adequada.

#     Email:
#     {email_text}
#     """

#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=[{"role": "user", "content": prompt}]
#     )

#     return {
#         "resultado": response.choices[0].message.content
#     }
