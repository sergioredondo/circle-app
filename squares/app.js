let squareSmall = document.getElementById("square-small");
let squareGuide = document.getElementById("square-guide");
let squareLarge = document.getElementById("square-large");

let centered = false;

// Posiciones iniciales del cuadrado pequeño
let posX = window.innerWidth / 2 - squareSmall.offsetWidth / 2;
let posY = window.innerHeight / 2 - squareSmall.offsetHeight / 2;

// Sensibilidad ajustada para un movimiento más suave
const sensitivityX = 15;
const sensitivityY = 20;

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    if (centered) return;  // Si ya está centrado, no hacemos nada

    let x = event.gamma;  // Inclinación de lado a lado
    let y = event.beta;   // Inclinación adelante-atrás

    // Ajuste del movimiento basados en la inclinación y la sensibilidad
    let moveX = (x / sensitivityX) * (window.innerWidth - squareSmall.offsetWidth);
    let moveY = (y / sensitivityY) * (window.innerHeight - squareSmall.offsetHeight);

    // Actualizamos la posición del cuadrado pequeño
    posX += moveX;
    posY += moveY;

    // Limitar para que no salga fuera de la pantalla
    posX = Math.max(0, Math.min(window.innerWidth - squareSmall.offsetWidth, posX));
    posY = Math.max(0, Math.min(window.innerHeight - squareSmall.offsetHeight, posY));

    squareSmall.style.left = `${posX}px`;
    squareSmall.style.top = `${posY}px`;

    checkIfCentered();
}

function checkIfCentered() {
    let smallBounds = squareSmall.getBoundingClientRect();
    let guideBounds = squareGuide.getBoundingClientRect();

    // Verificamos si el cuadrado pequeño está dentro del cuadrado guía
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