function uploadImage() {
    var formData = new FormData();
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Upload failed.');
        }
        return response.json();
    })
    .then(data => {
        var imageUrl = data['image_url'];
        var imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image">`;
        
        // Show image info
        var imageInfoDiv = document.getElementById('image-info');
        imageInfoDiv.style.display = 'block';
        
        // Fetch information from CSV
        fetch('/image_info')
            .then(response => response.text()) // Fetch as text
            .then(text => {
                // Split text into lines
                var lines = text.split('\n');
                // Select the second line (after the header)
                var secondLine = lines[1];
                // Display the second line as description
                var descriptionElement = document.getElementById('description');
                descriptionElement.textContent = secondLine;
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
