/* GLOBAL */
var body = document.getElementsByTagName('body')[0];
function hasClass(el, className){
	return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}


function init(){
	/* POLYFILL CLOSEST */
	(function(ELEMENT){
		ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
		ELEMENT.closest = ELEMENT.closest || function closest(selector){
			var element = this;
			while(element){
				if(element.matches(selector)){
					break;
				}
				element = element.parentElement;
			}
			return element;
		};
	}(Element.prototype));


	/* VARIABLES */
	var firstAnimSlider = false,
		currentSlide = 0,
		htmlTag = document.getElementsByTagName('html')[0],
		pageContent = document.getElementById('page-content'),
		header = document.getElementById('header'),
		menu = document.getElementById('main-menu'),
		splitTlAnimTxt = [], decalTxt = '+=60',
		animsTxt, windowHeight = window.innerHeight,
		windowWidth = window.innerWidth,
		fixedMenuStep = document.getElementById('fixedMenuStep'),
		fixedMenu = document.getElementById('fixedMenu'),
		prestaSectionAteliers = document.getElementById('ateliers'),
		prestaSectionInterventions = document.getElementById('interventions'),
		aboutSectionTeam = document.getElementById('equipe'),
		aboutSectionIntervenants = document.getElementById('intervenants'),
		lastScrollTop = 0, scrollDir = 1;


	/* FONCTIONS GENERALES */
	function scrollTo(to, duration){
	    if(duration < 0) return;

	    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop,
			difference = to - scrollTop,
			perTick = difference / duration * 10;

	    setTimeout( function(){
			scrollTop = scrollTop + perTick;
			document.body.scrollTop = scrollTop;
			document.documentElement.scrollTop = scrollTop;
			if(scrollTop === to) return;
			scrollTo(to, duration - 10);
	    }, 10 );
	}

	function addEventListener(el, eventName, handler){
		if(el.addEventListener){
			el.addEventListener(eventName, handler);
		}else if(el.attachEvent){
			el.attachEvent('on' + eventName, function(){ handler.call(el); });
		}else{
			el['on' + eventName] = handler;
		}
	}
	function removeEventListener(el, eventName, handler){
	  	el.removeEventListener ? el.removeEventListener(eventName, handler) : el.detachEvent('on' + eventName, handler);
	}

	function shuffle(array){
		var elementsRemaining = array.length, temp, randomIndex;
		while(elementsRemaining > 1){
			randomIndex = Math.floor(Math.random() * elementsRemaining--);
			if(randomIndex !== elementsRemaining){
				temp = array[elementsRemaining];
				array[elementsRemaining] = array[randomIndex];
				array[randomIndex] = temp;
			}
		}
		return array;
	}

	function getStyle(oElm, strCssRule){
		var strValue = '';
		if(document.defaultView && document.defaultView.getComputedStyle){
			strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
		} else if(oElm.currentStyle){
			strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	}

	function getIndex(node){
		var childs = node.parentNode.childNodes, nbChilds = childs.length, i = 0;
		for(i; i < nbChilds; i++){
			if (node === childs[i]) break;
		}
		return i;
	}

	function detectScrollDir(){
		if(myScroll > lastScrollTop){
			scrollDir = -1;
		}else if(myScroll < lastScrollTop){
			scrollDir = 1;
		}else{
			scrollDir = 0;
		}
		lastScrollTop = myScroll;
	}

	function isVisible(el){
		var top = el.offsetTop, height = el.offsetHeight;

		while(el.offsetParent){
			el = el.offsetParent;
			top += el.offsetTop;
		}

		return( top < (window.pageYOffset + window.innerHeight) && (top + height) > window.pageYOffset );
	}

	function inArray(needle, array){
		var i = 0;
	    for(i in array){
	        if(array[i] == needle) return true;
	    }
	    return false;
	}


	/**** ON READY FUNCTIONS ****/

	function setSlider(slider){
		var slides = slider.querySelectorAll('.slide'),
			nbSlides = slides.length, i = 0,
			next = document.createElement('button'),
			prev = document.createElement('button'),
			height = 0, posX = '25%', timing = 0.3,
			tlAnims = new TimelineLite();

		if(hasClass(htmlTag, 'lt-ie9')) posX = '150%';

		function slideNext(){
			TweenLite.to( slides[currentSlide], timing, {left: posX, opacity: 0, zIndex: 0, onComplete: function(){
				currentSlide < nbSlides - 1 ? currentSlide ++ : currentSlide = 0;
				TweenLite.fromTo( slides[currentSlide], timing, {left: '-'+posX}, {left: 0, opacity: 1, zIndex: 1, ease:Power2.easeInOut} );
				tlAnims.staggerFromTo( slides[currentSlide].querySelectorAll('.anim-slide'), timing, {x: '-200px', opacity: 0}, {x: 0, opacity: 1, ease:Power2.easeInOut}, 0.2 );
			}} );
		}

		function slidePrev(){
			TweenLite.to( slides[currentSlide], timing, {left: '-'+posX, opacity: 0, zIndex: 0, onComplete: function(){
				currentSlide > 0 ? currentSlide -- : currentSlide = nbSlides - 1;
				TweenLite.fromTo( slides[currentSlide], timing, {left: posX}, {left: 0, opacity: 1, zIndex: 1, ease:Power2.easeInOut} );
				tlAnims.staggerFromTo( slides[currentSlide].querySelectorAll('.anim-slide'), timing, {x: '200px', opacity: 0}, {x: 0, opacity: 1, ease:Power2.easeInOut}, 0.2 );
			}} );
		}

		for(i; i < nbSlides; i++){
			if(i > 0) TweenLite.set(slides[i], {left: posX, opacity: 0});
			if(slides[i].offsetHeight > height) height = slides[i].offsetHeight;
		}

		TweenLite.set(slider.querySelector('ul'), {height: height+'px'});
		TweenLite.set(slides[0].querySelectorAll('.anim-slide'), {opacity: 1});

		prev.setAttribute('id', 'prev');
		prev.innerHTML = 'Prev';
		slider.appendChild(prev);
		addEventListener(prev, 'click', slidePrev);

		next.setAttribute('id', 'next');
		next.innerHTML = 'Next';
		slider.appendChild(next);
		addEventListener(next, 'click', slideNext);
	}

	function animFirstSlide(container){
		if(document.getElementById('confiance') !== null){
			var container = document.getElementById('confiance'), slides = container.querySelectorAll('.slide'),
				posX = '25%', timing = 0.3, tlAnims = new TimelineLite();

			TweenLite.set(slides[0].querySelectorAll('.anim-slide'), {opacity: 0});
			if(myScroll >= container.offsetTop - windowHeight/2){
				firstAnimSlider = true;
				TweenLite.to( slides[0], timing, {left: posX, opacity: 0, onComplete: function(){
					TweenLite.fromTo( slides[1], timing, {left: '-'+posX}, {left: 0, opacity: 1, zIndex: 1, ease:Power2.easeInOut} );
					tlAnims.staggerFromTo( slides[1].querySelectorAll('.anim-slide'), timing, {x: '-200px', opacity: 0}, {x: 0, opacity: 1, ease:Power2.easeInOut}, 0.2 );
				}} );
				currentSlide = 1;
			}
		}else{
			firstAnimSlider = true;
		}
	}


	function animBackground(complete){
		if(animBgOn){
			if(complete){
				liveBgPos1 += 100;
				liveBgPosFinal1 += 100;
				liveBgPos2 -= 100;
				liveBgPosFinal2 -= 100;
				tweenBg = TweenLite.fromTo(masques, 25, {backgroundPosition: liveBgPos1+'% '+liveBgPos2+'%'}, {backgroundPosition: liveBgPosFinal1+'% '+liveBgPosFinal2+'%', ease:Linear.easeNone, onComplete: animBackground, onCompleteParams: ['complete']});
			}else{
				tweenBg.play();
			}
		}else{
			tweenBg.pause();
		}
	}

	function animBackgroundScroll(){
		if(myScroll > (masquesTop-windowHeight/2)){
			if(myScroll > ((masquesTop+masques.offsetHeight)-windowHeight/2)){
				TweenLite.set(masques, {css:{className: '-=on'}});
				animBgOn = false;
				animBackground();
			}else{
				TweenLite.set(masques, {css:{className: '+=on'}});
				animBgOn = true;
				animBackground();
			}
		}else{
			TweenLite.set(masques, {css:{className: '-=on'}});
			animBgOn = false;
			animBackground();
		}
	}


	function linksHoverYou(section){
		var links = section.querySelectorAll('a.animTxt'), nbLinks = links.length, i = 0;

		for(i; i<nbLinks; i++){
			(function(i){
				addEventListener(links[i], 'mouseover', function(){
					TweenLite.set(this, {css:{className:'+=on'}});
					TweenLite.set(section, {css:{className:'+=fade fade'+parseInt(i+1)}});
				});
				addEventListener(links[i], 'mouseout', function(){
					TweenLite.set(this, {css:{className:'-=on'}});
					TweenLite.set(section, {css:{className:'-=fade'}});
					TweenLite.set(section, {css:{className:'-=fade'+parseInt(i+1)}});
				});
			}(i));
		}
	}


	function bullshitGenerator(){
		var tabs = [purpleShits, pinkShits, blueShits, yellowShits, whiteShits],
			sections = [
				document.querySelector('.bg-purple'),
				document.querySelector('.bg-pink'),
				document.querySelector('.bg-blue'),
				document.querySelector('.bg-yellow'),
				document.querySelector('.bg-white')
			],
			//positions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'],
			positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom-center'],
			i = 0, j, buttons = [], imgsBefore = [], imgsAfter = [], divsAfter = [], rand = 0, rands = [], limit = 3,
			length = 0, transitionOpen = 0.8, transitionClose = 400, nbTabs = tabs.length;

		function removeYolo(){
			TweenMax.set(body, {css: {className: '-=yolo'}});
			removeEventListener(body, 'click', removeYolo);
		}
		function removeComic(){
			TweenMax.set(body, {css: {className: '-=comic'}});
			removeEventListener(body, 'click', removeComic);
		}

		function shitAppens(section, img, id){
			var imgById = section.querySelector('#'+id);
			if(imgById){
				TweenLite.set(imgById, {css:{className:'-=full'}});
				TweenLite.set(imgById, {css:{className:'-=big'}});
				setTimeout( function(){
					imgById.parentNode.removeChild(imgById);
				}, transitionClose );
			}else{
				section.appendChild(img);
				TweenLite.set(img, {css:{className:'+=big'}, delay: 0.01, onComplete: function(){
					TweenLite.set(img, {css:{className:'+=full'}, delay: transitionOpen});
				}});
			}
		}

		if(hasClass(body, 'page-template-presta')){
			positions = ['top-left', 'top-right', 'top-center'];
		}

		if(hasClass(body, 'single-prestation')){
			positions = ['top-right', 'bottom-left', 'bottom-right', 'bottom-center'];
		}

		for(i; i<nbTabs; i++){
			if(sections[i]){
				j = 0;
				buttons[i] = [];
				imgsBefore[i] = [];
				imgsAfter[i] = [];
				rands = [];
				divsAfter[i] = [];

				shuffle(tabs[i]);
				length = tabs[i].length < limit ? tabs[i].length : limit;

				for(j; j<length; j++){
					(function(i, j){
						rand = Math.floor( Math.random()*positions.length );
						if(rands[j-1] !== undefined && inArray(rand, rands)){
							while(inArray(rand, rands)){
								rand = Math.floor( Math.random()*positions.length );
							}
						}
						rands[j] = rand;

						imgsBefore[i][j] = document.createElement('img');
						imgsBefore[i][j].setAttribute('src', tabs[i][j][0]);

						buttons[i][j] = document.createElement('button');
						buttons[i][j].appendChild(imgsBefore[i][j]);
						TweenLite.set(buttons[i][j], {css:{className:'+=bullshitBtn '+positions[rands[j]]}});

						sections[i].appendChild(buttons[i][j]);

						if(tabs[i][j][1]){
							if(tabs[i][j][1] === 'click'){
								divsAfter[i][j] = document.createElement('div');
								divsAfter[i][j].setAttribute('id', 'pop-'+i+'-'+j);
								TweenLite.set(divsAfter[i][j], {css:{className:'+=bullshit'}});
								imgsAfter[i][j] = document.createElement('img');
								imgsAfter[i][j].setAttribute('src', tabs[i][j][2]);
								divsAfter[i][j].appendChild(imgsAfter[i][j]);

								// un écouteur sur le bouton pour faire apparaitre la connerie
								addEventListener(buttons[i][j], 'click', function(){
									shitAppens(sections[i], divsAfter[i][j], 'pop-'+i+'-'+j);
								});

								// un écouteur sur la connerie pour la faire disparaitre au clic
								addEventListener(divsAfter[i][j], 'click', function(){
									var that = this;
									TweenLite.set(that, {css:{className:'-=full'}});
									TweenLite.set(that, {css:{className:'-=big'}});
									setTimeout( function(){ that.parentNode.removeChild(that); }, transitionClose );
								});
							}else{
								if(tabs[i][j][1] === 'transform'){
									addEventListener(buttons[i][j], 'click', function(){
										if(hasClass(body, 'yolo')){
											removeYolo();
										}else{
											TweenMax.set(body, {css: {className: '+=yolo'}});
											setTimeout(function(){
												addEventListener(body, 'click', removeYolo);
											}, 1);
										}
									});
								}else if(tabs[i][j][1] === 'typo'){
									addEventListener(buttons[i][j], 'click', function(){
										if(hasClass(body, 'comic')){
											removeComic();
										}else{
											TweenMax.set(body, {css: {className: '+=comic'}});
											setTimeout(function(){
												addEventListener(body, 'click', removeComic);
											}, 1);
										}
									});
								}
							}
						}else{
							TweenLite.set(buttons[i][j], {css:{className:'+=not-a-btn'}});
						}

					}(i, j));
				}
			}
		}
	}

	function setSentences(container){
		var	nbSentences = sentences.length,
			btn = container.querySelector('button'),
			sentenceContainer = container.querySelector('p'),
			actualSentence = 0,
			cisors = document.getElementById('cisors'),
			cisorsTop = parseInt(getStyle(cisors, 'top')),
			cisorsLeft = parseInt(getStyle(cisors, 'left')),
			containerHeight = container.offsetHeight,
			containerWidth = container.offsetWidth,
			limitTop = cisorsTop, limitLeft = cisorsLeft,
			limitRight = containerWidth - 25,
			limitBottom = containerHeight - 28,
			cisorsMaxLeft = containerWidth + 24,
			cisorsMaxTop = containerHeight + 23,
			bottom = false;

		function animCisors(){
			TweenLite.set(cisors, {css:{className:'-=open'}});
			TweenLite.set(cisors, {css:{className:'+=close'}});

			if(cisorsLeft < limitRight && cisorsTop < limitBottom && !bottom){

				TweenLite.to(cisors, 0.3, {left: cisorsLeft+'px'});
				cisorsLeft += 15;

			}else if(cisorsLeft >= limitRight && cisorsTop < limitBottom){

				cisorsLeft = cisorsMaxLeft;
				TweenLite.set(cisors, {left: cisorsLeft+'px'});
				TweenLite.to(cisors, 0.3, {top: cisorsTop+'px'});
				TweenLite.set(cisors, {css:{className:'+=on-right'}});
				cisorsTop += 15;

			}else if(cisorsLeft >= limitRight && cisorsTop >= limitBottom && !bottom){

				cisorsLeft = cisorsMaxLeft - 4;
				cisorsTop = cisorsMaxTop;

				TweenLite.set(cisors, {top: cisorsTop+'px'});
				TweenLite.to(cisors, 0.3, {left: cisorsLeft+'px'});
				TweenLite.set(cisors, {css:{className:'-=on-right'}});
				TweenLite.set(cisors, {css:{className:'+=on-bottom'}});
				cisorsLeft -= 15;

				bottom = true;

			}else if(cisorsLeft > limitLeft && cisorsTop >= limitBottom && bottom){

				TweenLite.to(cisors, 0.3, {left: cisorsLeft+'px'});
				cisorsLeft -= 15;

			}else if(cisorsLeft <= limitLeft && cisorsTop > 25 && bottom){

				cisorsLeft = limitLeft - 55;
				TweenLite.set(cisors, {left: cisorsLeft+'px'});
				TweenLite.to(cisors, 0.3, {top: cisorsTop+'px'});
				TweenLite.set(cisors, {css:{className:'-=on-bottom'}});
				TweenLite.set(cisors, {css:{className:'+=on-left'}});
				cisorsTop -= 15;

			}else if(cisorsLeft <= limitLeft && cisorsTop <= 25){

				bottom = false;
				cisorsTop = limitTop;
				cisorsLeft = -20;
				TweenLite.set(cisors, {top: cisorsTop+'px'});
				TweenLite.set(cisors, {left: cisorsLeft+'px'});
				TweenLite.set(cisors, {css:{className:'-=on-left'}});
				cisorsLeft += 15;

			}
		}

		function newSentence(){
			var rand = Math.floor( Math.random()*nbSentences );

			// set size to the container <p> so it won't move on sentence change
			TweenLite.set(sentenceContainer, {width: sentenceContainer.offsetWidth + 'px', height: sentenceContainer.offsetHeight + 'px'});

			animCisors();

			if(rand === actualSentence){
				while(rand === actualSentence)
					rand = Math.floor( Math.random()*nbSentences );
			}
			actualSentence = rand;

			TweenLite.fromTo(sentenceContainer, 0.2, {opacity: 1}, {opacity: 0, onComplete: function(){
				btn.blur();
				sentenceContainer.querySelector('span').innerHTML = sentences[rand];
				TweenLite.fromTo(sentenceContainer, 0.2, {opacity: 0}, {opacity: 1});

				TweenLite.set(cisors, {css:{className:'-=close'}});
				TweenLite.set(cisors, {css:{className:'+=open'}});
			}});
		}

		addEventListener(btn, 'click', newSentence);

		addEventListener(container, 'mouseout', function(){
			TweenLite.set(cisors, {css:{className:'-=open'}});
		});
	}


	function animTxtScroll(){
		var splitTlAnimTxtLength = splitTlAnimTxt.length, i = 0, sections = [], containers = [];

		function addClassOn(containers){
			var i = 0, nbContainers = containers.length;
			for(i; i<nbContainers; i++){
				if(!hasClass(containers[i], 'on')){
					TweenLite.set(containers[i], {css:{className:'+=on'}, delay: 0.2});
				}
			}
		}

		function removeClassOn(containers){
			var i = 0, nbContainers = containers.length;
			for(i; i<nbContainers; i++){
				if(hasClass(containers[i], 'on')){
					TweenLite.set(containers[i], {css:{className:'-=on'}, delay: 0.2});
				}
			}
		}

		// anims txt
		for(i; i<splitTlAnimTxtLength; i++){
			sections[i] = animsTxt[i].closest('.section');
			containers[i] = sections[i].querySelector('.container');
			if(myScroll >= sections[i].offsetTop + windowHeight/2.5){
				decalTxt = '+=100';
				if(animsTxt[i].closest('.light') !== null){
					TweenLite.set(animsTxt[i].closest('.light').querySelectorAll('a'), {css: {className: '-=border'}});
				}
				splitTlAnimTxt[i].reverse();
				if(!hasClass(body, 'page-template-presta'))
					addClassOn(containers[i]);
			}else{
				if(myScroll >= sections[i].offsetTop - windowHeight/2){
					if(!hasClass(body, 'page-template-presta'))
						removeClassOn(containers[i]);
					splitTlAnimTxt[i].play();
				}else{
					if(animsTxt[i].closest('.light') !== null)
						TweenLite.set(animsTxt[i].closest('.light').querySelectorAll('a'), {css: {className: '-=border'}});
					splitTlAnimTxt[i].reverse();
					if(!hasClass(body, 'page-template-presta'))
						addClassOn(containers[i]);
				}
			}
		}

		// anims section opacity
		if(hasClass(body, 'home') && windowWidth > 767){
			var allSections = document.getElementsByClassName('section'), j = 0, nbSections = allSections.length, allContainers = [];
			for(j; j<nbSections; j++){
				allContainers[j] = allSections[j].querySelectorAll('.container');
				if(myScroll >= allSections[j].offsetTop + windowHeight/2.5){
					addClassOn(allContainers[j]);
				}else{
					myScroll >= allSections[j].offsetTop - windowHeight/2 ? removeClassOn(allContainers[j]) : addClassOn(allContainers[j]);
				}
			}
		}
	}

	function animTxt(splitText){
		var j = 0, splitTlAnimTxtLength = splitTlAnimTxt.length;
		for(j; j<splitTlAnimTxtLength; j++){
			splitText[j].split({type:'words'});
			var i = 0, words = splitText[j].words, nbWords = words.length;
			for(i; i<nbWords; i++){
				splitTlAnimTxt[j].from(words[i], 0.4, {ease:Expo.easeInOut, css:{opacity:0, scaleX:0.5, scaleY:0.5, y:decalTxt}}, i * 0.03);
			}
		}
	}

	function animMenuScroll(){
		if(myScroll >= pageContent.offsetTop - 100){
			TweenLite.set(header, {css: {className: '+=purple'}});
			TweenLite.set(menu, {css: {className: '+=purple'}});
		}else{
			TweenLite.set(header, {css: {className: '-=purple'}});
			TweenLite.set(menu, {css: {className: '-=purple'}});
		}
	}

	function animFixedMenuStep(section1, section2){
		if(myScroll > 200 && myScroll + windowHeight < htmlTag.offsetHeight){
			var links = fixedMenuStep.querySelectorAll('li');
			TweenLite.to(fixedMenuStep, 0.3, {bottom: 0});

			if(myScroll >= section1.offsetTop){
				if(myScroll >= section2.offsetTop){
					// etat 2
					TweenLite.set(links[0], {css: {className: 'on up'}});
					TweenLite.set(links[1], {css: {className: ''}});
				}else{
					// etat 1
					TweenLite.set(links[0], {css: {className: ''}});
					TweenLite.set(links[1], {css: {className: 'on down'}});
				}
			}else{
				// etat 1
				TweenLite.set(links[0], {css: {className: ''}});
				TweenLite.set(links[1], {css: {className: 'on down'}});
			}
		}else{
			TweenLite.to(fixedMenuStep, 0.3, {bottom: '-70px'});
		}
	}

	function animFixedMenu(){
		if(hasClass(fixedMenu, 'cats-visible')){
			TweenLite.set(fixedMenu, {bottom: 0});
		}else{
			myScroll > 200 && myScroll + windowHeight < htmlTag.offsetHeight ? TweenLite.to(fixedMenu, 0.3, {bottom: 0}) : TweenLite.to(fixedMenu, 0.3, {bottom: '-70px'});
		}
	}

	function setSmallSlider(slider){
		var slides = slider.querySelectorAll('.small-slide'),
			nbSlides = slides.length, i = 0,
			height = 0, posX = '25%', timing = 0.3,
			buttons = [], buttonsLi = [], buttonsList = document.createElement('ul'),
			currentSlidePresta = 0, links = [], j = 0, newIndex = 0;

		if(hasClass(htmlTag, 'lt-ie9')) posX = '150%';

		function slide(newSlidePresta){
			TweenLite.to( slider.querySelector('.small-slide.actif'), timing, {left: posX, opacity: 0, onComplete: function(){
				TweenLite.set(slider.querySelector('.small-slide.actif'), {css: {className: '-=actif'}});
				TweenLite.set(slides[newSlidePresta], {css: {className: '+=actif'}});
				TweenLite.fromTo( slides[newSlidePresta], timing, {left: '-'+posX}, {left: 0, opacity: 1, ease:Power2.easeInOut} );
				TweenLite.set(buttons, {css: {className: ''}});
				TweenLite.set(buttons[newSlidePresta], {css: {className: 'actif'}});
			}} );
		}

		function slidePrev(newSlidePresta){
			TweenLite.to( slider.querySelector('.small-slide.actif'), timing, {left: '-'+posX, opacity: 0, onComplete: function(){
				TweenLite.set(slider.querySelector('.small-slide.actif'), {css: {className: '-=actif'}});
				TweenLite.set(slides[newSlidePresta], {css: {className: '+=actif'}});
				TweenLite.fromTo( slides[newSlidePresta], timing, {left: posX}, {left: 0, opacity: 1, ease:Power2.easeInOut} );
				TweenLite.set(buttons, {css: {className: ''}});
				TweenLite.set(buttons[newSlidePresta], {css: {className: 'actif'}});
			}} );
		}

		if(nbSlides > 1){
			buttonsList.setAttribute('class', 'small-nav');
			slider.appendChild(buttonsList);
		}

		for(i; i < nbSlides; i++){
			if(nbSlides > 1){
				buttonsLi[i] = document.createElement('li');
				buttons[i] = document.createElement('button');
				buttons[i].innerHTML = 'Slide ' + parseInt(i+1);
				buttonsLi[i].appendChild(buttons[i]);
				buttonsList.appendChild(buttonsLi[i]);
				addEventListener(buttons[i], 'click', function(){
					newIndex = getIndex(this.parentNode);
					getIndex(slider.querySelector('.small-slide.actif')) < newIndex ? slide(newIndex) : slidePrev(newIndex);
				});
				if(i > 0) TweenLite.set(slides[i], {left: posX, opacity: 0});
			}
			if(slides[i].offsetHeight > height) height = slides[i].offsetHeight;

			links[i] = slides[i].querySelectorAll('a');

			for(j; j<links[i].length; j++){
				if(links[i][j].getAttribute('href').indexOf('#') === 0){
					addEventListener(links[i][j], 'click', function(e){
						e.preventDefault();
						var href = this.getAttribute('href').replace('#', ''), slideTarget = document.getElementById(href),
							newIndex = getIndex(slideTarget);
						getIndex(slider.querySelector('.small-slide.actif')) < newIndex ? slide(newIndex) : slidePrev(newIndex);
					});
				}
			}
		}

		TweenLite.set(slider.querySelector('ul'), {height: height+'px'});
		if(nbSlides > 1){
			TweenLite.set(slides[0], {css: {className: '+=actif'}});
			TweenLite.set(buttons[0], {css: {className: 'actif'}});
		}
	}

	function setPrestaFiltres(prestaFiltresContainer){
		var prestaFiltres = prestaFiltresContainer.querySelectorAll('button'), i = 0, j = 0,
			nbFiltres = prestaFiltres.length, prestaList = prestaFiltresContainer.parentNode.querySelector('.presta-list'),
			prestaItems = prestaList.querySelectorAll('.presta-item'), prestaSection = prestaFiltresContainer.closest('.section'),
			nbItems = prestaItems.length, datasItem = [];

		for(j; j<nbItems; j++){
			datasItem[j] = prestaItems[j].getAttribute('data-cat').split(',');
		}

		for(i; i<nbFiltres; i++){
			addEventListener(prestaFiltres[i], 'click', function(e){
				var data = this.getAttribute('data-cat-name'), dataItems = [];

				j = 0;
				for(j; j<nbItems; j++){
					var x = 0;
					for(x; x<datasItem[j].length-1; x++){
						if(data === datasItem[j][x]){
							dataItems.push(prestaItems[j]);
						}
					}
				}

				scrollTo(prestaSection.offsetTop + 60, 300);

				TweenLite.set(prestaFiltres, {css: {className: '-=actif'}});
				TweenLite.set(this, {css: {className: '+=actif'}})

				if(data !== 'all'){
					TweenLite.set(prestaItems, {css: {className: '+=hidden'}});
					TweenLite.set(dataItems, {css: {className: '-=hidden'}});
				}else{
					TweenLite.set(prestaItems, {css: {className: '-=hidden'}});
				}
			});
		}
	}

	function parallaxPresta(elt){
		var eltParent = elt[0].parentNode.parentNode;

		if(isVisible(eltParent)){
			if(scrollDir < 0){
				TweenLite.to(elt[0], 0.1, {bottom: '+=1px', rotation: '-=.2deg', ease:Linear.easeNone});
				TweenLite.to(elt[1], 0.1, {top: '+=1.5px', ease:Linear.easeNone});
			}else{
				TweenLite.to(elt[0], 0.1, {bottom: '-=1px', rotation: '+=.2deg', ease:Linear.easeNone});
				TweenLite.to(elt[1], 0.1, {top: '-=1.5px', ease:Linear.easeNone});
			}
		}
	}



	/**** ON SCROLL ****/
	window.onscroll = function(e){
		myScroll = document.documentElement['scrollTop'] || document.body['scrollTop'];

		if(!isMobile.any){
			animTxtScroll();

			if(masques !== null)
				animBackgroundScroll();

			if(!firstAnimSlider && myScroll > 0)
				animFirstSlide();

			if(fixedMenuStep !== null){
				if(prestaSectionAteliers !== null && prestaSectionInterventions !== null){
					animFixedMenuStep(prestaSectionAteliers, prestaSectionInterventions);
				}
				if(aboutSectionTeam !== null && aboutSectionIntervenants !== null){
					animFixedMenuStep(aboutSectionTeam, aboutSectionIntervenants);
				}
			}

			if(fixedMenu !== null)
				animFixedMenu();
		}

		if(pageContent !== null && windowWidth > 979 && (!hasClass(body, 'single-prestation') || windowHeight <= 800))
			animMenuScroll();

		if(hasClass(body, 'page-template-presta')){
			detectScrollDir();
			parallaxPresta(document.querySelectorAll('.bg-ateliers'));
			parallaxPresta(document.querySelectorAll('.bg-interventions'));
		}

		if(hasClass(body, 'single-prestation') && windowHeight > 800 && windowWidth > 979){
			var prestaSingleHead = document.querySelector('.head'),
				sectionPrestaHead = prestaSingleHead.querySelector('.section-cell'),
				backPrestaHead = prestaSingleHead.querySelector('.back-link'),
				imgPrestaHead = sectionPrestaHead.querySelector('.img-presta'),
				stPrestaHead = sectionPrestaHead.querySelectorAll('.sup-title'),
				titlePrestaHead = sectionPrestaHead.querySelector('h1'),
				btnPrestaHead = sectionPrestaHead.querySelector('.btn'),
				ratio = 0.8,
				newMargin = windowHeight > 960 ? 550 : 450,
				newTopBtn = 90,
				newTopBack = newMargin + 100;

			if(windowHeight <= 850){
				newMargin = 350;
				newTopBack = newMargin + 100;
			}

			detectScrollDir();

			if(myScroll*ratio < newMargin){
				TweenLite.set(prestaSingleHead, {y: -myScroll*ratio+'px'});
				TweenLite.set(sectionPrestaHead, {paddingTop: myScroll*ratio+'px'});
				TweenLite.set(pageContent, {y: (myScroll*ratio)/5+'px'});
				TweenLite.set(document.getElementById('wrapper'), {paddingBottom: (myScroll*ratio)/5+'px'});
				if(btnPrestaHead !== null) TweenLite.set(btnPrestaHead, {bottom: 20+myScroll*ratio*0.11+'px'});
				TweenLite.set(backPrestaHead, {top: 100+myScroll*ratio+'px'});
				if(myScroll*ratio >= newMargin/5 && scrollDir < 0){
					TweenLite.to(imgPrestaHead, 0.3, {opacity: 0});
				}
				if(myScroll*ratio >= newMargin/2 && scrollDir < 0){
					TweenLite.to(stPrestaHead, 0.3, {opacity: 0});
					TweenLite.set(titlePrestaHead, {css: {className: '+=small'}});
				}else if(myScroll*ratio < newMargin/2 && scrollDir > 0){
					TweenLite.to(stPrestaHead, 0.3, {opacity: 1});
					TweenLite.set(titlePrestaHead, {css: {className: '-=small'}});
					TweenLite.to(imgPrestaHead, 0.3, {opacity: 1});
				}
			}else if(myScroll*ratio > newMargin){
				TweenLite.set(prestaSingleHead, {y: '-'+newMargin+'px'});
				TweenLite.set(sectionPrestaHead, {paddingTop: newMargin+'px'});
				TweenLite.set(pageContent, {y: '110px'});
				TweenLite.set(document.getElementById('wrapper'), {paddingBottom: '110px'});
				if(btnPrestaHead !== null) TweenLite.set(btnPrestaHead, {bottom: newTopBtn+'px'});
				TweenLite.set(backPrestaHead, {top: newTopBack+'px'});

				TweenLite.set(imgPrestaHead, {opacity: 0});
				TweenLite.set(stPrestaHead, {opacity: 0});
				TweenLite.set(titlePrestaHead, {css: {className: '+=small'}});
			}
		}

		if((hasClass(body, 'page-template-presta') || hasClass(body, 'home') || hasClass(body, 'page-template-about')) && !hasClass(htmlTag, 'lt-ie10')){
			var i = 0, sections = document.querySelectorAll('.section'), nbSections = sections.length, hash = '';
			for(i; i<nbSections; i++){
				if(myScroll >= sections[i].offsetTop){
					hash = i !== 0 ? '#'+sections[i].id : '#';
				}
			}
			if(window.location.hash !== hash){
				history.replaceState(null, null, hash);
			}
		}

	}

	window.onresize = function(){
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth;

		if(hasClass(htmlTag, 'menuOpen')){
			windowWidth > 979 ? TweenLite.set(document.getElementById('fdMenu'), {css: {className: '+=close'}}) : TweenLite.set(document.getElementById('fdMenu'), {css: {className: '-=close'}});
		}else if(hasClass(htmlTag, 'menuClose') && windowWidth > 979){
			TweenLite.set(menu.querySelector('div'), {rotationY: 0});
		}
	}


	/**** INIT (ON DOCUMENT READY) ****/

	if(isMobile.any){
		TweenLite.set(body, {css: {className: '+=isMobile'}});
	}else{
		var logos = document.querySelectorAll('.logo'),
			logoSprites = ['mouche', 'banane', 'moustache', 'bisou'],
			rand = Math.floor(Math.random()*logoSprites.length),
			tweenLogo = [], i = 0;

		for(i; i<logos.length; i++){
			(function(i){
				tweenLogo[i] = TweenMax.spriteSheet(logos[i], {
					width: 720,
					stepX: 180,
					stepY: 180,
					count: 24
				}, 1, { delay: 0.1, paused: true });

				TweenLite.set(logos[i], {css: {className: '+=sprite '+logoSprites[rand]}});
				addEventListener(logos[i], 'mouseover', function(){
					if(!hasClass(header, 'purple'))
						tweenLogo[i].play();
				});
				addEventListener(logos[i], 'mouseout', function(){
					if(!hasClass(header, 'purple'))
						tweenLogo[i].reverse();
				});
			}(i));
		}
	}

	var burger = document.getElementById('burger');
	addEventListener(burger, 'click', function(){
		if(hasClass(htmlTag, 'menuOpen')){
			TweenLite.set(htmlTag, {css: {className: '-=menuOpen'}});
			TweenLite.set(htmlTag, {css: {className: '+=menuClose'}});
			TweenLite.to(menu.querySelector('div'), 0.4, {left: '100%', onComplete: function(){
				TweenLite.set(menu.querySelector('div'), {rotationY: 90});
			}});
		}else{
			TweenLite.set(htmlTag, {css: {className: '+=menuOpen'}});
			TweenLite.set(htmlTag, {css: {className: '-=menuClose'}});
			TweenLite.to(menu.querySelector('div'), 1, {rotationY: 0, left: 0, ease:Bounce.easeOut});
		}
	});

	if(purpleShits && !hasClass(htmlTag, 'lt-ie9')){
		bullshitGenerator();
	}

	if(!hasClass(htmlTag, 'lt-ie9')){
		animsTxt = document.querySelectorAll('.animTxt');
		if(animsTxt.length){
			var i = 0, nbAnims = animsTxt.length, splitText = [];

			for(i; i<nbAnims; i++){
				(function(i){
					splitText[i] = new SplitText(animsTxt[i], {type:'words'});
					splitTlAnimTxt[i] = new TimelineLite({onComplete: function(){
						if(animsTxt[i].closest('.light') !== null)
							TweenLite.set(animsTxt[i].closest('.light').querySelectorAll('a'), {css: {className: '+=border'}});
					}});
				}(i));
			}
			animTxt(splitText);
		}
	}

	var phrase = document.getElementById('phrase-creuse');
	if(phrase !== null) setSentences(phrase);

	var youSection = document.getElementById('vous');
	if(youSection !== null && !isMobile.any) linksHoverYou(youSection);

	var sliders = document.querySelectorAll('.slider');
	if(sliders.length){
		var i = 0, nbSliders = sliders.length;
		for(i; i<nbSliders; i++){
			setSlider(sliders[i]);
		}
	}

	var smallSlider = document.getElementById('smallSlider');
	if(smallSlider !== null) setSmallSlider(smallSlider);

	if(fixedMenuStep !== null){
		var linksFixedMenu = fixedMenuStep.querySelectorAll('li');
		TweenLite.set(linksFixedMenu[0], {width: linksFixedMenu[0].clientWidth+2, left: 0, right: 0});
		TweenLite.set(linksFixedMenu[1], {width: linksFixedMenu[1].clientWidth+2, left: 0, right: 0});
	}

	if(!isMobile.any){
		var live = document.getElementById('live');
		masques = null;
		if(live !== null){
			masques = live.querySelector('#bgMasques');
			animBgOn = false;
			liveBgPos1 = -100;
			liveBgPosFinal1 = 0;
			liveBgPos2 = 200;
			liveBgPosFinal2 = 100;
			masquesTop = document.getElementById('live').offsetTop;
			tweenBg = TweenLite.fromTo(masques, 25, {backgroundPosition: liveBgPos1+'% '+liveBgPos2+'%'}, {backgroundPosition: liveBgPosFinal1+'% '+liveBgPosFinal2+'%', ease:Linear.easeNone, onComplete: animBackground, onCompleteParams: ['complete'], paused: true});
			animBackground();
		}

		var blogList = document.querySelector('.blog-list');
		if(blogList !== null){
			var blackLinks = blogList.querySelectorAll('.black-hover-link'),
				i = 0, nbBlackLinsk = blackLinks.length, tlBlackLinks = [], tw1 = [], tw2 = [], tw3 = [], tw4 = [];
			for(i; i < nbBlackLinsk; i++){
				(function(i){
					if(windowWidth > 480){
						tw1[i] = new TweenMax.to(blackLinks[i].querySelector('.hover'), 0.15, {padding: '10px', top: '12px', overflow: 'visible', ease: Linear.easeNone});
					}else{
						tw1[i] = new TweenMax.to(blackLinks[i].querySelector('.hover'), 0.15, {padding: '10px', top: '0', height: '250px', overflow: 'visible', ease: Linear.easeNone});
					}
					tw2[i] = new TweenMax.to(blackLinks[i].querySelector('.sup-title'), 0.2, {opacity: '1', marginTop: '0', ease: Linear.easeNone});
					tw3[i] = new TweenMax.to(blackLinks[i].querySelector('.content'), 0.25, {opacity: '1', marginTop: '0', ease: Linear.easeNone});

					tlBlackLinks[i] = new TimelineMax({paused: true}).add(tw1[i]).add(tw2[i]).add(tw3[i]);
					tw4[i] = tlBlackLinks[i].tweenFromTo(0, 0.6, {ease: Power2.easeInOut, paused: true});

					addEventListener(blackLinks[i], 'mouseover', function(){
						tw4[i].play();
					});
					addEventListener(blackLinks[i], 'mouseout', function(){
						tw4[i].reverse();
					});

				}(i));
			}
		}

		var instagram = document.getElementById('instagram');
		if(instagram !== null){
			var instagramLink = instagram.querySelector('.black-hover-link'),

				tw1Inst = new TweenMax.to(instagramLink.querySelector('.hover'), 0.15, {padding: '10px', top: '0', height: '250px', overflow: 'visible', ease: Power2.easeOut}),
				tw2Inst = new TweenMax.to(instagramLink.querySelector('.sup-title'), 0.2, {opacity: '1', marginTop: '0', ease: Power2.easeOut}),
				tw3Inst = new TweenMax.to(instagramLink.querySelector('.content'), 0.25, {opacity: '1', marginTop: '0', ease: Power2.easeOut}),

				tlInstagramLink = new TimelineMax({paused: true}).add(tw1Inst).add(tw2Inst).add(tw3Inst),
				tw4Inst = tlInstagramLink.tweenFromTo(0, 0.6, {ease: Power2.easeInOut, paused: true});

			addEventListener(instagramLink, 'mouseover', function(){
				tw4Inst.play();
			});
			addEventListener(instagramLink, 'mouseout', function(){
				tw4Inst.reverse();
			});
		}

		var prestaList = document.querySelectorAll('.presta-list');
		if(prestaList !== null){
			var j = 0, nbPrestaList = prestaList.length, tlSquareLinks = [], twS1 = [],
			twS2 = [], twS3 = [], twS4 = [], squareLinks = [], nbSquareLinsk = [], i = 0;

			for(j; j < nbPrestaList; j++){
				i = 0;
				squareLinks[j] = prestaList[j].querySelectorAll('.square-link');
				nbSquareLinsk[j] = squareLinks[j].length;
				tlSquareLinks[j] = []; twS1[j] = []; twS2[j] = []; twS3[j] = []; twS4[j] = [];

				for(i; i < nbSquareLinsk[j]; i++){
					(function(j, i){

						twS1[j][i] = new TweenMax.to(squareLinks[j][i].querySelector('.hover'), 0.15, {top: '12px', overflow: 'visible', ease: Linear.easeNone});
						twS2[j][i] = new TweenMax.to(squareLinks[j][i].querySelector('.cat'), 0.25, {opacity: '1', marginTop: '10px', ease: Linear.easeNone});
						twS3[j][i] = new TweenMax.to(squareLinks[j][i].querySelector('.link'), 0.25, {opacity: '1', marginTop: '0', ease: Linear.easeNone});

						tlSquareLinks[j][i] = new TimelineMax({paused: true}).add(twS1[j][i]).add(twS2[j][i]).add(twS3[j][i]);
						twS4[j][i] = tlSquareLinks[j][i].tweenFromTo(0, 0.65, {ease: Power2.easeInOut, paused: true});

						addEventListener(squareLinks[j][i], 'mouseover', function(){
							twS4[j][i].play();
						});
						addEventListener(squareLinks[j][i], 'mouseout', function(){
							twS4[j][i].reverse();
						});

					}(j, i));
				}

			}
		}

		var prestaLinksBg = document.querySelectorAll('.contact-link');
		if(prestaLinksBg != null){
			var i = 0, nbPrestaLinksBg = prestaLinksBg.length, tweenPrestaBg = [], pos = 40, thisColor = '';

			for(i; i<nbPrestaLinksBg; i++){
				(function(i){
					thisColor = getComputedStyle(prestaLinksBg[i])['backgroundColor'];

					tweenPrestaBg[i] = TweenMax.to(prestaLinksBg[i], 1, {backgroundPosition: '+='+pos+'px -='+pos+'px', ease:Linear.easeNone, paused: true, onComplete: function(){
						pos += 40;
						this.updateTo({backgroundPosition: pos+'px '+pos+'px'}, true);
					}});

					addEventListener(prestaLinksBg[i], 'mouseover', function(){
						TweenMax.to(prestaLinksBg[i], 0.8, {backgroundColor: '#fff', ease: Bounce.easeOut});
						tweenPrestaBg[i].play();
					});
					addEventListener(prestaLinksBg[i], 'mouseout', function(){
						TweenMax.to(prestaLinksBg[i], 0.3, {backgroundColor: thisColor});
						tweenPrestaBg[i].pause();
					});
				}(i));
			}
		}
	}

	var prestaFiltresContainers = document.querySelectorAll('.presta-filtres');
	if(prestaFiltresContainers.length){
		var i = 0, nbPrestaFiltresContainers = prestaFiltresContainers.length;
		for(i; i<nbPrestaFiltresContainers; i++){
			setPrestaFiltres(prestaFiltresContainers[i]);
		}
	}


	var catsBtn = document.getElementById('catsBtn');
	if(catsBtn !== null){
		var catsMenu = catsBtn.closest('#fixedMenu'), closeCats = document.getElementById('closeCats');
		addEventListener(catsBtn, 'click', function(){
			hasClass(catsMenu, 'cats-visible') ? TweenLite.set(catsMenu, {css: {className: '-=cats-visible'}}) : TweenLite.set(catsMenu, {css: {className: '+=cats-visible'}});
		});
		addEventListener(closeCats, 'click', function(){
			if(hasClass(catsMenu, 'cats-visible')){
				TweenLite.set(catsMenu, {css: {className: '-=cats-visible'}});
			}
		});
	}

	var msgTextarea = document.getElementById('message');
	if(msgTextarea !== null){
		addEventListener(msgTextarea, 'click', function(){
			if(!hasClass(this, 'on')){
				this.innerHTML = '';
				TweenLite.set(this, {css: {className: '+=on'}});
			}
		});
	}

	var sujetSelect = document.getElementById('sujet');
	if(sujetSelect !== null){
		var options = sujetSelect.querySelectorAll('option');
		addEventListener(sujetSelect, 'change', function(){
			if(!options[0].selected)
				TweenLite.set(this, {css: {className: '+=valid'}});
		});
	}

	var searchBtn = document.getElementById('searchsubmit');
	if(searchBtn !== null){
		var searchInput = document.getElementById('searchinput'),
			searchForm = document.getElementById('searchform');
		addEventListener(searchBtn, 'click', function(e){
			e.preventDefault();
			searchInput.value.length ? searchForm.submit() : searchInput.focus();
		});
	}


	var scrollToBtn = document.querySelectorAll('.scrollTo');
	if(scrollToBtn.length && !isMobile.windows.phone){
		var i = 0, nbBtn = scrollToBtn.length;
		for(i; i<nbBtn; i++){
			addEventListener(scrollToBtn[i], 'click', function(e){
				e.preventDefault();
				var target = document.getElementById(this.getAttribute('href').replace('#', ''));
				scrollTo(target.offsetTop, 300);
				this.blur();
			});
		}
	}
}

function ready(fn){
	if(document.readyState !== 'loading'){
		fn();
	}else if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', fn);
	}else{
		document.attachEvent('onreadystatechange', function(){
			if(document.readyState !== 'loading')
				fn();
		});
	}
}
ready(init);
