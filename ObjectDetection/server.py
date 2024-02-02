from flask import Flask, request,jsonify
from flask import send_file
import numpy as np
from flask_cors import CORS
import cv2

# Read the image file as binary data
with open("ObjectDetection\dog.jpg", "rb") as file:

    image_data = file.read()

LABELS = open("ObjectDetection/yolo-coco/coco.names").read().strip().split("\n")
print("[INFO] loading YOLO from disk...")
net = cv2.dnn.readNetFromDarknet("ObjectDetection/yolo-coco/yolov3.cfg", "yolo-coco/yolov3.weights")
ln = net.getLayerNames()
ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

app = Flask(__name__)
CORS(app)

text_data = []

@app.route('/')
def fun():
    return 'Hello World!'

# Function to process an image and perform object detection
def process_image(image_data):
    
    
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

        # Loop over each of the layer outputs
        for output in layerOutputs:
            # Loop over each of the detections
            for detection in output:
                # Extract the class ID and confidence of the current object detection
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                if confidence > 0.5:

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

if __name__ == '__main__':
    app.run(debug=True)
