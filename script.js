document.getElementById('upload-button').addEventListener('click', function() {
    const imageInput = document.getElementById('image-input');
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const fileName = encodeURIComponent(file.name);
        const bucketName = 'korals_kova'; // Replace with your actual bucket name

        // Replace 'YOUR_ENDPOINT_TO_GET_SIGNED_URL' with your function's actual URL.
        fetch('https://us-central1-vocal-park-418014.cloudfunctions.net/generate_signed_url', {
            method: 'POST', // Use POST if your endpoint expects it
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bucket: bucketName,
                file: fileName,
                contentType: file.type // Assuming your function uses this to set the Content-Type of the signed URL
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            const signedUrl = data.signedUrl; // Assuming the response contains a signed URL
            // Now upload the file to the signed URL
            fetch(signedUrl, {
                method: 'PUT', // PUT method for uploading the file to the signed URL
                headers: {
                    'Content-Type': 'image/webp' // Set to the file's actual MIME type if different
                },
                body: file
            })
            .then(uploadResponse => {
                if (uploadResponse.ok) {
                    alert('Image uploaded and conversion triggered!');
                } else {
                    throw new Error('Upload failed.');
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error obtaining signed URL.');
        });
    } else {
        alert('Please select a file to upload.');
    }
});
