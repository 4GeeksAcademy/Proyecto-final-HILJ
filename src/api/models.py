from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

db = SQLAlchemy()

class Follows_Followers_Rel(db.Model):
    __tablename__ = 'follows_followers_rel'
    following_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    followed_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)
    
    def serialize(self):
        return {
            'following_user_id': self.following_user_id,
            'followed_user_id': self.followed_user_id,
            'creation_date': self.creation_date,
        }


class User(db.Model):
    __tablename__= 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    description = db.Column(db.String(215), unique=False, nullable=True)
    social_media = db.Column(db.JSON, unique=False, nullable=True)
    profile_image = db.Column(db.String(250), unique=False, nullable=True)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)

    itineraries = db.relationship('Itinerary', back_populates='author')
    comments = db.relationship('Comments', back_populates='author')
    reports = db.relationship('Reports', back_populates='author', foreign_keys='Reports.author_id')
    reported_user_reports = db.relationship('Reports', back_populates='reported_user', foreign_keys='Reports.reported_user_id')
    
    
    followers = db.relationship(
        'User', 
        secondary='follows_followers_rel',
        primaryjoin=(id == Follows_Followers_Rel.followed_user_id),
        secondaryjoin=(id == Follows_Followers_Rel.following_user_id),
        back_populates='following'
    )
    following = db.relationship(
        'User', 
        secondary='follows_followers_rel',
        primaryjoin=(id == Follows_Followers_Rel.following_user_id),
        secondaryjoin=(id == Follows_Followers_Rel.followed_user_id),
        back_populates='followers'
    )
    score = db.relationship('Score', back_populates='author')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "description": self.description,
            "social_media": self.social_media,
            "creation_date": self.creation_date,
            "itinerary": [itinerary.serialize() for itinerary in self.itineraries]
            # do not serialize the password, its a security breach
        }
 
class Itinerary(db.Model):
    __tablename__ = 'itinerary'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(90), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    city = db.Column(db.String(100), unique=False, nullable=False)
    images = db.Column(db.JSON, unique=False, nullable=False)
    itinerary = db.Column(db.JSON, unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    author = db.relationship('User', back_populates='itineraries')
    comments = db.relationship('Comments', back_populates='itinerary')
    tags = db.relationship('Tags', secondary='itinerary_tags_rel', back_populates='itinerary')
    score = db.relationship('Score', back_populates='itinerary')
    

    def __repr__(self):
        return f'<Itinerary {self.title}>'
    
    def serialize_simple(self):
        return {
            'id': self.id,
            'title': self.title
        }
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'duration': self.duration,
            'city': self.city,
            'images': self.images,
            'itinerary': self.itinerary,
            'creation_date': self.creation_date,
            'author': self.author.username,
            'author_id': self.author.id,
            'comments': [comment.serialize() for comment in self.comments],
            'tags': [tag.serialize() for tag in self.tags]
        }
    
class Comments(db.Model):
    __tablename__= 'comments'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    text = db.Column(db.String(250), unique=False, nullable=False)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('itinerary.id'), nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)

    author = db.relationship('User', back_populates='comments')
    itinerary = db.relationship('Itinerary', back_populates='comments')
    reports = db.relationship('Reports', back_populates='comment')  # One-to-many report

    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "text": self.text,
            "itinerary_id": self.itinerary_id,
            "reports": [report.serialize() for report in self.reports]
        }

class Reports(db.Model):
    __tablename__= 'reports'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)
    reported_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)

    comment = db.relationship('Comments', back_populates='reports')  # One-to-many comment
    author = db.relationship('User', back_populates='reports', foreign_keys=[author_id])
    reported_user = db.relationship('User', back_populates='reported_user_reports', foreign_keys=[reported_user_id])

    def __repr__(self):
        return f'<Report {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "reported_user_id": self.reported_user_id,
            "comment_id": self.comment_id,
        }
    
class Itenerary_Tags_Rel(db.Model):
    __tablename__ = 'itinerary_tags_rel'
    itinerary_id = db.Column(db.Integer, db.ForeignKey('itinerary.id'), primary_key=True)
    tags_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)

    def serialize(self):
        return{
            "itinerary_id": self.itinerary_id,
            "tags_id": self.tags_id    
        }

class Tags(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)

    itinerary = db.relationship('Itinerary', secondary='itinerary_tags_rel', back_populates='tags')

    def __repr__(self):
        return f'<Tag {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "itineraries": [itinerary.serialize_simple() for itinerary in self.itineraries]           
        }

class Score(db.Model):
    __tablename__ = 'score'    

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, unique=False, nullable=False)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('itinerary.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)
    
    author = db.relationship('User', back_populates='score')
    itinerary = db.relationship('Itinerary', back_populates='score')

    def __repr__(self):
        return f'<Score {self.number}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "number": self.number,
            "intinerary_id": self.itinerary_id,
            "author_id": self.author_id,
        }
    
class Contacts(db.Model):
    __tablename__= 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=False, nullable=False)
    title = db.Column(db.String(90), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)


    def __repr__(self):
        return f'<Contacts {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "title": self.title,
            "description": self.description,
        }
    