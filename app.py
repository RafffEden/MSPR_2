import csv
import pandas as pd
import os
from utillc import *
import static.train as train
from PIL import Image 
from flask import Flask, request, render_template, jsonify, send_from_directory
from dotenv import dotenv_values

app = Flask(__name__)
config = dotenv_values(".env")
DATA_PATH = config["DATA_PATH"]
UPLOAD_FOLDER = config["UPLOAD_FOLDER"]
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
SSL_CERT = config["CERT_CLIENT"]
SSL_KEY = config["CERT_SECRET"]

# Load image information from CSV file
image_info = {}

# Load the models to make the prediction 
# class Modele :
#     def __init__(self,gd,train_dir=None) -> None:
#         self.no_image = 0
#         self.gd = gd
#         v = self.vegetable = train.Vegetable(gd, use_gpu=True, model_name="resnet50", train_dir=train_dir)
#         self.model = model = v.test(measure=False, disp=False, epoch=298)
#         model.eval()
#         v.predict(model, Image.open('brocoli.jpg'))
#         os.makedirs( os.path.join(".", "tests"), exist_ok=True)
#         self.requests = 0
vegetable = train.Vegetable(gd= DATA_PATH,use_gpu= False,model_name= "resnet50")
# modele = vegetable.test(measure=False, disp=False, epoch=298)

info = pd.read_csv("static/infos_especes.csv",delimiter=";")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    # Save the uploaded file
    filename = 'uploaded_image.png'
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename) 
    file.save(img_path)
    label, _ ,prob = vegetable.predict(Image.open(img_path))
    return jsonify({'image_url': f'/uploads/{filename}','predicted Class': f'{label}','predicted prob':f'{prob}'  })

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/image_info/<prediction>')
def get_image_info(prediction):
    # Fetch information based on the prediction
    if (info["Espece"] == prediction).any() :
        EKOX(info[info["Espece"] == prediction])
        json_info = info[info["Espece"] == prediction].to_dict(orient = "records")
        EKOX(json_info)
        return jsonify(json_info[0])
    else:
        return jsonify({'error': 'Prediction not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0',port= 443,debug=False,ssl_context= (SSL_CERT,SSL_KEY))
