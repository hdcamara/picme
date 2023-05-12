'use strict';

//Get the video element from the HTML file
const video = document.getElementById('video');

//Get the canvas element from the HTML file
const canvas = document.getElementById('canvas');

//Get the "Take Picture" button element from the HTML file
const takePictureButton = document.getElementById('take-picture');

//Get the "Save Picture" button element from the HTML file
const savePictureButton = document.getElementById('save-picture');

//Check if the browser supports the getUserMedia API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        // Set the video element's source to the video stream
        video.srcObject = stream;
    })
    .catch(error => {
        console.error(error);
    });
        
} else {
    console.error('getUserMedia is not supported in this browser.');
}

takePictureButton.addEventListener('click', () =>{
    canvas.width = video.videoWidth;
    canvas.heigth = video.videoHeigth;

    canvas.getContext('2d').drawImage(video, 0,0);
    
    const img = new Image();
    img.src = canvas.toDataURL();

    document.body.appendChild(img);

    savePictureButton.style.display = 'block';
})

    savePictureButton.addEventListener('click' , () => {

        const dataURL = canvas.toDataURL();

        const link = document.createElement('a');

        link.href = dataURL;

        link.download = 'webcam.png';
        link.click();


    })
