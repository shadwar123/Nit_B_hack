from flask import Flask, request,jsonify
from flask import send_file
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)







if __name__ == '__main__':
    app.run(debug=True)