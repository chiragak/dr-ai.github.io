const imageUpload = document.getElementById('image-upload');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');
const loader = document.getElementById('loader');

// Construct the Vertex AI endpoint URL
const endpointId = "5043330094236434432"; // Update with your actual endpoint ID
const projectId = "714552415904"; // Update with your actual project ID

imageUpload.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];

  if (imageFile) {
    try {
      loader.style.display = 'block';

      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageBytes = event.target.result.split(',')[1]; // Extract base64-encoded image data

        const requestData = {
          instances: [{ content: imageBytes }],
        };

        const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${gapi.auth.getToken().access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const predictionData = await response.json();
        const predictedClass = predictionData.predictions[0].predictedClass; // Update based on actual response structure

        result.textContent = `Predicted class: ${predictedClass}`;
        result.style.color = 'green';
      };

      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.error('Error making prediction:', error);
      result.textContent = 'Error making prediction';
      result.style.color = 'red';
    } finally {
      loader.style.display = 'none';
    }
  }
});

submitBtn.addEventListener('click', () => {
  // Trigger the file upload event when the "Predict" button is clicked
  imageUpload.click();
});
