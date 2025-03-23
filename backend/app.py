from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS
from flask_cors import cross_origin

# ----- Initialize Flask app
app = Flask(__name__)
CORS(app)

# ----- Load trained model and encoders
rf_model = joblib.load("model.pkl") 
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")
target_encoder = joblib.load("target_encoder.pkl")

@app.route('/threat', methods=['POST'])
@cross_origin()
def predict():
    try:
        data = request.json  # ----- Get JSON input
        input_features = []

        # ----- Encode categorical features
        for col in label_encoders.keys():
            if data[col] in label_encoders[col].classes_:
                input_features.append(label_encoders[col].transform([data[col]])[0])
            else:
                input_features.append(-1)  # ----- Assign unknown category

        # ----- Extract numerical values
        numerical_values = [data.get(col, 0) for col in scaler.feature_names_in_]
        numerical_values = np.array(numerical_values).reshape(1, -1)
        numerical_values = scaler.transform(numerical_values)  # ----- Normalize

        # ----- Combine features
        input_features = np.hstack([input_features, numerical_values[0]])
        input_features = input_features.reshape(1, -1)

        # ----- Make prediction
        prediction = rf_model.predict(input_features)[0]
        result = target_encoder.inverse_transform([prediction])[0]

        return jsonify({"intrusion_detected": result})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
