// Get your API key from Vertex AI API & Services dashboard 
const API_KEY = 'AIzaSyB0zoeUGQ2ZYwfld09AeC3JF-0p9PAzSAc'; 

// Construct the endpoint URL
const MODEL_ENDPOINT = "https://us-central1-PROJECT_ID.cloud-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID:predict";

// Authentication headers 
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// Image data to send
const imageData = {
  b64: '<Base64 encoded image>' 
};

// Make prediction request
const response = await fetch(MODEL_ENDPOINT, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({instances: [imageData]})
});

// Parse response
const data = await response.json();
const prediction = data.predictions[0];