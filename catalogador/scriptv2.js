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
	let vermelhoWin    = false
	let vermelhoEnt    = false
    let pretoWin       = false
	let pretoEnt	   = false
    // let comecarJogo    = $(".place-bet .undefined")
    // let dobrarEntrada  = $(".double")
    // let dividirEntrada = $(".half")
	// let branco 		   = $(".input-wrapper .white")
    // let brancoWin      = ""

	/*******/

    let win  		 = 0
    let loss 		 = 0
	let bancaInicial = 0
	let bancaAtual   = 0
	let stopWin      = 0
	let stopLoss     = 0

	/*******/

	function ligaRobo() {

		bancaAtual = parseFloat($(".amount .currency:first").html().split('</span>')[1])

		if ($(".config-robo button").hasClass('ligar')) {
        
            statusRobo = 1

            $(".config-robo").html('<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>')

			let msg = "✅✅ ATIVADO ✅✅+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀"
			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
			})
        
        } else {
        
            statusRobo = 0

            $(".config-robo").html('<div class="config-robo"><button id="header-deposit" class="green ligar"><i class="fas fa-play"></i> LIGAR</button></div>')

			let msg = "❌❌ DESATIVADO ❌❌+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀"
			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
			})
        
        }// else if (document.querySelector('.config-robo .red').classList.contains('ligar'))

	}// ligaRobo

	$("#casino").prepend("<div class='config-robo'><button id='header-deposit' class='green ligar'><i class='fas fa-play'></i> LIGAR</button></div>")

	/*******/

	$(".config-robo").click(() => {
		ligaRobo()
	})

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
					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU NO VERMELHO 🔴+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)
				}
				if (vermelhoEnt == true && vermelhoWin == false) {
					loss++
					setTimeout(() => {
						let msg = "❌❌❌ LOSS ❌❌❌+%0A+🔴 PERDEU NO VERMELHO 🔴+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)
				}
				if (pretoEnt == true && pretoWin == true) {
					win++
					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU NO PRETO ⚫️+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)
				}
				if (pretoEnt == true && pretoWin == false) {
					loss++
					setTimeout(() => {
						let msg = "❌❌❌ LOSS ❌❌❌+%0A+⚫️ PERDEU NO PRETO ⚫️+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)
				}

				// if (win > 0 || loss > 0) console.log("win:", win, "loss:", loss)

				/*******/

				// Entradas do vermelho/preto
				vermelhoEnt = false
				pretoEnt    = false

				/*******/

				if (valorVermelho > (valorPreto * 2.5)) console.log("Oportunidade no vermelho")
				if (valorPreto > (valorVermelho * 2.5)) console.log("Oportunidade no preto")

				/*******/
					
				if (bancaAtual > stopWin) {

					// statusRobo = 0
					ligaRobo($(".config-robo"))

					setTimeout(() => {
						let msg = "✅✅✅ STOP WIN ✅✅✅+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

					console.log("STOPWIN BATIDO COM SUCESSO!")

				}// if (bancaAtual > stopWin)

				/*******/
				
				if (bancaAtual < stopLoss) {

					// statusRobo = 0
					ligaRobo($(".config-robo"))

					setTimeout(() => {
						let msg = "❌❌❌ STOP LOSS ❌❌❌+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

					console.log("STOPLOSS ATINGIDO")

				}// if (bancaAtual < stopLoss)

				/*******/
				
				// Verifica se o robô está ligado, e se o saldo atual da banca está entre o stopwin e o stoploss
				if (statusRobo == 1) {

					// Se o valor de apostas do vermelho for maior que o valor do preto vezes 3, ele valida a entrada
					if (valorVermelho > (valorPreto * 2.5) && vermelhoWin == false && valorVermelho >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {

						$(".input-wrapper .red").click()
						$(".place-bet .undefined").click()

						vermelhoEnt = true
						console.log("Entrou no vermelho")
				
					} 

					/*******/
				
					// Se o valor de apostas do preto for maior que o valor do vermelho vezes 3, ele valida a entrada
					if (valorPreto > (valorVermelho * 2.5) && pretoWin == false && valorPreto >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {

						$(".input-wrapper .black").click()
						$(".place-bet .undefined").click()

						pretoEnt = true
						console.log("Entrou no preto")

					}

				}// if (statusRobo == 1)

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