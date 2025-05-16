from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)  # Increased size
    role = db.Column(db.String(20), nullable=False, default='user')  # user or admin