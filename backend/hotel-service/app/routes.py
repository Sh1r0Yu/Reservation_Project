from flask import Blueprint, jsonify, request
from .models import Room, db

hotel_bp = Blueprint('hotel', __name__)

@hotel_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to Hotel Service"})

@hotel_bp.route('/api/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([{
        'id': room.id,
        'room_number': room.room_number,
        'room_type': room.room_type,
        'price': room.price,
        'status': room.status,
        'description': room.description
    } for room in rooms])