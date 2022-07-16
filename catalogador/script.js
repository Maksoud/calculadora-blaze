// VERIFICA URL DOUBLE OU CRASH

var pathname = $(location).attr('pathname');

// AUMENTA E DIMINUI BOX VELAS

$(document).ready(function() {

	$('.zoomMenos').on('click', function(){ 

		var largura = $(".boxCatalogadorDouble").width();
		var diminuir = largura - 1;
	    $('.boxCatalogadorDouble').animate({"width" : ""+diminuir+""}, 0);

	});
	$('.zoomMais').on('click', function(){ 

		var largura = $(".boxCatalogadorDouble").width();
		var aumentar = largura + 40;
	    $('.boxCatalogadorDouble').animate({"width" : ""+aumentar+""}, 0);

	});

});

// INICIO DOUBLE

if (pathname == "/pt/games/double") {

	$("#casino").prepend("<div class='boxContadorLinhas'><ul></ul><ul style='margin-top:-8px;'><li class='countAtual'></li></ul></div>");
	$("#casino").prepend("<div class='boxCatalogadorDouble' style='width:530px!important;'></div>");
	$("#casino").prepend("<div class='boxContadorDouble'><div class='btnIniciar'>Iniciar Catalogação</div><div class='btnResetar'>Reset Catalogação</div><div class='tituloContador'>Indicador de Tendência<span>% taxa de amostragem</span></div><div class='contadorBlack'></div><div class='contadorRed'></div><div class='contadorWhite'></div><div class='zoomMais'>&#10133;</div><div class='zoomMenos'>&#10134;</div></div>"); 

	// ATIVA FUNÇÕES

	$( ".btnIniciar" ).click(function() {
		iniciar();
	});

	$( ".btnResetar" ).click(function() {
		window.location.reload(true);
	});

	// INICIA FUNCTION

	function iniciar() {

		setTimeout(function() {
			
			var targetNodes      = $(".main");
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
			var myObserver       = new MutationObserver (mutationHandler);
			var obsConfig        = { childList: true, characterData: true, attributes: true, subtree: true };

			//--- Add a target node to the observer. Can only add one node at a time.
			targetNodes.each ( function () {
				myObserver.observe (this, obsConfig);
			});

			function mutationHandler (mutationRecords) {

				var verificaMudanca = $("#roulette-slider").attr("class"); 

				if (verificaMudanca == "start") {
					
					var ultimoNumero = $(".casino-recent .entry:first").html()
					var ultimaClass  = $(".casino-recent .sm-box:first").attr("class")

					let date = new Date()
					let time = date.toLocaleTimeString("pt-BR", {
						timeStyle: "short",       //Serão retornado apenas horas e minutos.  
						hour12: false,            //Formato de 24h, suprimindo sufixos AM e PM.
						numberingSystem: "latn"   //Resulado em algarismos indo-arábicos.
					})

					$(".boxCatalogadorDouble").append(ultimoNumero)
					$(".boxCatalogadorDouble .sm-box:last").append("<span>"+time+"</span><b>"+ultimaClass+"</b>")

					// CAPTURA QUANTIDADE
					var countBlack = $('.boxCatalogadorDouble .black').length
					var countRed   = $('.boxCatalogadorDouble .red').length
					var countWhite = $('.boxCatalogadorDouble .white').length
					var numBlack   = countBlack
					var numRed     = countRed
					var numWhite   = countWhite
					var numTotal   = countBlack + countRed + countWhite
					var option = {
						style: 'percent'
					};
					var formatter = new Intl.NumberFormat("en-US", option)
					var percentFormatBlack = formatter.format(numBlack / numTotal)
					var percentFormatRed   = formatter.format(numRed / numTotal)
					var percentFormatWhite = formatter.format(numWhite / numTotal)
					
					$(".contadorBlack").html(percentFormatBlack)
					$(".contadorRed").html(percentFormatRed)
					$(".contadorWhite").html(percentFormatWhite)

					// CONTA ITENS POR LINHA
					var linhas = $(".boxCatalogadorDouble .sm-box:nth-child(-n+15)").text()	

					const linha_qtd_black = (linhas.match(/black/g) || []).length
					const linha_qtd_red   = (linhas.match(/red/g) || []).length
					const linha_qtd_white = (linhas.match(/white/g) || []).length

					var qtd_linhas = linha_qtd_black + linha_qtd_red + linha_qtd_white

					$(".boxContadorLinhas .countAtual").html("<div class='qtdblack'>"+linha_qtd_black+"</div><div class='qtdred'>"+linha_qtd_red+"</div><div class='qtdwhite'>"+linha_qtd_white+"</div>")
					
					if (qtd_linhas == "15") {
						$(".boxContadorLinhas ul:first").append("<li><div class='qtdblack'>"+linha_qtd_black+"</div><div class='qtdred'>"+linha_qtd_red+"</div><div class='qtdwhite'>"+linha_qtd_white+"</div></li>")
						$(".boxCatalogadorDouble b").remove()
						$(".countAtual").html("")
					}// if (qtd_linhas == "15")

					// ALERTA
					if (qtd_linhas == "11") {

						const alert_qtd_black = (linhas.match(/black/g) || []).length
						const alert_qtd_red = (linhas.match(/red/g) || []).length

						if ((alert_qtd_black == "1") || (alert_qtd_red == "1")) {
							$(".alertar").fadeIn();
						}

					}// if (qtd_linhas == "11")

					// Okado
					let ultCor = null
					if (ultimoNumero.match(/black/g)) ultCor = "black"
					if (ultimoNumero.match(/red/g))   ultCor = "red"
					if (ultimoNumero.match(/white/g)) ultCor = "white"

					analisarJogos(ultCor)

				}// if (verificaMudanca == "start")
				
			}// mutationHandler
		
		}, 500);

		$(".btnIniciar").fadeOut(0);
		$(".btnResetar").fadeIn(0);
		console.log("Iniciou");

	}// iniciar

}

/***************/

let cVermelho    = 0
let cPreto       = 0
let cAutVermelho = 0
let cAutPreto    = 0
let rodada       = 0
let rodadaAut    = 0
let jogando      = false
let jogandoAut   = false
let ganhouCor    = 0
let ganhouAutCor = 0

function jogadaAutomatizada(ultimaCor) {

	rodadaAut += 1

	/***************/

	// Analisa se ganhou na última jogada
	if (ganhouAutCor && rodadaAut <= 4) {

		console.log("GANHOU!")
		console.log("FIM DO JOGO AUTOMATIZADO! Rodada " + rodadaAut)

		jogandoAut = false
		rodadaAut  = 0

	} else if (!ganhouAutCor && rodadaAut > 4) {

		console.log("PERDEU!")
		console.log("FIM DO JOGO AUTOMATIZADO! Rodada " + rodadaAut)

		jogandoAut = false
		rodadaAut  = 0

	}// if (rodadaAut == 4)

	/***************/

	// Jogando...
	if (jogandoAut) {

		if (rodadaAut == 1) console.log("COMEÇANDO JOGADA AUTOMATIZADA...")

		/***************/

		if (rodadaAut > 1 && ultimaCor == "white") console.log("MISERAVI ACERTÔ NO BRANCO! Rodada " + rodadaAut)

		/***************/

		cAutVermelho += 1

		// ENTRADAS NO VERMELHO
		if (cAutVermelho <= 2) {

			if (ultimaCor == "red") {
				
				ganhouAutCor++

			} else {

				console.log("ENTRA NO VERMELHO AUT " + cAutVermelho)

			}
			
		}// if (cAutVermelho <= 2)

		/***************/

		// ENTRADAS NO PRETO
		if (cAutVermelho > 2) {

			cAutPreto += 1
			
			if (ultimaCor == "black") {
				
				ganhouAutCor++

			} else {

				console.log("ENTRA NO PRETO AUT " + cAutPreto)

			}

			// FINALIZA JOGADAS
			if (cAutPreto == 2) {

				cAutVermelho = 0
				cAutPreto    = 0
				jogandoAut   = false

			}// if (cAutPreto == 2)

		}// if (cAutVermelho > 2)

	}// if (jogandoAut)

}// jogadaAutomatizada

function jogar(ultimaCor) {

	rodada += 1

	/***************/

	if (rodada == 1) console.log("COMEÇANDO JOGADA INFINITA...")

	/***************/

	if (rodada > 1 && ultimaCor == "white") console.log("MISERAVI ACERTÔ NO BRANCO! Rodada " + rodada)

	/***************/

	cVermelho += 1

	// ENTRADAS NO VERMELHO
	if (cVermelho <= 2) {

		if (ultimaCor == "red") {
			ganhouCor++
			console.log("INFINITO GANHOU NO VERMELHO " + ganhouCor + " Rodada " + rodada)
		}// if (ultimaCor == "red")

		console.log("ENTRA NO VERMELHO " + cVermelho)
	
	}// if (cVermelho <= 2)

	/***************/

	if (cVermelho > 2) {

		cPreto += 1

		if (ultimaCor == "black"){
			ganhouCor++
			console.log("INFINITO GANHOU NO PRETO " + ganhouCor + " Rodada " + rodada);
		}

		console.log("ENTRA NO PRETO " + cPreto)

		// RECOMEÇA ANÁLISE
		if (cPreto == 2) {

			cVermelho = 0
			cPreto    = 0

		}// if (cPreto == 2)

	}// if (cVermelho > 2)

}// jogar

function analisarJogos(ultimaCor) {

	try {

		// boxCatalogador = document.querySelector('.boxCatalogadorDouble')
		// ultimoSinal    = boxCatalogador.lastChild
		// penultimoSinal = boxCatalogador.lastChild.previousElementSibling

		/***************/

		// Analisar as cores sorteadas
		// if (ultimoSinal.firstChild.classList[1] == "red") {
		if (ultimaCor == "red") {

			console.log("Saiu vermelho")

			// Continuar jogando
			if (jogando) jogar(ultimaCor)
			if (jogandoAut) jogadaAutomatizada(ultimaCor)

		// } else if (ultimoSinal.firstChild.classList[1] == "black") {
	    } else if (ultimaCor == "black") {

			console.log("Saiu preto")

			// Continuar jogando
			if (jogando) jogar(ultimaCor)
			if (jogandoAut) jogadaAutomatizada(ultimaCor)

		// } else if (ultimoSinal.firstChild.classList[1] == "white") {
		} else if (ultimaCor == "white") {

			// Começar a jogar
			console.log("Saiu branco")

			jogando   = true
			cVermelho = 0
			cPreto    = 0
			rodada    = 0
			
			jogandoAut   = true
			cAutVermelho = 0
			cAutPreto    = 0
			rodadaAut    = 0

			jogar(ultimaCor)
			jogadaAutomatizada(ultimaCor)

		}// else if (ultimaCor == "white")
		
	} catch {
		//
	}

}// analisarJogos