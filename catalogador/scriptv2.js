var idbot 		   = '5478878277:AAH_FjRfcOc8x1e4uwRoivWG1qDzSAGD-X4'
var idSalaInfinita = '-1001507376152'
var idSalaOfc 	   = '-1001643479428'
var pathname  	   = $(location).attr('pathname')

/***************/

if (pathname == "/pt/games/double") {

	let minimoTotal = 0
    let tempoMinimo = 1
    let tempoMax    = 3
    let statusRobo  = 0

	/*******/

    // Variáveis das posições dos elementos na tela
    var comecarJogo    = $(".place-bet .undefined")
    var dobrarEntrada  = $(".double")
    var dividirEntrada = $(".half")
	let vermelhoWin    = false
	let vermelhoEnt    = false
    let pretoWin       = false
	let pretoEnt	   = false
	let branco 		   = $(".input-wrapper .white")
    var brancoWin      = ""

	/*******/

	$("#casino").prepend("<div class='config-robo'><button id='header-deposit' class='green ligar'><i class='fas fa-play'></i> LIGAR</button></div>")

	/*******/

	$(".config-robo").click(function() {

		if (document.querySelector('.config-robo .green').classList.contains('ligar')) {
        
            statusRobo = 1

            $(this).html('<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>')
        
        } else if (document.querySelector('.config-robo .red').classList.contains('desligar')) {
        
            statusRobo = 0

            $(this).html('<div class="config-robo"><button id="header-deposit" class="green ligar"><i class="fas fa-play"></i> LIGAR</button></div>')
        
        }// else if (document.querySelector('.config-robo .red').classList.contains('ligar'))

	})// $(".config-robo").click

	/*******/

    // Contador de wins
    let win  = 0

    // Contador de loss
    let loss = 0

    // Limite de martingales do robô
    let martinGale = 2

	let bancaInicial = 0
	let bancaAtual   = 0
	let stopWin      = 0
	let stopLoss     = 0

	/*******/

	let bancaInterval = setInterval(() => {

		if ($(".amount .currency:first").html().split('</span>')[1] != undefined) clearInterval(bancaInterval)
		// console.log("banca inicial", $(".amount .currency:first").html().split('</span>')[1])

		// Importa o saldo da blaze
		// let bancaInicial = document.querySelector('.currency').innerHTML.split('</span>')[1]
		bancaInicial = parseFloat($(".amount .currency:first").html().split('</span>')[1])

		// Calcula o stopWin em 20%
		stopWin  = (bancaInicial / 1) + (bancaInicial * 0.20)
	
		// Calcula o stoploss em 25%
		stopLoss = bancaInicial - (bancaInicial * 0.25)

	}, 1000)

	/*******/

	setTimeout(function() {
			
		var targetNodes      = $(".main")
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver
		var myObserver       = new MutationObserver (mutationHandler)
		var obsConfig        = { childList: true, characterData: true, attributes: true, subtree: true }

		//--- Add a target node to the observer. Can only add one node at a time.
		targetNodes.each ( function () {
			myObserver.observe (this, obsConfig);
		});

		function mutationHandler (mutationRecords) {

			var verificaMudanca = $("#roulette-slider").attr("class"); 

			if (verificaMudanca == "start") {

				bancaAtual = parseFloat($(".amount .currency:first").html().split('</span>')[1])

				/*******/

				// Contabiliza ganhos
				if (vermelhoEnt == true && vermelhoWin == true) {
					win++
					let msg = "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU NO VERMELHO 🔴+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
					$.ajax({
						url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
					})
				}
				if (vermelhoEnt == true && vermelhoWin == false) {
					loss++
					let msg = "❌❌❌ LOSS ❌❌❌+%0A+🔴 PERDEU NO VERMELHO 🔴+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
					$.ajax({
						url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
					})
				}
				if (pretoEnt == true && pretoWin == true) {
					win++
					let msg = "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU NO PRETO ⚫️+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
					$.ajax({
						url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
					})
				}
				if (pretoEnt == true && pretoWin == false) {
					loss++
					let msg = "❌❌❌ LOSS ❌❌❌+%0A+⚫️ PERDEU NO PRETO ⚫️+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
					$.ajax({
						url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
					})
				}

				if (win > 0 || loss > 0) console.log("win:", win, "loss:", loss)

				/*******/

				// Entradas do vermelho/preto
				vermelhoEnt = false
				pretoEnt    = false

				/*******/

				// if (valorVermelho > (valorPreto * 2.5)) console.log("Oportunidade no vermelho")
				// if (valorPreto > (valorVermelho * 2.5)) console.log("Oportunidade no preto")

				/*******/
				
				// Verifica se o robô está ligado, e se o saldo atual da banca está entre o stopwin e o stoploss
				if (statusRobo != 0 && (bancaAtual < stopWin || bancaAtual > stopLoss)) {
					
					// Se o valor de apostas do vermelho for maior que o valor do preto vezes 3, ele valida a entrada
					if (valorVermelho > (valorPreto * 2.5) && vermelhoWin == false && valorVermelho >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {

						$(".input-wrapper .red").click()
						$(".place-bet .undefined").click()

						vermelhoEnt = true
						console.log("Entrou no vermelho")
				
					} else if (bancaAtual > stopWin) {

						statusRobo = 0

						alert('STOPWIN BATIDO COM SUCESSO!')

					} else if (bancaAtual < stopLoss) {

						statusRobo = 0

						alert('STOPLOSS ATINGIDO')

					}

					/*******/
				
					// Se o valor de apostas do preto for maior que o valor do vermelho vezes 3, ele valida a entrada
					if (valorPreto > (valorVermelho * 2.5) && pretoWin == false && valorPreto >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {

						$(".input-wrapper .black").click()
						$(".place-bet .undefined").click()

						pretoEnt = true
						console.log("Entrou no preto")

					} else if (bancaAtual > stopWin) {

						statusRobo = 0

						alert('STOPWIN BATIDO COM SUCESSO!')

					} else if (bancaAtual < stopLoss) {

						statusRobo = 0

						alert('STOPLOSS ATINGIDO')

					}

				}// if (statusRobo != 0 && (bancaAtual < stopWin || bancaAtual > stopLoss))

			}// if (verificaMudanca == "start")

		}// mutationHandler
	
	}, 500)

	/*******/

	// Estratégia de entrar na tendência do mercado
	setInterval(() => {

		// Separa os valores das entradas no vermelho
		valorVermelho = document.querySelectorAll('.counter')[1].innerHTML.split('</span>')[0].split('R$ ')[1]

		// Validação se o vermelho ganhou a rodada = true
		vermelhoWin = document.querySelectorAll('.counter')[1].childNodes[0].classList.contains("good")

		/*******/

		// Separa os valores das entradas no branco
		valorBranco = document.querySelectorAll('.counter')[3].innerHTML.split('</span>')[0].split('R$ ')[1]

		// Validação se o branco ganhou a rodada = true
		brancoWin = document.querySelectorAll('.counter')[3].childNodes[0].classList.contains("good")

		/*******/

		// Separa os valores das entradas no preto
		valorPreto = document.querySelectorAll('.counter')[5].innerHTML.split('</span>')[0].split('R$ ')[1]

		// Validação se o preto ganhou a rodada = true
		pretoWin = document.querySelectorAll('.counter')[5].childNodes[0].classList.contains("good")

		/*******/

		// Separa o contador para poder efetuar a entrada
		timeLeft = document.querySelector('.time-left span').innerHTML.split(':')[0]

	}, 500)

}// if (pathname == "/pt/games/double")