from flask import Flask, render_template, request, url_for, jsonify
from database import get_db_connection
app = Flask(__name__,static_folder="static")

app.debug = True

@app.route('/')
def index():
    return render_template("loginPage.html")

@app.route('/alarm')
def alarm():
    return render_template("alarm.html")

@app.route('/login', methods=['GET', 'POST'])
def query():
    results = None  
    if request.method == 'POST':
        trainee_numb = request.form.get('trainee_number')
        trainee_pass = request.form.get('trainee_pass')
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to the database!"
        try:
            with connection.cursor() as cursor:
                query = "SELECT * FROM trainee WHERE trainee_number = %s AND trainee_pass = %s"
                cursor.execute(query, (trainee_numb, trainee_pass))
                results = cursor.fetchone()
                print(results)
                
                if results:
                    cursor.execute("SELECT trainee_number, trainee_photo FROM quiz ORDER BY RAND() LIMIT 1")
                    random_quiz = cursor.fetchone()
                    if random_quiz:
    
                        return render_template(
                            "mainPage.html",
                            results=results,
                            quiz_trainee_number=random_quiz['trainee_number'],
                            quiz_trainee_photo=random_quiz['trainee_photo']
                        )
                    else:
                        return "No quiz data found."
        finally:
            connection.close()
    return render_template("loginPage.html", results=results, flag=1)

@app.route('/checkForm', methods=['POST', 'GET'])
def checkForm():
    print("checked")
    trainee_numb = request.form.get('trainee_id')
    trainee_nama = request.form.get('trainee_name')
    trainee_major = request.form.get('trainee_major')
    trainee_binusian = request.form.get('trainee_batch')
    connection = get_db_connection()
    flag=0
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM trainee WHERE trainee_number = %s AND trainee_nama = %s AND trainee_major = %s AND trainee_binusian = %s"
            cursor.execute(query, (trainee_numb.upper(),trainee_nama.title(),trainee_major,trainee_binusian))
            results=cursor.fetchall()
            print(results)
            if(len(results)>0):
                print(trainee_numb,trainee_nama,trainee_major,trainee_binusian)
                flag=1
                return jsonify({
                    'status': 'success',
                    'message': 'Form processed successfully!',
                    'data': {
                        'trainee_id': trainee_numb,
                        'trainee_name': trainee_nama,
                        'trainee_major': trainee_major,
                        'trainee_batch': trainee_binusian
                    },
                    'flag': flag
                })
    finally:
        connection.close()
    return jsonify({
                        'status': 'success',
                        'message': 'Form processed successfully!',
                        'data': {
                            'trainee_id': trainee_numb,
                            'trainee_name': trainee_nama,
                            'trainee_major': trainee_major,
                            'trainee_batch': trainee_binusian
                        },
                        'flag': flag
                    })

@app.route('/forum')
def forum():
    return render_template("forum.html")

@app.route("/announcement")
def announcement():
    return render_template("announcement.html")

@app.route("/subco")
def subco():
    return render_template("subco.html")

@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")

@app.route("/gallery")
def gallery():
    connection = get_db_connection()
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT trainee_number, trainee_photo FROM quiz")
            rows = cursor.fetchall()
            trainee_data = [dict(row) for row in rows]
    finally:
        connection.close()

    return render_template("gallery.html", trainee_data=trainee_data)

if __name__ == '__main__':
    app.run(debug=True)