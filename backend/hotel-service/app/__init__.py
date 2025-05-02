from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # Ubah localhost menjadi nama service postgres
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://student:12345@postgres:5432/hotel_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)
    db.init_app(app)
    
    # Import dan register blueprint di dalam fungsi
    from .routes import hotel_bp
    app.register_blueprint(hotel_bp)
    
    return app