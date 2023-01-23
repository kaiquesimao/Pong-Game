//sons do jogo
let raquetada;
let ponto;
let trilhasonora;

// variáveis da bolinha
let xBolinha = 200;
let yBolinha = 200;
let dBolinha = 30;
let raioBolinha = dBolinha / 2;

//velocidade da bolinha
let velocidadeXbolinha = 5;
let velocidadeYbolinha = 5;

//variaveis da raquete
let xRaquete = 8;
let yRaquete = 150;
let larguraRaquete = 13;
let alturaRaquete = 100;

//variaveis raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let larguraRaqueteOponente = 13;
let alturaRaqueteOponente = 100;
let movimentoYraqueteOponente;

//variaveis de colisao da bolinha
let colidiu = false;

//variavel do erro
let chanceDeErrar = 0;

//variaveis do placar do jogo
let meuPlacar = 0;
let placarOponente = 0;

function setup() {
  createCanvas(600, 400);
  userStartAudio(trilha.loop());
}

function draw() {
  background(0);
  bolinha();
  movimentoBolinha();
  colisaoBorda();
  minhaRaquete();
  raqueteOponente();
  movimentoRaquete();
  colisaoMinhaRaquete();
  colisaoRaqueteOponente();
  movimentoRaqueteOponente();
  placar();
  marcarPonto();
  calculaChanceDeErrar();
}

function bolinha() {
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentoBolinha() {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function colisaoBorda() {
  if (xBolinha + raioBolinha > width || xBolinha - raioBolinha < 0) {
    velocidadeXbolinha *= -1;
  }

  if (yBolinha + raioBolinha > height || yBolinha - raioBolinha < 0) {
    velocidadeYbolinha *= -1;
  }
}

function minhaRaquete() {
  rect(xRaquete, yRaquete, larguraRaquete, alturaRaquete);
}

function raqueteOponente() {
  rect(
    xRaqueteOponente,
    yRaqueteOponente,
    larguraRaqueteOponente,
    alturaRaqueteOponente
  );
}

function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 6;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 6;
  }
}

function colisaoMinhaRaquete() {
  colidiu = collideRectCircle(
    xRaquete,
    yRaquete,
    larguraRaquete,
    alturaRaquete,
    xBolinha,
    yBolinha,
    dBolinha
  );

  if (colidiu) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteOponente() {
  colidiu = collideRectCircle(
    xRaqueteOponente,
    yRaqueteOponente,
    larguraRaqueteOponente,
    alturaRaqueteOponente,
    xBolinha,
    yBolinha,
    dBolinha
  );

  if (colidiu) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentoRaqueteOponente() {
  movimentoYraqueteOponente =
    yBolinha - yRaqueteOponente - alturaRaqueteOponente / 2 - 30;
  yRaqueteOponente += movimentoYraqueteOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function placar() {
  textAlign(CENTER);
  textSize(16);
  fill(255, 40, 0);
  rect(150, 10, 40, 20);
  fill(255);
  text(meuPlacar, 170, 26);
  fill(255, 40, 0);
  rect(450, 10, 40, 20);
  fill(255);
  text(placarOponente, 470, 26);
}

function marcarPonto() {
  if (xBolinha + raioBolinha > 600) {
    meuPlacar += 1;
    ponto.play();
  }
  if (xBolinha - raioBolinha < 0) {
    placarOponente += 1;
    ponto.play();
  }
}

function preload() {
  trilha = loadSound("src/audio/trilha.mp3");
  ponto = loadSound("src/audio/ponto.mp3");
  raquetada = loadSound("src/audio/raquetada.mp3");
}

function calculaChanceDeErrar() {
  if (placarOponente >= meuPlacar) {
    chanceDeErrar += 1;

    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;

    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}
