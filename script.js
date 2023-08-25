const imageUpload = document.getElementById('image-upload'); 
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');
const loader = document.getElementById('loader');

// Vertex AI endpoint
const endpoint = 'https://[ENDPOINT]';

// Handle image upload
imageUpload.addEventListener('change', (e) => {
  // Upload code
});

// Handle form submit
submitBtn.addEventListener('click', async () => {

  // Show loader
  loader.style.display = 'block';

  try {

    // Get image file
    const imageFile = imageUpload.files[0];

    // Send POST request to Vertex AI
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [
          {
            image: {
              imageBytes: imageFile 
            }
          }
        ]  
      })
    });

    // Parse prediction response
    const data = await response.json();
    const predictedClass = data.predictions[0].displayNames[0];

    // Display result  
    result.textContent = `Predicted class: ${predictedClass}`;
    result.style.color = 'green';
  
  } catch (error) {
    // Handle error
    result.textContent = 'Error making prediction';
    result.style.color = 'red';
  }

  // Hide loader
  loader.style.display = 'none';

});