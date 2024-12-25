import pymysql

def get_db_connection():
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='',
            database='nar251',
            cursorclass=pymysql.cursors.DictCursor  
        )  
        return connection  
    except pymysql.MySQLError as e:
        print("Error connecting to the database:", e)
        return None
