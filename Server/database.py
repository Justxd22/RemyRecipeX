from pymongo import MongoClient

def init_db(app):
    client = MongoClient(app.config['MONGO_URI'])
    db = client[app.config['MONGO_DATABASE']]

    print("Database initialized successfully")

    return db
