from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://student:12345@host.docker.internal:5432/hotel_db'
    
    CORS(app)
    db.init_app(app)
    
    from .routes import auth_bp
    app.register_blueprint(auth_bp)
    
    return app