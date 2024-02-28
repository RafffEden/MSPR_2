import csv
import os
import train as train
from PIL import Image 
from flask import Flask, request, render_template, jsonify, send_from_directory

app = Flask(__name__)

DATA_PATH = "C:/Data"
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

with open('static/infos_especes.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile,delimiter=";")
    for row in reader:
        image_info[row['Espece']] = row['Description']

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
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({'image_url': f'/uploads/{filename}'})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/image_info')
def get_image_info():
    return jsonify(image_info)

if __name__ == '__main__':
    app.run(debug=False)
