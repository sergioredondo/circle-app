// Variables para obtener los círculos
const circleSmall = document.getElementById('circle-small');
const gameArea = document.getElementById('game-area');

// Variables para rastrear el movimiento
let positionX = 0;
let positionY = 0;
let speedFactor = 1; // Ajusta la velocidad de respuesta del movimiento

// Dimensiones del área de juego
const gameAreaWidth = gameArea.offsetWidth;
const gameAreaHeight = gameArea.offsetHeight;

// Tamaño del círculo grande (para los límites del juego)
const circleLargeRadius = document.getElementById('circle-large').offsetWidth / 2;

// Tamaño del círculo pequeño (necesario para ajustarlo al centro del círculo grande)
const circleSmallRadius = circleSmall.offsetWidth / 2;

// Función para detectar el movimiento del dispositivo
function handleMotion(event) {
    // Aceleración en el eje X e Y (ajustada según el dispositivo)
    let accelX = event.accelerationIncludingGravity.x;
    let accelY = event.accelerationIncludingGravity.y;

    // Ajustamos el movimiento del círculo pequeño
    positionX += accelX * speedFactor;
    positionY += accelY * speedFactor;

    // Limitar el movimiento dentro del área de juego
    let maxX = gameAreaWidth / 2 - circleLargeRadius + circleSmallRadius;
    let maxY = gameAreaHeight / 2 - circleLargeRadius + circleSmallRadius;

    positionX = Math.max(-maxX, Math.min(maxX, positionX));
    positionY = Math.max(-maxY, Math.min(maxY, positionY));

    // Mover el círculo pequeño en la pantalla
    circleSmall.style.transform = `translate(${positionX}px, ${positionY}px)`;

    // Verificar si el círculo pequeño está en el centro del círculo guía
    let distanceX = Math.abs(positionX);
    let distanceY = Math.abs(positionY);

    // Definir un rango mayor para la detección de centrado
    let threshold = 10; // Ampliamos el rango de detección

    if (distanceX < threshold && distanceY < threshold) {
        // Cambiar ambos círculos a color verde
        circleLarge.style.animation = 'success-color-change 1s forwards';
        circleSmall.style.animation = 'success-color-change 1s forwards';

        // Mostrar fuegos artificiales en el centro del círculo grande
        createFireworks(gameAreaWidth / 2, gameAreaHeight / 2);
    }
}

// Escuchar el movimiento del acelerómetro
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleMotion, true);
} else {
    alert("Tu dispositivo no soporta el acelerómetro.");
}

// Función para generar fuegos artificiales
function createFireworks(x, y) {
    for (let i = 0; i < 10; i++) {
        let firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${x + (Math.random() * 100) - 50}px`;
        firework.style.top = `${y + (Math.random() * 100) - 50}px`;
        gameArea.appendChild(firework);

        // Eliminar los fuegos artificiales después de la animación
        setTimeout(() => {
            firework.remove();
        }, 800);
    }
}

