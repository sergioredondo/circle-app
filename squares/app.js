let squareSmall = document.getElementById("square-small");
let squareGuide = document.getElementById("square-guide");
let squareLarge = document.getElementById("square-large");

let guideBounds = squareGuide.getBoundingClientRect();
let smallBounds = squareSmall.getBoundingClientRect();

// Variable para manejar el estado del juego
let centered = false;

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    if (centered) return; // Si ya está centrado, no hacemos nada

    let x = event.gamma; // Inclinación de lado a lado
    let y = event.beta;  // Inclinación de adelante hacia atrás

    // Ajustar los límites para mover el cuadrado pequeño
    let maxX = window.innerWidth - smallBounds.width;
    let maxY = window.innerHeight - smallBounds.height;

    let moveX = (x / 90) * maxX;
    let moveY = (y / 180) * maxY;

    squareSmall.style.left = `${moveX}px`;
    squareSmall.style.top = `${moveY}px`;

    checkIfCentered();
}

function checkIfCentered() {
    let smallBounds = squareSmall.getBoundingClientRect();
    let guideBounds = squareGuide.getBoundingClientRect();

    // Verifica si el cuadrado pequeño está centrado con el guía
    if (
        smallBounds.left > guideBounds.left - 5 && 
        smallBounds.right < guideBounds.right + 5 &&
        smallBounds.top > guideBounds.top - 5 && 
        smallBounds.bottom < guideBounds.bottom + 5
    ) {
        centered = true;
        changeColorToGreen();
        showFireworks();
    }
}

function changeColorToGreen() {
    squareSmall.style.borderColor = "green";
    squareLarge.style.borderColor = "green";
}

function showFireworks() {
    for (let i = 0; i < 20; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = `${Math.random() * window.innerWidth}px`;
        firework.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}