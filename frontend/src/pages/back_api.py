from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import subprocess
import itertools
import shutil
import random
import glob
import yaml
import csv

app = Flask(__name__)

CORS(app)

all_contain_dir = os.path.join(app.instance_path, 'uploads')
os.makedirs(all_contain_dir, exist_ok=True)

data_save=True
parameter_save=True



@app.route('/prediction',methods=['POST','GET'])
def pred_api():
    
    # model_json = 'https://raw.githubusercontent.com/Aukerul-Shuvo/Text-Generation-/main/models/model.json'
    print(model_json)
    # subprocess.run('pwd')
    subprocess.run(['python', r'C:\Users\BS917\Desktop\project\digital-influencer\src\pages\generate.py'],shell=True)
    # f_data = open('dataset/data.json')
    
    # data_f = json.load(f_data)

    # f_data.close()

    # names=data_f['names']
    # print(names)
    # pred_json={
    #     "model_json": model_json,
    #     "names": names
    # }


    return jsonify("High")


#class names

if __name__ == "__main__":
    app.run(debug=True)