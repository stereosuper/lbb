/**** VARIABLES ****/
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
		height = 0, posX = '25%', timing = .3;

	function slideNext(){
		TweenLite.to( slides[currentSlide], timing, {left: '-'+posX, opacity: 0, onComplete: function(){
			currentSlide < nbSlides - 1 ? currentSlide ++ : currentSlide = 0;
			TweenLite.fromTo( slides[currentSlide], timing, {left: posX}, {left: 0, opacity: 1} );
		}} );
		//	TweenLite.delayedCall(5, slideNext);
	}

	function slidePrev(){
		TweenLite.to( slides[currentSlide], timing, {left: posX, opacity: 0, onComplete: function(){
			currentSlide > 0 ? currentSlide -- : currentSlide = nbSlides - 1;
			TweenLite.fromTo( slides[currentSlide], timing, {left: '-'+posX}, {left: 0, opacity: 1} );
		}} );
	}

	for(i; i < nbSlides; i++){
		if(i > 0) TweenLite.set(slides[i], {left: posX, opacity: 0});
		if(slides[i].offsetHeight > height) height = slides[i].offsetHeight;
	}
	
	TweenLite.set(slider.querySelector('ul'), {height: height+'px'});

	next.setAttribute('id', 'next');
	next.innerHTML = 'Next';
	slider.appendChild(next);
	addEventListener(next, 'click', slideNext);

	prev.setAttribute('id', 'prev');
	prev.innerHTML = 'Prev';
	slider.appendChild(prev);
	addEventListener(prev, 'click', slidePrev);

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
		transitionOpen = .8, transitionClose = 400;

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

	for(i; i<tabs.length; i++){
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

				sections[i].querySelector('.container').appendChild(buttons[i][j]);

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
		actualSentence = 0;

	function newSentence(){
		var rand = Math.floor( Math.random()*nbSentences );
		if(rand === actualSentence){
			while(rand === actualSentence)
				rand = Math.floor( Math.random()*nbSentences );
		}
		actualSentence = rand;
		sentenceContainer.innerHTML = sentences[rand];
	}

	// set size to the container <p> so it won't move on sentence changing
	TweenLite.set(sentenceContainer, {width: sentenceContainer.offsetWidth + 'px', minHeight: sentenceContainer.offsetHeight + 'px'});

	addEventListener(btn, 'click', newSentence);
}

/**** INIT ****/
function init(){
	bullshitGenerator();

	var phrase = document.getElementById('phrase-creuse');
	if(phrase !== null) setSentences(phrase);

	var youSection = document.getElementById('vous');
	if(youSection !== null) linksHoverYou(youSection);

	var sliders = document.getElementsByClassName('slider');
	if(sliders.length){
		var i = 0;
		for(i; i<sliders.length; i++){
			setSlider(sliders[i]);
		}
	}

	var live = document.getElementById('live');
	if(live !== null){
		liveBgPos1 = -100; liveBgPosFinal1 = 0;
		liveBgPos2 = 200; liveBgPosFinal2 = 100;

		//animBackground(live);
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