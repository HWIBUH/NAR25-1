from flask import Flask, render_template, request
from database import get_db_connection
app = Flask(__name__)

app.debug = True

@app.route('/')
def index():
    return render_template("test.html")

@app.route('/test', methods=['GET', 'POST'])
def query():
    results = None  
    if request.method == 'POST':
        trainee_numb = request.form.get('trainee_numb')
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to the database!"
        try:
            with connection.cursor() as cursor:
                query = "SELECT * FROM trainee WHERE trainee_numb' = %s"
                cursor.execute(query, (trainee_numb,))
                results = cursor.fetchall() 
        finally:
            connection.close()
    return render_template("test.html", results=results)

if __name__ == '__main__':
    app.run(debug=True)