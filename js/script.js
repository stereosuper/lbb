/**** VARIABLES ****/
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

/*function addClass(el, className){
	el.classList ? el.classList.add(className) : el.className += ' ' + className;
}
function removeClass(el, className){
	el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp('(^|\\b)' + className.split('').join('|') + '(\\b|$)', 'gi'), ' ');
}*/
function hasClass(el, className){
	return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
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
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();




function setSlider(slider){
	var slides = slider.querySelectorAll('.slide'),
		nbSlides = slides.length,
		currentSlide = 0, i = 0,
		next = document.createElement('button'),
		prev = document.createElement('button'),
		height = 0, posX = '25%', timing = .3,
		tlAnims = new TimelineLite();

	function slideNext(){
		TweenLite.to( slides[currentSlide], timing, {left: posX, opacity: 0, onComplete: function(){
			currentSlide < nbSlides - 1 ? currentSlide ++ : currentSlide = 0;
			TweenLite.fromTo( slides[currentSlide], timing, {left: '-'+posX}, {left: 0, opacity: 1, ease:Power2.easeInOut} );
			tlAnims.staggerFromTo( slides[currentSlide].querySelectorAll('.anim-slide'), timing, {x: '-200px', opacity: 0}, {x: 0, opacity: 1, ease:Power2.easeInOut}, .2 );
		}} );
		//	TweenLite.delayedCall(5, slideNext);
	}

	function slidePrev(){
		TweenLite.to( slides[currentSlide], timing, {left: '-'+posX, opacity: 0, onComplete: function(){
			currentSlide > 0 ? currentSlide -- : currentSlide = nbSlides - 1;
			TweenLite.fromTo( slides[currentSlide], timing, {left: posX}, {left: 0, opacity: 1, ease:Power2.easeInOut} );
			tlAnims.staggerFromTo( slides[currentSlide].querySelectorAll('.anim-slide'), timing, {x: '200px', opacity: 0}, {x: 0, opacity: 1, ease:Power2.easeInOut}, .2 );
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

	//TweenLite.delayedCall(5, slideNext);
}

function animBackground(container){
	liveBgPos1 += 100;
	liveBgPosFinal1 += 100;
	liveBgPos2 -= 100;
	liveBgPosFinal2 -= 100;
	TweenLite.fromTo(container, 25, {backgroundPosition: liveBgPos1+'% '+liveBgPos2+'%'}, {backgroundPosition: liveBgPosFinal1+'% '+liveBgPosFinal2+'%', ease:Linear.easeNone, onComplete: animBackground, onCompleteParams: [container]});
}

function linksHoverYou(section){
	var links = section.querySelectorAll('a'), nbLinks = links.length, i = 0;

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
	// for each element: img to display, action to execute (false si rien), img to display after the action (false si rien)
	var purpleShits = [
			['img/bullshit/profond-purple.png', false, false],
			['img/bullshit/entreprise-purple.png', false, false]
		],
		yellowShits = [
			['img/bullshit/no-clic-yellow.png', 'click', 'img/bullshit/licorne.gif'],
			['img/bullshit/fuck-yellow.png', false, false]
		],
		blueShits = [
			['img/bullshit/no-clic-blue.png', 'click', 'img/bullshit/lama.jpg'],
			['img/bullshit/profond-blue.png', false, false]
		],
		tabs = [purpleShits, yellowShits, blueShits],
		sections = [
			document.getElementsByClassName('bg-purple')[0],
			document.getElementsByClassName('bg-yellow')[0],
			document.getElementsByClassName('bg-blue')[0]
		],
		positions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'],
		i = 0, j, buttons = [], imgsBefore = [], imgsAfter = [], divsAfter = [], rands = [], limit = 3, length = 0,
		transitionOpen = .8, transitionClose = 400, nbTabs = tabs.length;

	function shitAppens(section, img, id){
		var imgById = section.querySelector('#'+id);
		if(imgById){
			TweenLite.set(imgById, {css:{className:'-=full'}});
			TweenLite.set(imgById, {css:{className:'-=big'}});
			setTimeout( function(){
				imgById.remove();
			}, transitionClose );
		}else{
			section.appendChild(img);
			TweenLite.set(img, {css:{className:'+=big'}, delay: .01, onComplete: function(){
				TweenLite.set(img, {css:{className:'+=full'}, delay: transitionOpen});
			}});
		}	
	}

	for(i; i<nbTabs; i++){
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
				rands[j] = Math.floor( Math.random()*positions.length );
				if(rands[j-1] !== undefined && rands[j] === rands[j-1]){
					while(rands[j] === rands[j-1])
						rands[j] = Math.floor( Math.random()*positions.length );
				}

				imgsBefore[i][j] = document.createElement('img');
				imgsBefore[i][j].setAttribute('src', tabs[i][j][0]);

				buttons[i][j] = document.createElement('button');
				buttons[i][j].appendChild(imgsBefore[i][j]);
				TweenLite.set(buttons[i][j], {css:{className:'+=bullshitBtn '+positions[rands[j]]}});

				sections[i].appendChild(buttons[i][j]);

				if(tabs[i][j][1]){
					divsAfter[i][j] = document.createElement('div');
					divsAfter[i][j].setAttribute('id', 'pop-'+i+'-'+j);
					TweenLite.set(divsAfter[i][j], {css:{className:'+=bullshit'}});
					imgsAfter[i][j] = document.createElement('img');
					imgsAfter[i][j].setAttribute('src', tabs[i][j][2]);
					divsAfter[i][j].appendChild(imgsAfter[i][j]);

					// un écouteur sur le bouton pour faire apparaitre la connerie
					addEventListener(buttons[i][j], tabs[i][j][1], function(){
						shitAppens(sections[i], divsAfter[i][j], 'pop-'+i+'-'+j); 
					});

					// un écouteur sur la connerie pour la faire disparaitre au clic
					addEventListener(divsAfter[i][j], tabs[i][j][1], function(){
						var that = this;
						TweenLite.set(that, {css:{className:'-=full'}});
						TweenLite.set(that, {css:{className:'-=big'}});
						setTimeout( function(){ that.remove(); }, transitionClose );
					});
				}else{
					TweenLite.set(buttons[i][j], {css:{className:'+=not-a-btn'}});
				}

			}(i, j));
		}
	}
	
}

function setSentences(container){
	var sentences = [
			"Stop aux acronymes, travaillons l'U.M.1",
			"Une autre phrase creuse",
			"Des trucs et des machins"
		],
		nbSentences = sentences.length,
		btn = container.querySelector('button'),
		sentenceContainer = container.querySelector('p'),
		actualSentence = 0,
		cisors = document.getElementById('cisors'),
		cisorsTop = parseInt(getStyle(cisors, 'top')),
		cisorsLeft = parseInt(getStyle(cisors, 'left')),
		containerHeight = container.offsetHeight,
		containerWidth = container.offsetWidth,
		limitTop = cisorsTop,
		limitLeft = cisorsLeft,
		limitRight = containerWidth - 25,
		limitBottom = containerHeight - 28,
		cisorsMaxLeft = containerWidth + 24,
		cisorsMaxTop = containerHeight + 23,
		bottom = false;

	function animCisors(){
		TweenLite.set(cisors, {css:{className:'-=open'}});
		TweenLite.set(cisors, {css:{className:'+=close'}});

		if(cisorsLeft < limitRight && cisorsTop < limitBottom && !bottom){

			TweenLite.to(cisors, .3, {left: cisorsLeft+'px'});
			cisorsLeft += 15;
		
		}else if(cisorsLeft >= limitRight && cisorsTop < limitBottom){

			cisorsLeft = cisorsMaxLeft;
			TweenLite.set(cisors, {left: cisorsLeft+'px'});
			TweenLite.to(cisors, .3, {top: cisorsTop+'px'});
			TweenLite.set(cisors, {css:{className:'+=on-right'}});
			cisorsTop += 15;

		}else if(cisorsLeft >= limitRight && cisorsTop >= limitBottom && !bottom){
				
			cisorsLeft = cisorsMaxLeft - 4;
			cisorsTop = cisorsMaxTop;

			TweenLite.set(cisors, {top: cisorsTop+'px'});
			TweenLite.to(cisors, .3, {left: cisorsLeft+'px'});
			TweenLite.set(cisors, {css:{className:'-=on-right'}});
			TweenLite.set(cisors, {css:{className:'+=on-bottom'}});
			cisorsLeft -= 15;

			bottom = true;

		}else if(cisorsLeft > limitLeft && cisorsTop >= limitBottom && bottom){
			
			TweenLite.to(cisors, .3, {left: cisorsLeft+'px'});
			cisorsLeft -= 15;

		}else if(cisorsLeft <= limitLeft && cisorsTop > 25 && bottom){
			
			cisorsLeft = limitLeft - 55;
			TweenLite.set(cisors, {left: cisorsLeft+'px'});
			TweenLite.to(cisors, .3, {top: cisorsTop+'px'});
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
		animCisors();

		var rand = Math.floor( Math.random()*nbSentences );
		if(rand === actualSentence){
			while(rand === actualSentence)
				rand = Math.floor( Math.random()*nbSentences );
		}
		actualSentence = rand;

		TweenLite.fromTo(sentenceContainer, .2, {opacity: 1}, {opacity: 0, onComplete: function(){
			btn.blur();
			sentenceContainer.querySelector('span').innerHTML = sentences[rand];
			TweenLite.fromTo(sentenceContainer, .2, {opacity: 0}, {opacity: 1});

			TweenLite.set(cisors, {css:{className:'-=close'}});
			TweenLite.set(cisors, {css:{className:'+=open'}});
		}});
	}

	// set size to the container <p> so it won't move on sentence changing
	TweenLite.set(sentenceContainer, {width: sentenceContainer.offsetWidth + 'px', height: sentenceContainer.offsetHeight + 'px'});

	addEventListener(btn, 'click', newSentence);

	addEventListener(container, 'mouseout', function(){
		TweenLite.set(cisors, {css:{className:'-=open'}});
	});
}


/*function animSection(section){
	TweenLite.set(section, {css:{className:'+=animTxtDone'}});
}*/

function animTxtScroll(splitTl, decalTxt, sections){
	console.log(window.offsetHeight);
	window.onscroll = function(e){
		var myScroll = document.documentElement['scrollTop'] || document.body['scrollTop'],
			i = 0, splitTlLength = splitTl.length;
		for(i; i<splitTlLength; i++){
			if(myScroll > 100){
				decalTxt = '+=100';
				splitTl[i].reverse();
				if(sections[i] !== undefined && !hasClass(sections[i], 'animTxtDone')){
					TweenLite.set(sections[i], {css:{className:'+=animTxtDone'}, delay: .4});
				}
			}else{
				if(sections[i] !== undefined && hasClass(sections[i], 'animTxtDone'))
					TweenLite.set(sections[i], {css:{className:'-=animTxtDone'}});

				splitTl[i].play();
			}
		}
	}
}

function animTxt(splitText, splitTl, decalTxt, sections){
	var j = 0, splitTlLength = splitTl.length;
	for(j; j<splitTlLength; j++){
		splitText[j].split({type:'words'});
		var i = 0, words = splitText[j].words, nbWords = words.length;
		for(i; i<nbWords; i++){
			splitTl[j].from(words[i], 0.6, {ease:Expo.easeInOut, css:{opacity:0, scaleX:0.5, scaleY:0.5, y:decalTxt}}, i * 0.03);
		}
	}
	animTxtScroll(splitTl, decalTxt, sections);
}




/*function onWindowScroll(){
	myScroll = document.documentElement['scrollTop'] || document.body['scrollTop'];
	
	checkPosAnimsTxt(myScroll);

	requestAnimFrame(onWindowScroll);
}*/



/**** INIT ****/
function init(){
	bullshitGenerator();

	var logo = document.getElementById('logo'),
		tweenLogo = TweenMax.spriteSheet(logo, {
						width: 720,
						stepX: 180,
						stepY: 180,
						count: 24
					}, 1, { delay: 0.1, repeat: -1});
	tweenLogo.pause();
	addEventListener(logo, 'mouseover', function(){
		tweenLogo.play();
	});
	addEventListener(logo, 'mouseout', function(){
		tweenLogo.pause();
		TweenLite.set(logo, {backgroundPosition: '0 0'});
	});

	var animsTxt = document.getElementsByClassName('animTxt');
	if(animsTxt.length){
		var i = 0, nbAnims = animsTxt.length, splitText = [], splitTl = [], decalTxt = '+=60', 
			tempSections = [], sections =[], countSections = 0;
		for(i; i<nbAnims; i++){
			splitText[i] = new SplitText(animsTxt[i], {type:'words'});
			splitTl[i] = new TimelineLite();
			tempSections[i] = animsTxt[i].closest('.container');
			if((tempSections[i-1] !== undefined && tempSections[i-1] !== tempSections[i]) || i === 0){
				sections[i] = tempSections[countSections];
				countSections ++;
			}
		}
		animTxt(splitText, splitTl, decalTxt, sections);
	}

	var phrase = document.getElementById('phrase-creuse');
	if(phrase !== null) setSentences(phrase);

	var youSection = document.getElementById('vous');
	if(youSection !== null) linksHoverYou(youSection);

	var sliders = document.getElementsByClassName('slider');
	if(sliders.length){
		var i = 0, nbSliders = sliders.length;
		for(i; i<nbSliders; i++){
			setSlider(sliders[i]);
		}
	}

	var live = document.getElementById('live');
	if(live !== null){
		liveBgPos1 = -100; liveBgPosFinal1 = 0;
		liveBgPos2 = 200; liveBgPosFinal2 = 100;

		//animBackground(live);
	}

	var scrollToBtn = document.getElementsByClassName('scrollTo');
	if(scrollToBtn.length){
		var i = 0, nbBtn = scrollToBtn.length;
		for(i; i<nbBtn; i++){
			addEventListener(scrollToBtn[i], 'click', function(e){
				e.preventDefault();
				var target = document.getElementById(this.getAttribute('href').replace('#', ''));
				scrollTo(target.offsetTop, 300);
			});
		}
	}

	//onWindowScroll();
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