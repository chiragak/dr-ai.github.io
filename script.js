const functions = require("firebase-functions");
const fetch = require("node-fetch");

// Replace with your actual Vertex AI model endpoint
const MODEL_ENDPOINT = "https://us-central1-PROJECT_ID.cloud-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID:predict";

exports.classifyImage = functions.https.onRequest(async (req, res) => {
    try {
        const image = req.body.image;

        // Forward the image to your Vertex AI model for classification
        const response = await fetch(MODEL_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({ image: image }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
});
