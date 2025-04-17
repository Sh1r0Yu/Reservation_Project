from flask import Blueprint, jsonify, request
import requests

reservation_bp = Blueprint('reservation', __name__)

@reservation_bp.route('/api/reservations', methods=['POST'])
def create_reservation():
    try:
        data = request.get_json()
        # ... existing reservation creation code ...

        # Send notification
        notification_data = {
            "user_id": data['user_id'],
            "reservation_id": new_reservation.id,
            "message": f"Reservation confirmed for Room {data['room_id']}",
            "type": "booking_confirmation"
        }
        
        requests.post(
            'http://localhost:5004/api/notifications',
            json=notification_data
        )

        return jsonify({'message': 'Reservation created', 'id': new_reservation.id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500