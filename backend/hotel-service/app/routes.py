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
        'description': room.description,
        'total_rooms': room.total_rooms,
        'available_rooms': room.available_rooms
    } for room in rooms])

@hotel_bp.route('/api/rooms', methods=['POST'])
def create_room():
    try:
        data = request.get_json()
        
        # Pastikan semua field yang diperlukan ada
        required_fields = ['room_type', 'price', 'room_number', 'total_rooms', 'available_rooms']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Field {field} harus diisi'}), 400
        
        # Buat instance Room baru
        new_room = Room(
            room_type=data['room_type'],
            room_number=f"R{data['total_rooms']:03d}", # Generate room number otomatis
            price=float(data['price']),
            total_rooms=int(data['total_rooms']),
            available_rooms=int(data['available_rooms']),
            status='available'
        )
        
        db.session.add(new_room)
        db.session.commit()
        
        return jsonify({
            'message': 'Kamar berhasil ditambahkan',
            'room': {
                'id': new_room.id,
                'room_type': new_room.room_type,
                'room_number': new_room.room_number,
                'price': new_room.price,
                'total_rooms': new_room.total_rooms,
                'available_rooms': new_room.available_rooms,
                'status': new_room.status
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
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