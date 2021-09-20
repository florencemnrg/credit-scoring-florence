import json
import requests
from flask import request
import pandas as pd

url = 'http://127.0.0.1:5555/predict'
with open('data/sample.json') as f:
    data = json.load(f)

r = requests.post(url, json=data)
print(r.json())