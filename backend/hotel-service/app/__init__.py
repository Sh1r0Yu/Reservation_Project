from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # Gunakan nama service 'db' sesuai docker-compose
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://student:12345@db:5432/hotel_db'
    
    CORS(app)
    db.init_app(app)
    
    from .routes import hotel_bp
    app.register_blueprint(hotel_bp)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app