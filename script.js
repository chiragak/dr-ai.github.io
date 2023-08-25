
const endpoint = "https://us-central1-PROJECT_ID.cloud-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/us-central1/endpoints/ENDPOINT_ID:predict";

// Load image
function loadImage(event) {
  const image = document.getElementById('selected-image');
  image.src = URL.createObjectURL(event.target.files[0]);
}

// Predict image
async function predictImage() {

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  try {
    
    // Get image
    const image = document.getElementById('image-upload').files[0];

    // Classify image
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [{
          image: {
            imageBytes: image 
          }
        }]
      })
    });

    const data = await response.json();
    const predictedClass = data.predictions[0].displayNames[0];

    // Display result
    displayResult(predictedClass);

  } catch (error) {
    displayError(error); 
  }

  loader.style.display = 'none';

}

// Display result 
function displayResult(className) {
  
  const result = document.getElementById('result');
  result.innerHTML = `Predicted: <strong>${className}</strong>`;
  result.style.color = 'green';

}

// Display error
function displayError(error) {

  const result = document.getElementById('result');
  result.innerHTML = 'Error loading prediction';
  result.style.color = 'red';

}