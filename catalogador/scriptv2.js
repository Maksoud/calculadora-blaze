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

    let win  		  = 0
    let loss 		  = 0
	let bancaInicial  = 0
	let bancaAtual    = 0
	let stopWin       = 0
	let stopLoss      = 0
	let multiplicador = 3
	let martinGale    = 1
	let rodadasGale   = 0
	let defaultValue  = 2

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
	})// $(".config-robo")

	/*******/

	function placeBet(cor, valor) {

		// Set value
		$('div.input-field-wrapper').addClass('filled')
		$('input.input-field').val(valor)

		/*******/

		// Select color
		switch(cor) {
			case "red":
				$(".input-wrapper .red").click()

				msg = "🔴🔴🔴 ENTROU NO VERMELHO 🔴🔴🔴+%0A+🚀🚀🚀"
				$.ajax({
					url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
				})
			break;
			case "black":
				$(".input-wrapper .black").click()

				msg = "⚫️⚫️⚫️ ENTROU NO PRETO ⚫️⚫️⚫️+%0A+🚀🚀🚀"
				$.ajax({
					url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
				})
			break;
			case "white":
				$(".input-wrapper .white").click()

				msg = "⚪️⚪️⚪️ ENTROU NO BRANCO ⚪️⚪️⚪️+%0A+🚀🚀🚀"
				$.ajax({
					url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
				})
			break;
		}// switch(cor)

		/*******/

		// Place bet
		$(".place-bet .undefined").click()

		/*******/

		// Cobre o branco
		if (valor > defaultValue) {

			$('input.input-field').val(defaultValue)
			$(".input-wrapper .white").click()
			$(".place-bet .undefined").click()

			msg = "⚪️⚪️⚪️ ENTROU NO BRANCO ⚪️⚪️⚪️+%0A+🚀🚀🚀"
			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
			})

		}// if (valor > defaultValue)

	}// placeBet

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

				let redWin   = false
				let blackWin = false
				let whiteWin = false

				if ($(".casino-recent .entry:first").html().match(/black/g)) blackWin = true
				if ($(".casino-recent .entry:first").html().match(/red/g))   redWin   = true
				if ($(".casino-recent .entry:first").html().match(/white/g)) whiteWin = true

				/*******/

				// Contabiliza ganhos/perdas
				if (vermelhoEnt == true && redWin == true) {

					win++
					martinGale  = 1
					rodadasGale = 0

					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU NO VERMELHO 🔴+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

				}// if (vermelhoEnt == true && redWin == true)
				if (vermelhoEnt == true && redWin == false) {

					loss++
					martinGale++
					rodadasGale++

					setTimeout(() => {
						let msg = "❌❌❌ LOSS ❌❌❌+%0A+🔴 PERDEU NO VERMELHO 🔴+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

				}// if (vermelhoEnt == true && redWin == false)
				if (pretoEnt == true && blackWin == true) {

					win++
					martinGale  = 1
					rodadasGale = 0

					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU NO PRETO ⚫️+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

				}// if (pretoEnt == true && blackWin == true)
				if (pretoEnt == true && blackWin == false) {

					loss++
					martinGale++
					rodadasGale++

					setTimeout(() => {
						let msg = "❌❌❌ LOSS ❌❌❌+%0A+⚫️ PERDEU NO PRETO ⚫️+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

				}// if (pretoEnt == true && blackWin == false)
				if (brancoEnt == true && whiteWin == true) {

					win++
					martinGale  = 1
					rodadasGale = 0

					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+⚪️ PAGOU NO BRANCO ⚪️🤑🤑🤑+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 15000)

				}// if (brancoEnt == true && whiteWin == true)

				/*******/

				// if (win > 0 || loss > 0) console.log("win:", win, "loss:", loss)

				if (vermelhoEnt == false && pretoEnt == false) {

					console.log("valorVermelho:", valorVermelho, "valorPreto:", valorPreto)

					if (valorVermelho > valorPreto) {

						console.log("Vermelho " + (valorVermelho/valorPreto).toFixed(2) + "x maior")

					} else if (valorVermelho < valorPreto) {

						console.log("Preto " + (valorPreto/valorVermelho).toFixed(2) + "x maior")

					}// else if (valorVermelho < valorPreto)

				}// if (vermelhoEnt == false && pretoEnt == false)

				/*******/

				// Entradas do vermelho/preto
				vermelhoEnt = false
				pretoEnt    = false

			}// if (verificaMudanca == "start")

		}// mutationHandler
	
	}, 500)

    /***************/

    setInterval(function () {

		bancaAtual = parseFloat($(".amount .currency:first").html().split('</span>')[1])

		/*******/
        
        // Verifica se o robô está ligado, e se o saldo atual da banca está entre o stopwin e o stoploss
        if (statusRobo == 1 && (bancaAtual < stopWin || bancaAtual > stopLoss)) {
			
			if (bancaAtual > stopWin) {

                // statusRobo = 0
				ligaRobo()

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
				ligaRobo()

				setTimeout(() => {
					let msg = "❌❌❌ STOP LOSS ❌❌❌+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
					$.ajax({
						url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
					})
				}, 15000)

				console.log("STOPLOSS ATINGIDO")

            }// if (bancaAtual < stopLoss)

            /*******/

			if (valorVermelho >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax) {
            
				// Se o valor de apostas do vermelho for maior que o valor do preto vezes 3, ele valida a entrada
				if (valorVermelho > (valorPreto * multiplicador) && vermelhoWin == false) {

					placeBet("red", (defaultValue*martinGale))

					// $(".input-wrapper .red").click()
					// $(".place-bet .undefined").click()

					vermelhoEnt = true
					console.log("Entrou no vermelho")

					
			
				}// if (valorVermelho > (valorPreto * multiplicador) && vermelhoWin == false)

				/*******/
			
				// Se o valor de apostas do preto for maior que o valor do vermelho vezes 3, ele valida a entrada
				if (valorPreto > (valorVermelho * multiplicador) && pretoWin == false) {

					placeBet("black", (defaultValue*martinGale))

					// $(".input-wrapper .black").click()
					// $(".place-bet .undefined").click()

					pretoEnt = true
					console.log("Entrou no preto")

					

				}// if (valorPreto > (valorVermelho * multiplicador) && pretoWin == false)

			}// if (valorVermelho >= minimoTotal && timeLeft >= tempoMinimo && timeLeft <= tempoMax)

        }// if (statusRobo == 1 && (bancaAtual < stopWin || bancaAtual > stopLoss))

    }, 3000)

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