document.getElementById('upload').addEventListener('change', handleFileSelect, false);

const asciiChars = ' %#*+=-:. '; // Characters used for ASCII art

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            processImage(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function processImage(img) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image on the canvas
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let asciiArt = '';

    for (let y = 0; y < canvas.height; y += 8) { // Adjust step size for desired resolution
        for (let x = 0; x < canvas.width; x += 4) { // Adjust step size for desired resolution
            const i = (y * canvas.width + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const brightness = (r + g + b) / 3;
            const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            asciiArt += asciiChars[charIndex];
        }
        asciiArt += '\n';
    }
    document.getElementById('ascii-art').textContent = asciiArt;
}
