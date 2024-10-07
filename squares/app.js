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

    // Ajustamos la sensibilidad para que pequeños movimientos se traduzcan en grandes cambios
    let sensitivityX = 1;  // Aumenta la sensibilidad del eje X
    let sensitivityY = 1;  // Aumenta la sensibilidad del eje Y (más controlado)

    // Calcular nuevos valores de movimiento basados en la sensibilidad
    let moveX = window.innerWidth / 2 + (x * sensitivityX);
    let moveY = window.innerHeight / 2 + (y * sensitivityY);

    // Limitar el movimiento dentro del área visible
    moveX = Math.min(window.innerWidth - smallBounds.width, Math.max(0, moveX));
    moveY = Math.min(window.innerHeight - smallBounds.height, Math.max(0, moveY));

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
        let firework = document.createElement