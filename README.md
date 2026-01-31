🚀 Como rodar o projeto localmente

Este projeto é dividido em frontend (React) e backend (Python).
Siga os passos abaixo para rodar cada parte.

🖥️ Frontend (React)

Acesse a pasta do frontend:

cd frontend


Instale as dependências:

npm install


Inicie o servidor de desenvolvimento:

npm run dev


A aplicação estará disponível em:

http://localhost:5173


(ou outra porta indicada no terminal)

🧠 Backend (Python)

Acesse a pasta do backend:

cd backend


Crie e ative um ambiente virtual (recomendado):

Windows

python -m venv venv
venv\Scripts\activate


Linux / macOS

python3 -m venv venv
source venv/bin/activate


Instale as dependências:

pip install -r requirements.txt


Inicie o servidor backend:

uvicorn main:app --reload


O backend ficará disponível em:

http://127.0.0.1:8000
