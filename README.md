# Bix Challenge

This project is a technical challenge that uses Django for the backend and React for the frontend.

## Prerequisites

Before you start, you will need to have the following installed on your machine:
- Python (3.8 or higher)
- Node.js (14 or higher)
- npm (included with Node.js)

## Environment Setup

Clone the repository and navigate to the project folder.

```bash
git clone https://github.com/gabpoersch/bixchallenge.git
cd bixchallenge/
```

### Backend (Django)

Create a Python virtual environment inside the project folder:

```bash
cd server/
python -m venv venv
source venv/bin/activate # On Windows use: venv\Scripts\activate
```

Install the backend dependencies with:

```bash
pip install -r requirements.txt
```

#### Database

Run the migrations to set up the `db.sqlite3` database (if this step fails or you can simply run "python manage.py runserver" on your terminal and the SQLite file will be automatically placed within your folder.):

```bash
python manage.py migrate
```

Create a user to access the Django admin panel:

```bash
python manage.py createsuperuser
```

To run the Django backend server:

```bash
# Make sure the virtual environment is activated
python manage.py runserver
```

Follow these steps so you can access the frontend subsequently:
- Log in at http://127.0.0.1:8000/admin
- Create two groups, "admin" and "user"
- Create users belonging to the groups to be able to test the application's functionalities properly. Remember that admin users (belonging to the "admin" group, and not SUPER USERS) will have full access to perform any type of requests while other groups will only have reading permissions. This setting is configured directly through the endpoints.

### Frontend (React)

Open a new terminal and navigate to the frontend folder and install Node.js dependencies:

```bash
cd client/frontend/
npm install
```

Start the React development server:

```bash
npm run dev
```

Now you can access the application in the browser:

- **Frontend:** http://localhost:5173/
- **Backend:** http://127.0.0.1:8000/admin

OBS: I also uploaded a Postman collection to the repository, in case you find it useful.
