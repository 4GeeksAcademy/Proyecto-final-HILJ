from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Itinerary, Follows_Followers_Rel
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/itineraries', methods=['GET'])
def get_itineraries():
    city = request.args.get('city')
    duration = request.args.get('duration')

    query = Itinerary.query
    
    if city:
        query = query.filter_by(city=city)
    
    if duration:
        query = query.filter_by(duration=duration)
    
    itineraries = query.all()
    itineraries = [itinerary.serialize() for itinerary in itineraries]

    if not itineraries:
        return jsonify({'msg': 'Data not found'}), 404

    return jsonify({'msg': 'ok', 'itineraries': itineraries}), 200

@api.route('/itineraries/<int:id>', methods=['GET'])
def get_single_itinerary(id):
    itinerary = Itinerary.query.get(id)
    if not itinerary:
        return jsonify({'msg': 'Data not found'}), 404
    itinerary = itinerary.serialize()
    return jsonify({'msg': 'ok', 'itinerary': itinerary}), 200

@api.route('/itineraries', methods=['POST'])
def create_itinerary():
    data = request.json
    required_fields = ['author_id', 'title', 'description', 'duration', 'itinerary']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400

    new_itinerary = Itinerary(
        author_id = data['author_id'],
        title = data['title'].strip(),
        description = data['description'].strip(),
        duration = data['duration'],
        itinerary = data['itinerary'],
        images = data['images']
    )

    db.session.add(new_itinerary)
    db.session.commit()
    return jsonify({'msg': 'Itinerary created successfully'}), 201

# Rutas de autenticación
@api.route('/register', methods=['POST'])
def register():
        data = request.json
        required_fields = ['email', 'password', 'username']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400

        # Verificar si el email ya está en uso
        user = User.query.filter_by(email=data['email']).first()
        if user:
            return jsonify({'success': False, 'msg': 'Este email ya está en uso.'}), 400
        username = User.query.filter_by(username=data['username']).first()
        if username:
            return jsonify({'success': False, 'msg': 'Este username ya está en uso.'}), 400

        # Encriptar la contraseña usando bcrypt
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        # Crear nuevo usuario
        new_user = User(email=data['email'], username=data['username'], password=hashed_password.decode('utf-8'))

        # Guardar usuario en la base de datos
        db.session.add(new_user)
        db.session.commit()

        # Crear token de acceso JWT
        access_token = create_access_token(identity=new_user.id)

        return jsonify({'msg': 'User registered successfully', 'access_token': access_token}), 201
    

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    required_fields = ['email', 'password']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Missing fields: {", ".join(missing_fields)}'}), 400
    
    # Buscar el usuario por email
    user = User.query.filter_by(email=data['email']).first()
    
    # Verificar si el usuario existe y si la contraseña es correcta
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'msg': 'Email o contraseña incorrectos.'}), 401
    
    # Crear el token de acceso JWT si la autenticación es exitosa
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user_id = get_jwt_identity()
    return jsonify({'success': True, 'msg': 'Token is valid', 'user_id': current_user_id}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.username), 200


#Ruta para modal de seguidores y seguidos
@api.route('/follows_followers_rel', methods=['POST'])
@jwt_required()    
def create_followers_rel():
    new_follower = Follows_followers_rel(
        author_id = followed_user_id['author_id'],
    )

    db.follows_followers_rel.add(new_follower)
    db.follows_followers_rel.commit()
    return jsonify(), 201

@api.route('/follows_followers_rel', methods=['POST'])
@jwt_required()    
def create_following_rel():
    new_following = Follows_followers_rel(
        author_id = following_user_id['author_id'],
    )

    db.follows_following_rel.add(new_following)
    db.follows_following_rel.commit()
    return jsonify(), 201