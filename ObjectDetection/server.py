
from flask import Flask, request,jsonify
from flask import send_file
import numpy as np
import cv2
from flask import Flask, render_template, Response
from flask_cors import CORS
from gtts import gTTS
# from pydub import AudioSegment
# import imageio as iio
LABELS = open("yolo-coco/coco.names").read().strip().split("\n")
print("[INFO] loading YOLO from disk...")
net = cv2.dnn.readNetFromDarknet("yolo-coco/yolov3.cfg", "yolo-coco/yolov3.weights")
ln = net.getLayerNames()
ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

app = Flask(__name__)
CORS(app)

text_data=[]

@app.route('/get_text', methods=['GET'])

def get_text_data():
    global text_data
    return jsonify(text_data)

def process_image(image_data):
    global text_data
    try:
        # Decode the image
        received_image = cv2.imdecode(np.frombuffer(image_data, dtype=np.uint8), cv2.IMREAD_COLOR)

        # Process the received image
        frame = received_image
        (H, W) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (416, 416), swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)

        boxes = []
        confidences = []
        classIDs = []
        centers = []

                # loop over each of the layer outputs
        for output in layerOutputs:
                # loop over each of the detections
            for detection in output:
                    # extract the class ID and confidence (i.e., probability) of
                    # the current object detection
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                    # filter out weak predictions by ensuring the detected
                    # probability is greater than the minimum probability
                if confidence > 0.5:
                        # scale the bounding box coordinates back relative to the
                        # size of the image, keeping in mind that YOLO actually
                        # returns the center (x, y)-coordinates of the bounding
                        # box followed by the boxes' width and height
                    box = detection[0:4] * np.array([W, H, W, H])
                    (centerX, centerY, width, height) = box.astype("int")

                        # use the center (x, y)-coordinates to derive the top and
                        # and left corner of the bounding box
                    x = int(centerX - (width / 2))
                    y = int(centerY - (height / 2))

                    # update our list of bounding box coordinates, confidences,
                    # and class IDs
                    boxes.append([x, y, int(width), int(height)])
                    confidences.append(float(confidence))
                    classIDs.append(classID)
                    centers.append((centerX, centerY))

                # apply non-maxima suppression to suppress weak, overlapping bounding
                # boxes
        idxs = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.3)
        texts = []
            # ensure at least one detection exists
        if len(idxs) > 0:
                # loop over the indexes we are keeping
            for i in idxs.flatten():
                    # find positions
                centerX, centerY = centers[i][0], centers[i][1]
                if centerX <= W / 3:
                    W_pos = "left "
                elif centerX <= (W / 3 * 2):
                    W_pos = "center "
                else:
                    W_pos = "right "
                if centerY <= H / 3:
                    H_pos = "top "
                elif centerY <= (H / 3 * 2):
                    H_pos = "mid "
                else:
                    H_pos = "bottom "
                texts.append(H_pos + W_pos + LABELS[classIDs[i]])
        print(texts)
        text_data=texts
        if texts:
            description = ', '.join(texts)
            tts = gTTS(description, lang='en', tld="com")
           
            # tts.save('static/tts.mp3')
            # tts = AudioSegment.from_mp3("static/tts.mp3")
            # subprocess.call(["ffplay", "-nodisp", "-autoexit", "static/tts.mp3"])
            
        
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        return 'success'
    except Exception as e:
        return str(e), 500
# print('hi',text1)

@app.route('/process_image', methods=['POST'])
def process_image_route():
    
    try:
        # Receive the image data
        image_data = request.data
        text1 = process_image(image_data)
        
        return text1

        
    except Exception as e:
        return str(e), 500



if __name__ == '__main__':
    app.run(debug=True)