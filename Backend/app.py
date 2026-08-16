import os
from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from functools import wraps

app = Flask(__name__)
CORS(app)

# --- Admin Configuration ---
ADMIN_PASSWORD = "admin123"

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        password = request.headers.get('X-Admin-Password')
        if password != ADMIN_PASSWORD:
            return jsonify({"error": "Unauthorized. Admin access only."}), 403
        return f(*args, **kwargs)
    return decorated_function

# --- Database Setup ---
def init_db():
    conn = sqlite3.connect('hotel.db')
    cursor = conn.cursor()
    
    cursor.execute('DROP TABLE IF EXISTS rooms')
    cursor.execute('DROP TABLE IF EXISTS gallery_images')
    
    cursor.execute('''
        CREATE TABLE rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_number TEXT UNIQUE,
            is_booked BOOLEAN DEFAULT 0,
            guest_name TEXT,
            guest_email TEXT,
            guest_phone TEXT,
            check_in TEXT,
            check_out TEXT,
            price REAL DEFAULT 0,
            image_url TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE gallery_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT,
            height INTEGER DEFAULT 600
        )
    ''')
    
    # Populate Rooms with default images
    rooms_data = [
        {"type": "Dormitory", "count": 2, "price": 2000, "img": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"},
        {"type": "Twin Bed", "count": 4, "price": 5000, "img": "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"},
        {"type": "Couple Bed", "count": 10, "price": 7000, "img": "https://images.pexels.com/photos/2868233/pexels-photo-2868233.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"},
        {"type": "King Bed", "count": 6, "price": 9000, "img": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop"}
    ]
    
    rooms_to_add = []
    for r in rooms_data:
        for i in range(1, r["count"] + 1):
            rooms_to_add.append((f"{r['type']} Room {i}", 0, r["price"], r["img"]))
            
    cursor.executemany('INSERT INTO rooms (room_number, is_booked, price, image_url) VALUES (?, ?, ?, ?)', rooms_to_add)
        
    # Populate Gallery
    def px2(id, w, h): 
        return f"https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w={w}&h={h}"
    
    gallery_to_add = [
        (px2(12717176, 600, 800), 800),
        (px2(37836760, 600, 450), 450),
        (px2(33269874, 600, 700), 700),
        (px2(9336318, 600, 900), 900),
        (px2(9858156, 600, 500), 500),
        (px2(35789857, 600, 850), 850),
        (px2(35504526, 600, 900), 900),
        (px2(32983716, 600, 450), 450),
        (px2(13517454, 600, 800), 800),
    ]
    cursor.executemany('INSERT INTO gallery_images (url, height) VALUES (?, ?)', gallery_to_add)
        
    conn.commit()
    conn.close()

init_db()

def get_db_connection():
    conn = sqlite3.connect('hotel.db')
    conn.row_factory = sqlite3.Row 
    return conn

# --- Auth Route ---
@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    if data.get('password') == ADMIN_PASSWORD:
        return jsonify({"message": "Login successful"})
    return jsonify({"error": "Invalid password"}), 401

# --- Rooms API Routes ---
@app.route('/rooms', methods=['GET'])
def get_rooms():
    conn = get_db_connection()
    rooms = conn.execute('SELECT * FROM rooms').fetchall()
    conn.close()
    return jsonify([dict(room) for room in rooms])

@app.route('/rooms/book/<room_type>', methods=['POST'])
def book_room(room_type):
    data = request.get_json()
    
    guest_name = data.get('guest_name', 'N/A')
    guest_email = data.get('guest_email', 'N/A')
    guest_phone = data.get('guest_phone', 'N/A')
    check_in = data.get('check_in', 'N/A')
    check_out = data.get('check_out', 'N/A')

    conn = get_db_connection()
    room = conn.execute('SELECT * FROM rooms WHERE room_number LIKE ? AND is_booked = 0', (room_type + '%',)).fetchone()
    
    if room is None:
        conn.close()
        return jsonify({"error": "No rooms of this type available"}), 404
        
    conn.execute('''
        UPDATE rooms 
        SET is_booked = 1, guest_name = ?, guest_email = ?, guest_phone = ?, check_in = ?, check_out = ? 
        WHERE id = ?
    ''', (guest_name, guest_email, guest_phone, check_in, check_out, room['id']))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"Room {room['room_number']} successfully booked!"})

@app.route('/rooms/cancel/<room_number>', methods=['POST'])
@admin_required
def cancel_room(room_number):
    conn = get_db_connection()
    room = conn.execute('SELECT * FROM rooms WHERE room_number = ?', (room_number,)).fetchone()
    
    if room is None:
        conn.close()
        return jsonify({"error": "Room not found"}), 404
        
    if room['is_booked'] == 0:
        conn.close()
        return jsonify({"error": "Room is not currently booked"}), 400
        
    conn.execute('''
        UPDATE rooms 
        SET is_booked = 0, guest_name = NULL, guest_email = NULL, guest_phone = NULL, check_in = NULL, check_out = NULL 
        WHERE room_number = ?
    ''', (room_number,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"Booking for Room {room_number} canceled."})

@app.route('/rooms/update-price/<room_type>', methods=['POST'])
@admin_required
def update_price(room_type):
    data = request.get_json()
    new_price = data.get('price')
    
    if new_price is None:
        return jsonify({"error": "Price is required"}), 400

    conn = get_db_connection()
    conn.execute('UPDATE rooms SET price = ? WHERE room_number LIKE ?', (new_price, room_type + '%'))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"Prices for {room_type} updated to {new_price}"})

# NEW: Update Room Image Route
@app.route('/rooms/update-image/<room_type>', methods=['POST'])
@admin_required
def update_image(room_type):
    data = request.get_json()
    new_image_url = data.get('image_url')
    
    if not new_image_url:
        return jsonify({"error": "Image URL is required"}), 400

    conn = get_db_connection()
    conn.execute('UPDATE rooms SET image_url = ? WHERE room_number LIKE ?', (new_image_url, room_type + '%'))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"Image for {room_type} rooms updated successfully"})

# --- Gallery API Routes ---
@app.route('/gallery', methods=['GET'])
def get_gallery():
    conn = get_db_connection()
    images = conn.execute('SELECT * FROM gallery_images').fetchall()
    conn.close()
    return jsonify([dict(img) for img in images])

@app.route('/gallery/add', methods=['POST'])
@admin_required
def add_gallery_image():
    data = request.get_json()
    url = data.get('url')
    height = data.get('height', 600)
    
    if not url:
        return jsonify({"error": "Image URL is required"}), 400
    
    conn = get_db_connection()
    cursor = conn.execute('INSERT INTO gallery_images (url, height) VALUES (?, ?)', (url, height))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return jsonify({"id": new_id, "url": url, "height": height})

@app.route('/gallery/delete/<int:image_id>', methods=['POST'])
@admin_required
def delete_gallery_image(image_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM gallery_images WHERE id = ?', (image_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Image deleted successfully"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
