const imageUpload = document.getElementById('image-upload');
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');
const loader = document.getElementById('loader');

// Construct the Vertex AI endpoint URL
const endpointId = "5043330094236434432";
const region = "us-central1";
const projectId = "YOUR_PROJECT_ID";
const endpointUrl = `https://${region}-${projectId}.cloudai.endpoints.${projectId}.cloud.goog/${endpointId}`;

imageUpload.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];

  if (imageFile) {
    try {
      loader.style.display = 'block';

      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(endpointUrl, {
        method: 'POST',
        body: formData,
      });

      const predictionData = await response.json();
      const predictedClass = predictionData.predictedClass;

      result.textContent = `Predicted class: ${predictedClass}`;
      result.style.color = 'green';
    } catch (error) {
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
