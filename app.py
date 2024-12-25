from flask import Flask, render_template, request
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
                cursor.execute(query, (trainee_numb,trainee_pass))
                results=cursor.fetchall()
                print(results)
                if(results):
                    return render_template("mainPage.html", results=results)
        finally:
            connection.close()
        return render_template("loginPage.html", results=results, flag=1)

@app.route('/checkForm', methods=['POST'])
def checkForm():
    trainee_numb = request.form.get('trainee_number')
    trainee_nama = request.form.get('trainee_nama')
    trainee_major = request.form.get('trainee_major')
    trainee_binusian = request.form.get('trainee_binusian')
    connection = get_db_connection()
    if connection is None:
        return "Failed to connect to the database!"
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM trainee WHERE trainee_number = %s AND trainee_nama = %s AND trainee_major = %s AND trainee_binusian = %s"
            cursor.execute(query, (trainee_numb,trainee_nama,trainee_major,trainee_binusian))
            results=cursor.fetchall()
            print(results)
            flag=0
            if(results):
                flag=1
                return render_template("mainPage.html", results=results, flag=flag)
    finally:
        connection.close()
    return render_template("mainPage.html", results=results, flag=flag)


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

if __name__ == '__main__':
    app.run(debug=True)