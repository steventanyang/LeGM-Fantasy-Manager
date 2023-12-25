from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Ca123456@localhost/players'

app.config['SECRET_KEY'] = 'lebronjames'

db = SQLAlchemy(app)

# Create Model
# class Users(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(200))
#     email = db.Column()
#     date_added = db.Column()



#members api route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}


if __name__=="__main__":
    app.run(debug=True)
