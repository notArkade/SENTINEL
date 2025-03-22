import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
train_data = pd.read_csv("Train_data.csv")

target_column = 'class'  # Define target column

# Identify categorical and numerical columns
categorical_columns = ['protocol_type', 'service', 'flag']
numerical_columns = train_data.select_dtypes(include=['int64', 'float64']).columns.difference([target_column])

# Encode categorical variables
label_encoders = {}
for col in categorical_columns:
    le = LabelEncoder()
    train_data[col] = le.fit_transform(train_data[col])
    label_encoders[col] = le

# Normalize numerical features
scaler = StandardScaler()
train_data[numerical_columns] = scaler.fit_transform(train_data[numerical_columns])

# Encode target variable
target_encoder = LabelEncoder()
train_data[target_column] = target_encoder.fit_transform(train_data[target_column])

# Split data into train and validation sets
X = train_data.drop(columns=[target_column])
y = train_data[target_column]
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Evaluate model
y_pred = rf_model.predict(X_val)
accuracy = accuracy_score(y_val, y_pred)
print("Validation Accuracy:", accuracy)
print("Classification Report:\n", classification_report(y_val, y_pred))

# Save model and preprocessing objects
joblib.dump(rf_model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")
joblib.dump(target_encoder, "target_encoder.pkl")

print("Model and encoders saved successfully!")

from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Predict on validation data
y_pred = rf_model.predict(X_val)

# Print classification report
print(classification_report(y_val, y_pred))

# Plot confusion matrix
cm = confusion_matrix(y_val, y_pred)
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.show()

