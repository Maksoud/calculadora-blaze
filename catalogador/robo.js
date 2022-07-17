// Variáveis das posições dos elementos na tela

let comecarJogo     = document.querySelector('.place-bet .undefined')
let dobrarEntrada   = document.querySelector('.double')
let dividirEntrada  = document.querySelector('.half')

let vermelho = document.querySelector('.input-wrapper .red')
let preto    = document.querySelector('.input-wrapper .black')
let branco   = document.querySelector('.input-wrapper .white')

// 0 = Desativado
// 1 = Ativado
let statusRobo = 0

// Limite de martingales do robô
let martinGale = 4

// Importa o saldo da blaze
let bancaInicial = document.querySelector('.currency').innerHTML.split('</span>')[1]

// Calcula o stopWin em 20%
let stopWin  = bancaInicial + (bancaInicial * 0.20)

// Calcula o stoploss em 25%
let stopLoss = bancaInicial - (bancaInicial * 0.25)

/***************/

// Configuração das ações do robô
function clicar(lugarClique){

    if (lugarClique.click) {

        lugarClique.click()

    } else if (document.createEvent) {

        var eventObj = document.createEvent('MouseEvents')
        eventObj.initEvent('click',true,true)
        lugarClique.dispatchEvent(eventObj)

    }// else if(document.createEvent){

}// function clicar(lugarClique){
// Final das ações do robô

/***************/

// Executar uma ação de acordo com a variável desejada
clicar(branco)

// Verifica se o saldo da banca está entre o stop win e stop loss
if (bancaInicial > stopLoss && bancaInicial < stopWin) {

    clicar(branco) // Executa uma ação de acordo com o parâmetro da variável passado entre ()

}

/***************/

// Cria o botão de ligar o robô
let botao = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'

// Insere o botão dentro da página da blaze
document.querySelector('.account').innerHTML += botao

// Seleciona a div do botão
let boxBotao = document.querySelector('.config-robo')

/***************/

// Ao clicar no botão, executa a ação de ligar ou desligar o robô
boxBotao.addEventListener("click", function(){
    if (document.querySelector('.config-robo .red').classList.contains('ligar')) {
        statusRobo = 1
        boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>'
    } else {
        statusRobo = 0
        boxBotao.innerHTML = '<div class="config-robo"><button id="header-deposit" class="red ligar"><i class="fas fa-play"></i> LIGAR</button></div>'
    }
})