from flask import Flask, render_template, request, redirect, url_for,jsonify,send_file, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<filename>')
def download_file(filename):
    return send_from_directory("./",filename)


@app.route('/', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename) 
    

    #return the link of the image and the min and max thickness
    return jsonify(
        filename = uploaded_file.filename,
        min_thickness = 1,
        max_thickness = 2
    )
		
if __name__ == '__main__':
   app.run(debug = True,port=5000)