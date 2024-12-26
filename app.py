from flask import Flask, render_template, request, redirect, jsonify, url_for
from database import get_db_connection
app = Flask(__name__,static_folder="static")

app.debug = True
@app.route('/')
def index():
    return render_template("loginPage.html")

@app.route('/alarm')
def alarm():
    return render_template("alarm.html")

#================================ BACKEND LOGIN ====================================
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
                if(results):
                    return render_template(
                    "mainPage.html",
                    results=results)            
        finally:
            connection.close()
    return render_template("loginPage.html", results=results, flag=1)

#================================ BACKEND RANDOMIZE FOR QUIZ ====================================
trainee_id=""

@app.route('/randomize',methods=['GET', 'POST'] )
def randomize():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT trainee_number, trainee_photo FROM quiz ORDER BY RAND() LIMIT 1")
        random_quiz = cursor.fetchone()
        print(random_quiz["trainee_number"])
        global trainee_id
        trainee_id=random_quiz["trainee_number"]
        if random_quiz:
            return jsonify({
                    'status': 'success',
                    'data': {
                        'trainee_id': random_quiz["trainee_number"],
                        'trainee_photo': random_quiz["trainee_photo"],
                    },
                })
        else:
            return "No quiz data found."
@app.route('/checkForm', methods=['POST', 'GET'])

#================================ BACKEND QUIZ ====================================
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
            query = "SELECT * FROM trainee WHERE trainee_number = %s AND trainee_number = %s AND trainee_nama = %s AND trainee_major = %s AND trainee_binusian = %s"
            cursor.execute(query, (trainee_id,trainee_numb.upper(),trainee_nama.title(),trainee_major,trainee_binusian))
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

#====================================== FORUM ======================================================
@app.route('/forum', methods = ['GET', 'POST'])
def forum():
    if request.method == 'POST':
        forum_url = request.form.get('forum_url')
        input_tnumber = request.form.get('answerer')

        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                if input_tnumber:
                    query = "INSERT INTO forum (url, answered, respondent) VALUES (%s, True, %s)"
                    cursor.execute(query, (forum_url, input_tnumber.upper()))
                else:
                    query = "INSERT INTO forum (url) VALUES (%s)"
                    cursor.execute(query, (forum_url))
        finally:
            connection.commit()
            connection.close()
        print(f"User input: {forum_url}")
        return render_template("forum.html", forum_url = forum_url, tnumber = input_tnumber)
    
    return render_template("forum.html")

@app.route('/forum_assignment', methods = ['GET', 'POST'])
def forum_assignment():
    return render_template("forum_assign.html")

#================================ ANNOUNCEMENT ====================================

@app.route("/announcement")
def announcement():
    return render_template("announcement.html")

@app.route("/subco")
def subco():
    return render_template("subco.html")

@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")

#================================ GALERY ====================================
@app.route("/gallery")
def gallery():
    connection = get_db_connection()
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT q.trainee_number, trainee_nama, trainee_binusian, trainee_major, trainee_photo FROM quiz q JOIN trainee tr ON tr.trainee_number = q.trainee_number")
            rows_trainee = cursor.fetchall()
            trainee_data = [dict(row) for row in rows_trainee]

            cursor.execute("SELECT TrainerInitial, TrainerName, TrainerGeneration FROM trainers")
            rows_trainer = cursor.fetchall()
            trainer_data = [dict(row) for row in rows_trainer]
    finally:
        connection.close()

    return render_template("gallery.html", trainee_data=trainee_data, trainer_data=trainer_data)

@app.route("/input_announcement")
def input_announcement():
    return render_template("inputAnnouncement.html")

@app.route("/send_input_announcement", methods=["POST"])
def send_input_announcement():
    title = request.form.get('announcement_title')
    content = request.form.get('announcement_content')
    deadline = request.form.get('announcement_deadline')
    connection = get_db_connection()
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            query = "INSERT INTO announcement (announcement_title, announcement_content, announcement_deadline) VALUES (%s, %s, %s)"
            cursor.execute(query, (title, content, deadline))
            connection.commit() 
    finally:
        connection.close()

@app.route('/api/announcement', methods=['GET'])
def get_announcement():
    connection = get_db_connection()
    if connection is None:
         return jsonify({"success": False, "message": "Failed to connect to the database!"}), 500
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM announcement"
            cursor.execute(query)
            announcement = cursor.fetchall()
            return jsonify(announcement)
    finally:
        connection.close()

@app.route("/delete_announcement")
def delete_announcement():
    announcement_id = request.form.get('announcement_id')
    connection = get_db_connection()
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            query = "DELETE FROM announcements WHERE id = %d"
            cursor.execute(query, (announcement_id,))
            connection.commit()
    finally:
        connection.close()
    return redirect("/announcement")

if __name__ == '__main__':
    app.run(debug=True)