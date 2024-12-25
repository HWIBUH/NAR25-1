from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('forum.html')

@app.route('/submit-url', methods=['GET'])
def submit_url():
    # Here you can process the URL and store it in the database
    # For example, you can print it or save it to a file
    print(request)
    # Return a success message
    # return jsonify({'message': 'URL received successfully', 'url': url})

if __name__ == '__main__':
    app.run(debug=True)