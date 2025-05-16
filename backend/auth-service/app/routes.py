from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, db
import traceback

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to Auth Service"})

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print('Received data:', data)  # Debug log
        
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Missing username or password'}), 400
            
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
            
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            username=data['username'],
            password=hashed_password,
            role=data.get('role', 'user')
        )
        
        db.session.add(new_user)
        db.session.commit()
        print('User created successfully')  # Debug log
        
        return jsonify({'message': 'User created successfully', 'id': new_user.id}), 201
    except Exception as e:
        print('Error:', str(e))
        print('Traceback:', traceback.format_exc())
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and check_password_hash(user.password, data['password']):
        return jsonify({
            'message': 'Login successful',
            'user_id': user.id,
            'role': user.role
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401