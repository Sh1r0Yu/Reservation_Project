from flask import Blueprint, jsonify, request
from datetime import datetime
from .models import Reservation, db
import requests
import traceback

reservation_bp = Blueprint('reservation', __name__)

@reservation_bp.route('/', methods=['GET'])
def home():
    try:
        return jsonify({"message": "Welcome to Reservation Service"})
    except Exception as e:
        print('Error:', str(e))
        print('Traceback:', traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@reservation_bp.route('/api/reservations', methods=['POST'])
def create_reservation():
    try:
        data = request.get_json()
        print('Received data:', data)  # Debug log
        
        new_reservation = Reservation(
            user_id=data['user_id'],
            room_id=data['room_id'],
            check_in=datetime.strptime(data['check_in'], '%Y-%m-%d'),
            check_out=datetime.strptime(data['check_out'], '%Y-%m-%d'),
            status='pending'
        )
        db.session.add(new_reservation)
        db.session.commit()

        # Send notification
        try:
            notification_data = {
                "user_id": data['user_id'],
                "reservation_id": new_reservation.id,
                "message": f"New reservation created for Room {data['room_id']}",
                "type": "reservation_created"
            }
            # Gunakan nama service dari docker-compose
            requests.post('http://notification-service:5004/api/notifications', json=notification_data)
        except Exception as ne:
            print('Notification error:', str(ne))

        return jsonify({'message': 'Reservation created', 'id': new_reservation.id}), 201
    except Exception as e:
        print('Error:', str(e))
        print('Traceback:', traceback.format_exc())
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reservation_bp.route('/api/reservations', methods=['GET'])
def get_reservations():
    try:
        reservations = Reservation.query.all()
        return jsonify([{
            'id': r.id,
            'user_id': r.user_id,
            'room_id': r.room_id,
            'check_in': r.check_in.strftime('%Y-%m-%d'),
            'check_out': r.check_out.strftime('%Y-%m-%d'),
            'status': r.status
        } for r in reservations])
    except Exception as e:
        print('Error:', str(e))
        print('Traceback:', traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@reservation_bp.route('/api/reservations/<int:id>', methods=['GET'])
def get_reservation(id):
    reservation = Reservation.query.get_or_404(id)
    return jsonify({
        'id': reservation.id,
        'user_id': reservation.user_id,
        'room_id': reservation.room_id,
        'check_in': reservation.check_in.strftime('%Y-%m-%d'),
        'check_out': reservation.check_out.strftime('%Y-%m-%d'),
        'status': reservation.status
    })

@reservation_bp.route('/api/reservations/user/<int:user_id>', methods=['GET'])
def get_user_reservations(user_id):
    reservations = Reservation.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': r.id,
        'room_id': r.room_id,
        'check_in': r.check_in.strftime('%Y-%m-%d'),
        'check_out': r.check_out.strftime('%Y-%m-%d'),
        'status': r.status
    } for r in reservations])

@reservation_bp.route('/api/reservations/<int:id>/status', methods=['PUT'])
def update_status(id):
    data = request.get_json()
    reservation = Reservation.query.get_or_404(id)
    reservation.status = data['status']
    db.session.commit()
    return jsonify({'message': 'Status updated'})