from flask import Blueprint, jsonify, request
from .models import Room, db
import traceback

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

@hotel_bp.route('/api/rooms', methods=['POST'])
def create_room():
    try:
        data = request.get_json()
        new_room = Room(
            room_number=data['room_number'],
            room_type=data['room_type'],
            price=data['price'],
            description=data.get('description', '')
        )
        db.session.add(new_room)
        db.session.commit()
        return jsonify({'message': 'Room created successfully', 'id': new_room.id}), 201
    except Exception as e:
        print('Error:', str(e))
        print('Traceback:', traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@hotel_bp.route('/api/rooms/<int:room_id>', methods=['GET'])
def get_room(room_id):
    room = Room.query.get_or_404(room_id)
    return jsonify({
        'id': room.id,
        'room_number': room.room_number,
        'room_type': room.room_type,
        'price': room.price,
        'status': room.status,
        'description': room.description
    })

@hotel_bp.route('/api/rooms/<int:room_id>', methods=['PUT'])
def update_room(room_id):
    room = Room.query.get_or_404(room_id)
    data = request.get_json()
    
    room.room_number = data.get('room_number', room.room_number)
    room.room_type = data.get('room_type', room.room_type)
    room.price = data.get('price', room.price)
    room.status = data.get('status', room.status)
    room.description = data.get('description', room.description)
    
    db.session.commit()
    return jsonify({'message': 'Room updated successfully'})

@hotel_bp.route('/api/rooms/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    room = Room.query.get_or_404(room_id)
    db.session.delete(room)
    db.session.commit()
    return jsonify({'message': 'Room deleted successfully'})