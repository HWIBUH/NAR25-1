import pymysql
from flask import Flask, render_template, request
app = Flask(__name__)

app.debug = True


db_config = {
    'host': 'localhost',
    'user': 'root',  
    'password': '',  
    'database': 'nar251'  
}

def get_db_connection():
    try:
        connection = pymysql.connect(**db_config)
        return connection
    except pymysql.MySQLError as e:
        print("Error connecting to the database:", e)
        return None