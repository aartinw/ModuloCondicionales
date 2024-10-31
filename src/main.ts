let puntuacion = 0;
let juegoTerminado = false;

const generarNumeroAleatorio = () => Math.floor(Math.random() * 10) + 1;
const generarNumeroCarta = (numeroAleatorio: number) => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }

  return numeroAleatorio;
};
const obtenerUrlCarta = (carta: number) => {
  switch (carta) {
    case 1:
      return "imgs/1_as-copas.jpg";
    case 2:
      return "imgs/2_dos-copas.jpg";
    case 3:
      return "imgs/3_tres-copas.jpg";
    case 4:
      return "imgs/4_cuatro-copas.jpg";
    case 5:
      return "imgs/5_cinco-copas.jpg";
    case 6:
      return "imgs/6_seis-copas.jpg";
    case 7:
      return "imgs/7_siete-copas.jpg";
    case 10:
      return "imgs/10_sota-copas.jpg";
    case 11:
      return "imgs/11_caballo-copas.jpg";
    case 12:
      return "imgs/12_rey-copas.jpg";
    default:
      return "";
  }
};
const mostrarUrlCarta = (urlCarta: string) => {
  const elementoImagen = document.getElementById("imagenCarta");

  if (
    elementoImagen !== null &&
    elementoImagen !== undefined &&
    elementoImagen instanceof HTMLImageElement
  ) {
    elementoImagen.src = urlCarta;
  }
};
const obtenerPuntosCarta = (numeroCarta: number) => {
  if (numeroCarta > 7) {
    return 0.5;
  }

  return numeroCarta;
};

const actualizarPuntuacion = () => {
  const nuevosPuntos = document.getElementById("puntuacionActual");
  if (nuevosPuntos) {
    nuevosPuntos.textContent = `Puntuacion: ${puntuacion}`;
  }
};
const mostrarMensaje = (mensaje: string) => {
  const mensajeElemento = document.getElementById("mensajeFinal");
  if (mensajeElemento) {
    mensajeElemento.textContent = mensaje;
  }
};
const desactivarBotones = () => {
  const botonDameCarta = document.getElementById("dameCarta");
  if (
    botonDameCarta !== null &&
    botonDameCarta !== undefined &&
    botonDameCarta instanceof HTMLButtonElement
  )
    botonDameCarta.disabled = true;
  const botonMePlanto = document.getElementById("mePlanto");
  if (
    botonMePlanto !== null &&
    botonMePlanto !== undefined &&
    botonMePlanto instanceof HTMLButtonElement
  )
    botonMePlanto.disabled = true;
};

const activarBotones = () => {
  const botonDameCarta = document.getElementById("dameCarta");
  if (
    botonDameCarta !== null &&
    botonDameCarta !== undefined &&
    botonDameCarta instanceof HTMLButtonElement
  )
    botonDameCarta.disabled = false;
  const botonMePlanto = document.getElementById("mePlanto");
  if (
    botonMePlanto !== null &&
    botonMePlanto !== undefined &&
    botonMePlanto instanceof HTMLButtonElement
  )
    botonMePlanto.disabled = false;
};
const gestionarPartida = () => {
  if (puntuacion === 7.5) {
    mostrarMensaje("¡Lo has clavado! ¡Enhorabuena!");
    terminarjuego();
  } else if (puntuacion > 7.5) {
    mostrarMensaje("¡Game Over! Has perdido.");
    terminarjuego();
  }
};
const terminarjuego = () => {
  juegoTerminado = true;
  desactivarBotones();
  mostrarBotonReiniciar();
};
const plantarsePartida = () => {
  if (juegoTerminado) return;
  juegoTerminado = true;
  desactivarBotones();

  if (puntuacion < 4) {
    mostrarMensaje("Has sido muy conservador");
  } else if (puntuacion === 5) {
    mostrarMensaje("Te ha entrado el canguelo eh?");
  } else if (puntuacion >= 6 && puntuacion < 7.5) {
    mostrarMensaje("Casi casi...");
  } else if (puntuacion === 7.5) {
    mostrarMensaje("¡Lo has clavado! ¡Enhorabuena!");
  }
  mostrarBotonReiniciar();
};

const dameCarta = () => {
  if (juegoTerminado) return;
  const numeroAleatorio = generarNumeroAleatorio();
  const carta = generarNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(carta);
  mostrarUrlCarta(urlCarta);

  const puntosCarta = obtenerPuntosCarta(carta);
  puntuacion += puntosCarta;

  actualizarPuntuacion();
  gestionarPartida();
};

const mostrarBotonReiniciar = () => {
  const reiniciarContainer = document.getElementById("nuevaPartida");
  if (reiniciarContainer && !document.getElementById("reiniciar")) {
    const botonReiniciar = document.createElement("button");
    botonReiniciar.textContent = "Nueva Partida";
    botonReiniciar.id = "reiniciar";
    botonReiniciar.addEventListener("click", reiniciarJuego);
    reiniciarContainer.appendChild(botonReiniciar);
  }
};

const reiniciarJuego = () => {
  puntuacion = 0;
  juegoTerminado = false;
  actualizarPuntuacion();
  mostrarMensaje(""); // Limpia el mensaje

  const elementoImagen = document.getElementById("imagenCarta");
  if (elementoImagen instanceof HTMLImageElement) {
    elementoImagen.src = "imgs/back.jpg";
  }

  const reiniciarContainer = document.getElementById("nuevaPartida");
  if (reiniciarContainer) {
    reiniciarContainer.innerHTML = ""; // Elimina el botón de reinicio
  }

  activarBotones(); // Activa de nuevo los botones
};

const botonDameCarta = document.getElementById("dameCarta");
if (
  botonDameCarta !== null &&
  botonDameCarta !== undefined &&
  botonDameCarta instanceof HTMLButtonElement
)
  botonDameCarta.addEventListener("click", () => {
    dameCarta();
  });

const botonMePlanto = document.getElementById("mePlanto");
if (
  botonMePlanto !== null &&
  botonMePlanto !== undefined &&
  botonMePlanto instanceof HTMLButtonElement
)
  botonMePlanto.addEventListener("click", () => {
    plantarsePartida();
  });
