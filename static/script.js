function PredictImage() {
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
        if ('predicted Class' in data) {
            var prediction = data['predicted Class'];
            // Fetch information from CSV based on the predicted class
            fetch(`/image_info/${prediction}`)
                .then(response => response.json())
                .then(info => {
                    var infoTableBody = document.getElementById('info-table-body');
                    var newRow = infoTableBody.insertRow();
                    newRow.innerHTML = `
                        <td>${prediction}</td>
                        <td>${info['Espece']}</td>
                        <td>${info['Description']}</td>
                        <td>${info['Nom latin']}</td>
                        <td>${info['Famille']}</td>
                        <td>${info['Taille']}</td>
                        <td>${info['Région']}</td>
                        <td>${info['Habitat']}</td>
                        <td>${info['Fun fact']}</td>
                    `;
                })
                .catch(error => console.error('Error:', error));
            }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
