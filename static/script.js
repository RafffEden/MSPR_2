function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Create a video element to display the camera feed
            var videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.autoplay = true;
            videoElement.id = 'camera-capture';
            var startCameraButton = document.querySelector('button[type="button"][onclick="startCamera()"]');
            startCameraButton.parentElement.insertBefore(videoElement, startCameraButton);
        
        })
        .catch(function(err) {
            console.error('Error accessing camera:', err);
        });
}


function Capture() {
    var videoElement = document.getElementById('camera-capture');
    if (!videoElement) {
        console.error('Camera not started.');
        return;
    }

    // Create a canvas element to capture the image
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    var imageDataURL = canvas.toDataURL('image/jpeg'); // Convert captured image to data URL

    // Convert base64 image data to a Blob object
    var byteString = atob(imageDataURL.split(',')[1]);
    var mimeString = imageDataURL.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    // Append image data Blob to FormData
    var formData = new FormData();
    formData.append('file', blob, 'image_from_camera.png');
    
    // Call the function to handle the image data
    Predict(formData);
}

function sendFileInput() {
    var formData = new FormData();
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    
    if (file) {
        formData.append('file', file);
        Predict(formData);
    } else {
        console.error('No file selected.');
    }
}

function Predict(formData){
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
