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
	let brancoEnt	   = false
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
	let entradaDobrada = 0

	/*******/

	// LIGA/DESLIGA O ROBÔ
	function ligaRobo() {

		bancaAtual = parseFloat($(".amount .currency:first").html().split('</span>')[1])

		if ($(".config-robo button").hasClass('ligar')) {
        
            statusRobo = 1

            $(".config-robo").html('<div class="config-robo"><button id="header-deposit" class="red desligar"><i class="fas fa-times"></i> DESLIGAR</button></div>')

			let msg = "✅ ATIVADO ✅+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀"
			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
			})
        
        } else {
        
            statusRobo = 0

            $(".config-robo").html('<div class="config-robo"><button id="header-deposit" class="green ligar"><i class="fas fa-play"></i> LIGAR</button></div>')

			let msg = "❌ DESATIVADO ❌+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀"
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

	// FAZ A APOSTA
	function placeBet(cor, valor) {

		// Set value
		let cassinoValue = parseFloat($('input.input-field').val())

		// console.log("valor", valor)
		// console.log("defaultValue", defaultValue)
		// console.log("cassino Value", cassinoValue)

		if (valor > defaultValue) {

			$('button.grey.double').click()

			entradaDobrada++

		} else if (cassinoValue > defaultValue) {

			for (let i = entradaDobrada; i > 0; i--) {

				setTimeout(() => {
					$('button.grey.half').click()
				},200)

			}// for (let i = reduce; i > 0; i--)

			entradaDobrada = 0

		}// else if (cassinoValue > defaultValue)

		/*******/

		// Select color
		switch(cor) {
			case "red":

				$(".input-wrapper .red").click()
				
				console.log("Entrou no vermelho")

				msg = "🔴🔴🔴 ENTROU NO VERMELHO 🔴🔴🔴+%0A+🚀🚀🚀 R$ " + valor
				$.ajax({
					url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
				})

				vermelhoEnt = true
				pretoEnt    = false

			break;
			case "black":

				$(".input-wrapper .black").click()

				console.log("Entrou no preto")

				msg = "⚫️⚫️⚫️ ENTROU NO PRETO ⚫️⚫️⚫️+%0A+🚀🚀🚀 R$ " + valor
				$.ajax({
					url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
				})
				
				vermelhoEnt = false
				pretoEnt    = true

			break;
			case "white":

				// Entra com o valor mínimo
				for (let i = entradaDobrada; i > 0; i--) {

					setTimeout(() => {
						$('button.grey.half').click()
					},200)
	
				}// for (let i = reduce; i > 0; i--)
	
				// Aposta
				$(".input-wrapper .white").click()

				// Retorna o valor da aposta para o anterior
				for (let i = entradaDobrada; i > 0; i--) {

					setTimeout(() => {
						$('button.grey.double').click()
					},200)
	
				}// for (let i = reduce; i > 0; i--)
				
				console.log("Entrou no branco")

				msg = "⚪️⚪️⚪️ ENTROU NO BRANCO ⚪️⚪️⚪️+%0A+🚀🚀🚀 R$ " + defaultValue
				$.ajax({
					url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
				})

				brancoEnt = true

			break;
		}// switch(cor)

		/*******/

		// Place bet
		$(".place-bet .undefined").click()

	}// placeBet

	/*******/

	// CARREGA SALDO DA BANCA
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

	// IDENTIFICA ÚLTIMO SORTEIO
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

				if (vermelhoEnt == false && pretoEnt == false) {

					console.log("valorVermelho:", valorVermelho)
					console.log("valorPreto:", valorPreto)
					console.log("valorBranco:", valorBranco)

					if (Number(valorVermelho) > Number(valorPreto)) {

						console.log("Vermelho " + (valorVermelho/valorPreto).toFixed(2) + "x maior")

					} else if (valorVermelho != valorPreto) {

						console.log("Preto " + (valorPreto/valorVermelho).toFixed(2) + "x maior")

					}// else if (valorVermelho < valorPreto)

				}// if (vermelhoEnt == false && pretoEnt == false)

				/*******/

				// Contabiliza ganhos/perdas
				if (vermelhoEnt == true && redWin == true) {

					win++
					martinGale  = 1
					rodadasGale = 0

					// Entradas do vermelho/preto/branco
					vermelhoEnt = false

					console.log("Ganhou no vermelho")

					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+🔴 PAGOU NO VERMELHO 🔴+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 12000)

				}// if (vermelhoEnt == true && redWin == true)
				if (vermelhoEnt == true && redWin == false) {

					loss++
					martinGale++
					rodadasGale++

					// Entradas do vermelho/preto/branco
					vermelhoEnt = false

					console.log("Perdeu no vermelho")

					setTimeout(() => {
						let msg = "❌❌❌ LOSS ❌❌❌+%0A+🔴 PERDEU NO VERMELHO 🔴+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 12000)

				}// if (vermelhoEnt == true && redWin == false)
				if (pretoEnt == true && blackWin == true) {

					win++
					martinGale  = 1
					rodadasGale = 0

					// Entradas do vermelho/preto/branco
					pretoEnt    = false

					console.log("Ganhou no preto")

					setTimeout(() => {
						let msg = "✅✅ WINNNN ✅✅+%0A+⚫️ PAGOU NO PRETO ⚫️+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 12000)

				}// if (pretoEnt == true && blackWin == true)
				if (pretoEnt == true && blackWin == false) {

					loss++
					martinGale++
					rodadasGale++

					// Entradas do vermelho/preto/branco
					pretoEnt    = false

					console.log("Perdeu no preto")

					setTimeout(() => {
						let msg = "❌❌❌ LOSS ❌❌❌+%0A+⚫️ PERDEU NO PRETO ⚫️+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 12000)

				}// if (pretoEnt == true && blackWin == false)
				if (brancoEnt == true && whiteWin == true) {

					win++
					martinGale  = 1
					rodadasGale = 0

					// Entradas do vermelho/preto/branco
					brancoEnt   = false

					console.log("Ganhou no branco")

					setTimeout(() => {
						let msg = "✅✅✅ WINNNN ✅✅✅+%0A+⚪️ PAGOU NO BRANCO ⚪️🤑🤑🤑+%0A+BANCA ATUAL R$ " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
						$.ajax({
							url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
						})
					}, 12000)

				}// if (brancoEnt == true && whiteWin == true)

				/*******/

				// if (win > 0 || loss > 0) console.log("win:", win, "loss:", loss)

			}// if (verificaMudanca == "start")

		}// mutationHandler
	
	}, 500)

    /***************/

	// ENTRADAS DO BRANCO
    setInterval(function () {

        if (statusRobo == 1 && (bancaAtual < stopWin || bancaAtual > stopLoss)) {

			if (martinGale > 1 && timeLeft >= tempoMinimo && timeLeft <= (tempoMax+3)) {

				placeBet("white", defaultValue)

			}// if (martinGale > 1 && timeLeft >= tempoMinimo && timeLeft <= tempoMax)

		}// if (statusRobo == 1 && (bancaAtual < stopWin || bancaAtual > stopLoss))

    }, 5000)

    /***************/

	// ENTRADAS DO PRETO/VERMELHO
    setInterval(function () {

		bancaAtual = parseFloat($(".amount .currency:first").html().split('</span>')[1])

		/*******/

		if (rodadasGale > 3) {

			// Delisga o robô
			ligaRobo()

			rodadasGale = 0

			let msg = "❌❌❌ STOP GALE ❌❌❌+%0A+BANCA ATUAL " + bancaAtual + " 🚀🚀🚀" + "+%0A+PLACAR ATUAL " + win + " X " + loss
			$.ajax({
				url: "https://api.telegram.org/bot" + idbot + "/sendMessage?chat_id=" + idSalaInfinita + "&text=" + msg
			})

			console.log("STOPGALE ATINGIDO")

		}// if (rodadasGale > 3)

		/*******/
        
        // Verifica se o robô está ligado, e se o saldo atual da banca está entre o stopwin e o stoploss
        if (statusRobo == 1 && (bancaAtual < stopWin || bancaAtual > stopLoss)) {
			
			if (bancaAtual > stopWin) {

                // Delisga o robô
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

                // Delisga o robô
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

				}// if (valorVermelho > (valorPreto * multiplicador) && vermelhoWin == false)

				/*******/
			
				// Se o valor de apostas do preto for maior que o valor do vermelho vezes 3, ele valida a entrada
				if (valorPreto > (valorVermelho * multiplicador) && pretoWin == false) {

					placeBet("black", (defaultValue*martinGale))

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