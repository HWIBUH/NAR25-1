from flask import Flask, render_template, request, redirect, jsonify, url_for
from database import get_db_connection
app = Flask(__name__,static_folder="static")

application = app

results = None

app.debug = True
@app.route('/')
def index():
    global results
    results = None 
    return render_template("loginPage.html")

@app.route('/alarm')
def alarm():
    return render_template("alarm.html")

#================================ BACKEND LOGIN ====================================
@app.route('/login', methods=['GET', 'POST'])
def query():
    global results
    results = None 
    if request.method == 'POST':
        print("HALOOOOOO")
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
                
                if(results):
                    nama=results["trainee_nama"]
                    print(nama)
                    return render_template(
                    "mainPage.html",
                    results=results, trainee_numb=trainee_numb, trainee_nama=nama)            
        finally:
            connection.close()
    return render_template("loginPage.html", results=results, flag=1)

@app.route('/main')
def main():
    results = None  
    return render_template("mainPage.html", results=results)

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

        cursor.execute("SELECT TrainerID, TrainerInitial, TrainerName, TrainerGeneration FROM trainers ORDER BY RAND() LIMIT 1")
        trainer_quiz = cursor.fetchone()


        if random_quiz and trainer_quiz:
            return jsonify({
                    'status': 'success',
                    'data': {
                        'trainee_id': random_quiz["trainee_number"],
                        'trainee_photo': random_quiz["trainee_photo"],
                        'trainer_id' : trainer_quiz["TrainerID"],
                        'trainer_initial' : trainer_quiz["TrainerInitial"],
                        'trainer_name' : trainer_quiz["TrainerName"],
                        'trainer_generation' : trainer_quiz["TrainerGeneration"]
                    },
                })
        else:
            return "No quiz data found."
        
#================================ BACKEND QUIZ ====================================        
@app.route('/checkForm', methods=['POST', 'GET'])
def checkForm():
    trainee_id=request.headers.get("traineeId")
    print("checked")
    trainee_numb = request.form.get('trainee_id')
    trainee_nama = request.form.get('trainee_name')
    trainee_major = request.form.get('trainee_major')
    trainee_binusian = request.form.get('trainee_batch')
    connection = get_db_connection()
    print(trainee_numb)
    print(trainee_nama)
    print(trainee_major)
    print(trainee_binusian)
    print(trainee_id)
    flag=0
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM trainee WHERE trainee_number = %s AND trainee_number = %s AND trainee_nama = %s AND trainee_major = %s AND trainee_binusian = %s"
            cursor.execute(query, (trainee_id, trainee_numb.upper(), trainee_nama.title(), trainee_major,trainee_binusian))
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


# ============================== TRAINER ==========================================
@app.route('/checkFormTrainer', methods=['POST', 'GET'])
def checkFormTrainer():
    trainer_initial = request.headers.get("trainerInitial")
    print("checked")
    input_trainer_initial = request.form.get('input_trainer_initial')
    input_trainer_fullname = request.form.get('input_trainer_fullname')
    input_trainer_generation = request.form.get('input_trainer_generation')
    connection = get_db_connection()
    # print(trainee_numb)
    # print(trainee_nama)
    # print(trainee_major)
    # print(trainee_binusian)
    # print(trainee_id)
    flag=0
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM trainers WHERE TrainerInitial = %s AND TrainerInitial = %s AND TrainerName = %s AND TrainerGeneration = %s;"
            cursor.execute(query, (trainer_initial, input_trainer_initial.upper(), input_trainer_fullname.title(), input_trainer_generation))
            
            results=cursor.fetchall()
            print(query, (trainer_initial, input_trainer_initial.upper(), input_trainer_fullname.title(), input_trainer_generation) )
            if(len(results)>0):
                # print(trainee_numb,trainee_nama,trainee_major,trainee_binusian)
                flag=1
                return jsonify({
                    'status': 'success',
                    'message': 'benar',
                    'data': {
                        'input_trainer_initial': input_trainer_initial,
                        'input_trainer_fullname': input_trainer_fullname,
                        'input_trainer_generation': input_trainer_generation
                    },
                    'flag': flag
                })
    finally:
        connection.close()
    return jsonify({
                        'status': 'success',
                        'message': 'salah',
                        'data': {
                            'input_trainer_initial': input_trainer_initial,
                            'input_trainer_fullname': input_trainer_fullname,
                            'input_trainer_generation': input_trainer_generation
                        },
                        'flag': flag
                    })

#====================================== FORUM ======================================================
#INI T217 BIKIN BIAR BISA DROP DOWN 
@app.route("/forum")
def forum():
    return render_template("forum.html") # nanti ini di ilangin, ganti drop down -T217

#INI BUAT FETCH DATA DR DATA BASE BUAT USER ITU -T217 

@app.route("/forum_todo_api",methods=['GET','POST'])
def forum_todo_api():
    trainee_number_for_forum_api=request.headers.get("traineeNumber")
    connection=get_db_connection()
    print(trainee_number_for_forum_api)
    with connection.cursor() as cursor:
        query="SELECT * FROM forum WHERE trainee_number=%s"
        cursor.execute(query,(trainee_number_for_forum_api))
        result=cursor.fetchall()
        return jsonify({
                        'status': 'success',
                        'message': 'data fetched succesfully',
                        'data': result
                    })
#ini buat automatically assign terendah -T217
def get_lowest():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        # T217 GANTI JADI SESUAI DATABASE NYA WENE
        query = " SELECT trainee_number,COUNT(trainee_number) FROM `forum` WHERE trainee_number IN (SELECT trainee_number FROM trainee) GROUP BY trainee_number ORDER BY COUNT(trainee_number) ASC LIMIT 1;"
        cursor.execute(query)
        result=cursor.fetchall()
        print(result[0]["trainee_number"])
        return result[0]["trainee_number"]


# INI SCRIPT CUMA BUAT ASSIGN ULANG DOANG, DR YANG DI ASSIGN KE YANG DI CUT DI ALOKASI KE YANG MSH ADA (TP TERENDAH)
def forum_assign_ulang():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        query = "SELECT forum_link FROM `forum` WHERE trainee_number NOT IN (SELECT trainee_number FROM trainee) AND trainee_number NOT LIKE '';"
        # query = "SELECT forum_link FROM `forum` WHERE trainee_number NOT IN (SELECT trainee_number FROM trainee) AND trainee_number NOT LIKE 'Q';" , kalo udh diganti ke Q yg quit
        cursor.execute(query)
        result=cursor.fetchall()
        for link in result:
            Tlow=get_lowest()
            query = "UPDATE `forum` SET trainee_number =%s WHERE forum_link=%s"
            cursor.execute(query, (Tlow,link["forum_link"]))
            connection.commit()

#ini routing ke forum add yang nanti ada di drop down
@app.route('/forum_add', methods = ['GET', 'POST'])
def forum_add():
    if request.method == 'POST':
        forum_url = request.form.get('forum_url')
        forum_url = forum_url.split("\r\n")
        input_tnumber = request.form.get('answerer')

        connection = get_db_connection()
        print(forum_url)
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                for i in forum_url:
                    Tlow=get_lowest()
                    query = "INSERT INTO forum (forum_link, trainee_number) VALUES (%s,%s)"
                    cursor.execute(query, (i,Tlow))
                    connection.commit()
        finally:
            connection.close()
        print(f"User input: {forum_url}")
        return render_template("forumAdd.html", forum_url = forum_url, tnumber = input_tnumber)
    
    return render_template("forumAdd.html")


#================================ FORUM API ====================================
@app.route('/api/forum_runquery', methods = ['GET', 'POST'])
def forum_api():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        # T217 GANTI JADI SESUAI DATABASE NYA WENE
        query = "SELECT trainee_number,COUNT(trainee_number) FROM `forum` WHERE answer_status >= 0 GROUP BY trainee_number ORDER BY COUNT(trainee_number) DESC;"
        cursor.execute(query)
        result=cursor.fetchall()
        print(result)
        return jsonify({
                        'status': 'success',
                        'message': 'data fetched succesfully',
                        'data': result
                    })
                
@app.route('/forum_all_api', methods = ['GET', 'POST'])
def forum_list_api():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        # T217 GANTI JADI SESUAI DATABASE NYA WENE
        query = "SELECT * FROM `forum`"
        cursor.execute(query)
        result=cursor.fetchall()
        return jsonify({
                        'status': 'success',
                        'message': 'data fetched succesfully',
                        'data': result
                    })

@app.route('/forum_list')
def forum_list():
    return render_template("forumList.html")

@app.route('/checkTheBoxAPI', methods=['GET'])
def checkTheBox():
    forum_id = int(request.args.get('forum_id'))
    print(request.headers.get('answerStatus'))
    answer_status=int(request.headers.get('answerStatus'))
    print("box is checked at ",forum_id)
    connection = get_db_connection()
    with connection.cursor() as cursor:
        query="UPDATE forum SET answer_status=%s WHERE forum_id=%s"
        cursor.execute(query, (answer_status, forum_id))
        connection.commit()
    return render_template("forumList.html")
    
#================================ ANNOUNCEMENT ====================================

@app.route("/announcement")
def announcement():
    return render_template("announcement.html")

@app.route("/subco")
def subco():
    return render_template("subco.html")

#================================ PROGRESS =======================================
@app.route("/progress")
def progress():
    return render_template("progress.html")

@app.route("/progress_add", methods=['GET', 'POST'])
def progress_add():
    if request.method == 'POST':
        nameOfFeatures = request.form.get('nameOfFeatures').strip()
        featurePoints = request.form.get('featurePoints').strip()
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                query = f"ALTER TABLE progress ADD COLUMN {nameOfFeatures} DECIMAL(10, 2) DEFAULT 0.00"
                cursor.execute(query)
                query = "INSERT INTO feature_points (feature_name, feature_points) VALUES (%s, %s)"
                cursor.execute(query, (nameOfFeatures, featurePoints))
                connection.commit()
                return redirect("/progress")
        finally:
            connection.close()
    return render_template("progress.html")



@app.route("/progress_delete", methods=["DELETE"])
def progress_delete():
    columnToDelete = request.headers.get("deleteColumn")
    connection = get_db_connection()
    
    if connection is None:
        return "Failed to connect to database"
    try:
        with connection.cursor() as cursor:
            print(columnToDelete)
            query = f"ALTER TABLE progress DROP COLUMN {columnToDelete}"
            cursor.execute(query)
            print("Column deleted from progress table")
            
            query = "DELETE FROM feature_points WHERE feature_name = %s"
            cursor.execute(query, (columnToDelete,))
            print("Row deleted from feature_points table")
            
            connection.commit()
        return render_template("progress.html")
    except Exception as e:
        print(f"Error: {e}")
        return "An error occurred while deleting the column and row"
    finally:
        connection.close()

@app.route("/progress_api",methods=['GET', 'POST'] )
def progress_api():
    if request.method == 'GET' or 1==1:
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                query="SELECT * FROM progress"
                cursor.execute(query)
                result=cursor.fetchall()
                print(result)
                return jsonify({"data":result})
        finally:
            connection.commit()
            connection.close()
    return jsonify({"connection":"error"})

@app.route("/checkProgressAPI", methods=['GET', 'POST'])
def check_progress_api():
    if request.method == 'GET':
        answer_status = float(request.headers.get("answerStatus"))  
        dropdown_id = request.headers.get("dropdownId")  
        trainee_number, feature_name = dropdown_id[:4], dropdown_id[4:]
        
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                query = f"UPDATE progress SET {feature_name} = %s WHERE trainee_number = %s"
                cursor.execute(query, (answer_status, trainee_number))
                connection.commit()
        finally:
            connection.close()
        return "Success"

@app.route("/api/progress_runquery", methods=['GET', 'POST'])
def progress_api_run():
    if request.method == 'GET':
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT feature_name, feature_points FROM feature_points")
                feature_data = cursor.fetchall()

                row_sum_parts = []
                for feature in feature_data:
                    feature_name = feature["feature_name"]
                    feature_points = feature["feature_points"]
                    row_sum_parts.append(f"{feature_name} * {feature_points}")
                
                row_sum_expression = " + ".join(row_sum_parts)

                print("idk what is this : ", row_sum_parts)
                print("variable", row_sum_expression)

                query = f"""SELECT *, ({row_sum_expression}) AS RowSum FROM progress ORDER BY RowSum DESC"""
                print(query)
                cursor.execute(query)
                result = cursor.fetchall()
                return jsonify({"data": result})
        finally:
            connection.close()
    return jsonify({"connection": "error"})





#=================================== CASE ========================================
#ini case tinggal dicopas dari progress ya -T207 
#ini bekas copas progress sebelumnya, yang belom ditambahin poin per fitur

@app.route("/case")
def case():
    return render_template("case.html")

@app.route("/case_add", methods=['GET','POST'])
def case_add():
    if request.method == 'POST':
        nameOfFeatures = request.form.get('nameOfFeatures').strip()
        featurePoints = request.form.get('featurePoints').strip()
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                query = f"ALTER TABLE `case` ADD COLUMN {nameOfFeatures} DECIMAL(10, 2) DEFAULT 0.00"
                cursor.execute(query)
                query = "INSERT INTO fp_case (feature_name, feature_points) VALUES (%s, %s)"
                cursor.execute(query, (nameOfFeatures, featurePoints))
                connection.commit()
                return redirect("/case")
        finally:
            connection.close()
    return render_template("case.html")

@app.route("/case_delete", methods=["DELETE"])
def case_delete():
    columnToDelete = request.headers.get("deleteColumn")
    connection = get_db_connection()
    
    if connection is None:
        return "Failed to connect to database"
    try:
        with connection.cursor() as cursor:
            print(columnToDelete)
            query = f"ALTER TABLE `case` DROP COLUMN {columnToDelete}"
            cursor.execute(query)
            print("Column deleted from case table")
            
            query = "DELETE FROM fp_case WHERE feature_name = %s"
            cursor.execute(query, (columnToDelete,))
            print("Row deleted from fp_case table")
            
            connection.commit()
        return render_template("case.html")
    except Exception as e:
        print(f"Error: {e}")
        return "An error occurred while deleting the column and row"
    finally:
        connection.close()

@app.route("/case_api",methods=['GET', 'POST'] )
def case_api():
    if request.method == 'GET' or 1==1:
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                query="SELECT * FROM `case`"
                cursor.execute(query)
                result=cursor.fetchall()
                print(result)
                return jsonify({"data":result})
        finally:
            connection.commit()
            connection.close()
    return jsonify({"connection":"error"})

@app.route("/checkCaseAPI", methods=['GET', 'POST'])
def check_case_api():
    if request.method == 'GET':
        answer_status = float(request.headers.get("answerStatus"))  
        dropdown_id = request.headers.get("dropdownId")  
        trainee_number, feature_name = dropdown_id[:4], dropdown_id[4:]
        
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                query = f"UPDATE `case` SET {feature_name} = %s WHERE trainee_number = %s"
                cursor.execute(query, (answer_status, trainee_number))
                connection.commit()
        finally:
            connection.close()
        return "Success"

@app.route("/api/case_runquery", methods=['GET', 'POST'])
def case_api_run():
    if request.method == 'GET':
        connection = get_db_connection()
        if connection is None:
            return "Failed to connect to database"
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT feature_name, feature_points FROM `fp_case`")
                feature_data = cursor.fetchall()

                row_sum_parts = []
                for feature in feature_data:
                    feature_name = feature["feature_name"]
                    feature_points = feature["feature_points"]
                    row_sum_parts.append(f"{feature_name} * {feature_points}")
                
                row_sum_expression = " + ".join(row_sum_parts)

                print("idk what is this : ", row_sum_parts)
                print("variable", row_sum_expression)

                query = f"""SELECT *, ({row_sum_expression}) AS RowSum FROM `case` ORDER BY RowSum DESC"""
                cursor.execute(query)
                result = cursor.fetchall()
                return jsonify({"data": result})
        finally:
            connection.close()
    return jsonify({"connection": "error"})


#================================ LEADERBOARD ====================================

@app.route("/leaderboard")
def leaderboard():
    print("ke leader board")
    return render_template("leaderboard.html")

@app.route("/leaderboard_progress")
def leaderboard_progress():
    print("ke leader board")
    return render_template("leaderboardProgress.html")

@app.route("/lb_case")
def leaderboard_case():
    print("ke lb case")
    return render_template("leaderboardCase.html")

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


#=============================== input announcement
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
    return redirect("/announcement")

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

@app.route("/api/delete_announcement/<int:announcement_id>", methods=["DELETE"])
def delete_announcement(announcement_id):
    print(announcement_id)
    connection = get_db_connection()
    if connection is None:
        return jsonify({"success": False, "message": "Failed to connect to the database!"}), 500
    try:
        with connection.cursor() as cursor:
            query = "DELETE FROM announcement WHERE announcement_id = %s"
            cursor.execute(query, (announcement_id,))
            connection.commit()
    finally:
        connection.close()
    return jsonify({"success": True, "message": "Announcement deleted successfully!"})

@app.route('/api/subco', methods=['GET'])
def get_subco():
    print("AAAAA")
    connection = get_db_connection()
    if connection is None:
         return jsonify({"success": False, "message": "Failed to connect to the database!"}), 500
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM subco ORDER BY RAND() LIMIT 1;"
            cursor.execute(query)
            question = cursor.fetchall()
            print("AAAAa")
            # if question is None:
            #     return "Tidak ada pertanyaan"
            
            # cursor.execute("SELECT * FROM subco WHERE subco_id = %d;", (question[0]))
            # questionall = cursor.fetchone() 

            return jsonify(question)
    finally:
        connection.close()

# =====================================Register====================================================
@app.route("/register")
def register():
    return render_template("registerPage.html")


@app.route("/send_input_register", methods=["POST"])
def send_input_register():
    username = request.form.get("username")
    tnum = request.form.get("name")
    password = request.form.get("password")
    confirm = request.form.get("password-con")
    if(password != confirm):
        return register()
    
    connection = get_db_connection()
    if connection is None:
        return "Failed to connect to the database!"
    if password != confirm:
        return "Password beda sama Confirm Password"
    try: 
        with connection.cursor() as cursor:
            query = "SELECT * FROM trainee WHERE trainee_number = %s AND trainee_pass = %s AND trainee_nama = %s"
            query = "INSERT INTO trainee (trainee_number, trainee_pass, trainee_nama) VALUES (%s, %s, %s)"
            cursor.execute(query, (username, password, tnum))
            connection.commit()
    
    finally:
        connection.close()
    
    return redirect("/login")

if __name__ == '__main__':
    # forum_assign_ulang()
    app.run(debug=True)