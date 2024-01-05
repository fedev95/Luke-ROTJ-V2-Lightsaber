const hum = new Audio('hum.wav');
const swing1 = new Audio('swing-1.wav');
const swing2 = new Audio('swing-2.wav');
const powerOn = new Audio('poweron.wav');
const powerOff = new Audio('poweroff.wav');

const hiltContainer = document.getElementById("hilt-container");
const powerBtn = document.getElementById("power-btn");
const blade = document.getElementById("blade");

let lightsaberOn: boolean = false;
let zoom: boolean = true;

hum.volume = 0.25;
swing1.volume = 0.25;
swing2.volume = 0.25;
powerOn.volume = 0.25;
powerOff.volume = 0.25;

document.addEventListener('click', () => {
  powerBtn?.focus();
});

document.addEventListener('wheel', (event) => {
  if (event.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
});

powerBtn?.addEventListener("click", handleBlade);

function handleBlade() {
  if (lightsaberOn) {
    powerOffSound();
    powerOffBlade();
    lightsaberOn = false;
  } else {
    powerOnSound();
    powerOnBlade();
    lightsaberOn = true;
  }
}

function zoomIn() {
  if (!zoom) {
    zoom = true;
    hiltContainer!.style.height = "100%";
    if (lightsaberOn) {
      swing2.play();
    }
  }
}

function zoomOut() {
  if (zoom) {
    zoom = false;
    hiltContainer!.style.height = "25%";
    if (lightsaberOn) {
      swing1.play();
    }
  }
}

function powerOffSound() {
  powerOff.play();
  hum.pause();
  hum.currentTime = 0;
  powerOn.pause();
  powerOn.currentTime = 0;
}

function powerOnSound() {
  hum.play();
  powerOn.play();
  hum.addEventListener('timeupdate', () => {
    const buffer = 0.7;
    if (hum.currentTime > hum.duration - buffer) {
      hum.currentTime = 0;
      if (lightsaberOn) {
        hum.play();
      }
    }
  });
}

function powerOffBlade() {
  blade!.style.height = "0%";
  blade!.style.visibility = "hidden";
  document.body.style.background = "lightblue";
}

function powerOnBlade() {
  blade!.style.height = "100%";
  blade!.style.visibility = "visible";
  document.body.style.background = "lightgreen";
}