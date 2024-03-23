document.getElementById('upload-button').addEventListener('click', function() {
    const imageInput = document.getElementById('image-input');
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        // Generate a signed URL for secure upload. This URL should be obtained from your server.
        // This part is pseudo-code and needs to be replaced with your actual implementation.
        fetch('YOUR_ENDPOINT_TO_GET_SIGNED_URL', {
            method: 'GET', // Or POST, depending on your endpoint
            // Additional headers or body might be required depending on your implementation
        })
        .then(response => response.json())
        .then(data => {
            const signedUrl = data.signedUrl; // Assuming the response contains a signed URL
            // Now upload the file to the signed URL
            fetch(signedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/webp'
                },
                body: file
            })
            .then(response => {
                if (response.ok) {
                    alert('Image uploaded and conversion triggered!');
                } else {
                    alert('Failed to upload image.');
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
