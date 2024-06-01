//Pong 3 SFX
let raquetadaSFX;
let pontoSFX;
let OST;

//variáveis da bola
let xBola = 100;
let yBola = 200;
let diametro = 22;
let raio = diametro / 2;

//variáveis da Raquete Oponente
let xRaqueteO = 585;
let yRaqueteO = 150;

//velocidade da bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//variáveis da Raquete Player
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//chance da CPU errar
let chanceDeErrar = 0;


let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosO = 0;

function setup() {
  createCanvas(600, 400);
  OST.loop();
}

function draw() {
    background(0);
    mostraBola();
    movimentaBola();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteO, yRaqueteO);
    mostraRaquete(xRaqueteO, yRaqueteO);
    movimentaRaqueteO();
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa()
}
function mostraBola() {
  circle(xBola, yBola, diametro);
}

function movimentaBola() {
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificaColisaoBorda() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadeXBola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0) {
    velocidadeYBola *= -1;
  }
}

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete() {
  if(keyIsDown(87)) {
    yRaquete -= 8;
  }
  if(keyIsDown(83)) {
    yRaquete += 8;
  }
}

function verificaColisaoRaquete() {
  if (xBola - raio < xRaquete + raqueteComprimento && yBola - raio < yRaquete + raqueteAltura && yBola + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetadaSFX.play();
  }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBola, yBola, raio);
    if (colidiu){
        velocidadeXBola *= -1;
        raquetadaSFX.play();
  }
}
function movimentaRaqueteO(){
  velocidadeYO = yBola -yRaqueteO - raqueteComprimento / 2 - 30;
  yRaqueteO += velocidadeYO + chanceDeErrar
  calculaChanceDeErrar()
}



function incluiPlacar(){
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color(255,140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color("blue"));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosO, 470, 26);
}

function marcaPonto() {
  if (xBola > 590) {
    meusPontos += 1;
    pontoSFX.play();
  }
  if (xBola < 11) {
    pontosO += 1;
    pontoSFX.play();
  }
}

function preload(){
  OST = loadSound("OST.mp3");
  pontoSFX = loadSound("ponto.mp3");
  raquetadaSFX = loadSound("raquetada.mp3");
}

function calculaChanceDeErrar() {
  if (pontosO >= meusPontos) {
    chanceDeErrar += 2;
    if (chanceDeErrar >= 35){
    chanceDeErrar = 36
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 31){
    chanceDeErrar = 31
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBola - raio < 0){
    xBola = 23
    }
}