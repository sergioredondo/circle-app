let squareSmall = document.getElementById("square-small");
let squareGuide = document.getElementById("square-guide");
let squareLarge = document.getElementById("square-large");

let centered = false;

// Ajustamos la sensibilidad
const sensitivityX = 20;  // Reducimos la escala en el eje X
const sensitivityY = 40;  // Reducimos la escala en el eje Y

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    if (centered) return;  // No hacemos nada si el cuadrado ya está centrado

    let x = event.gamma; // Inclinación de lado a lado
    let y = event.beta;  // Inclinación adelante-atrás

    // Limitar el rango de valores de inclinación para evitar movimientos extremos
    if (x > 45) x = 45;
    if (x < -45) x = -45;
    if (y > 45) y = 45;
    if (y < -45) y = -45;

    // Ajustamos el movimiento en función de la sensibilidad
    let moveX = (x / sensitivityX) * (window.innerWidth - squareSmall.offsetWidth);
    let moveY = (y / sensitivityY) * (window.innerHeight - squareSmall.offsetHeight);

    // Posicionar el cuadrado pequeño
    squareSmall.style.left = `${50 + moveX}px`;
    squareSmall.style.top = `${50 + moveY}px`;

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