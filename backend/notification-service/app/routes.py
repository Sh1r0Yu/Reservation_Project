from flask import Blueprint, jsonify, request
from .models import Notification, db

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to Notification Service"})

@notification_bp.route('/api/notifications', methods=['POST'])
def create_notification():
    data = request.get_json()
    notification = Notification(
        user_id=data['user_id'],
        reservation_id=data['reservation_id'],
        message=data['message'],
        type=data['type']
    )
    db.session.add(notification)
    db.session.commit()
    return jsonify({'message': 'Notification created', 'id': notification.id}), 201

@notification_bp.route('/api/notifications/user/<int:user_id>', methods=['GET'])
def get_user_notifications(user_id):
    notifications = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': n.id,
        'message': n.message,
        'type': n.type,
        'status': n.status,
        'created_at': n.created_at.isoformat()
    } for n in notifications])