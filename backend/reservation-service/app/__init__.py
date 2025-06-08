from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from prometheus_client import Counter, Histogram, make_wsgi_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware
import time

db = SQLAlchemy()

# Define metrics
REQUEST_COUNT = Counter('reservation_request_total', 'Total number of requests to reservation service', ['method', 'endpoint', 'status'])
REQUEST_LATENCY = Histogram('reservation_request_latency_seconds', 'Request latency in seconds', ['endpoint'])

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://student:12345@db:5432/hotel_db'
    
    CORS(app)
    db.init_app(app)
    
    # Add metrics endpoint
    app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
        '/metrics': make_wsgi_app()
    })
    
    @app.before_request
    def before_request():
        request.start_time = time.time()
    
    @app.after_request
    def after_request(response):
        if request.path != '/metrics':
            latency = time.time() - request.start_time
            REQUEST_LATENCY.labels(endpoint=request.path).observe(latency)
            REQUEST_COUNT.labels(
                method=request.method,
                endpoint=request.path,
                status=response.status_code
            ).inc()
        return response
    
    from .routes import reservation_bp
    app.register_blueprint(reservation_bp)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app