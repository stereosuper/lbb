/**** VARIABLES ****/
var tlBackground = new TimelineMax({repeat:-1});


function addEventListener(el, eventName, handler){
	if(el.addEventListener){
		el.addEventListener(eventName, handler);
	}else if(el.attachEvent){
		el.attachEvent('on' + eventName, function(){ handler.call(el); });
	}else{
		el['on' + eventName] = handler;
	}
}

function addClass(el, className){
	el.classList ? el.classList.add(className) : el.className += ' ' + className;
}
function removeClass(el, className){
	el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp('(^|\\b)' + className.split('').join('|') + '(\\b|$)', 'gi'), ' ');
}

function shuffle(array){
  var elementsRemaining = array.length, temp, randomIndex;
  while (elementsRemaining > 1) {
    randomIndex = Math.floor(Math.random() * elementsRemaining--);
    if (randomIndex != elementsRemaining) {
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



function animBackground(container){
	TweenMax.to(container, 50, {backgroundPosition: '100% 0', repeat: -1, ease:Linear.easeNone});
	requestAnimFrame(animBackground);
}

function linksHoverYou(section){
	var links = section.querySelectorAll('a'), nbLinks = links.length, i = 0;

	for(i; i<nbLinks; i++){
		(function(i){
			addEventListener(links[i], 'mouseover', function(){
				addClass(this, 'on');
				addClass(section, 'fade');
				addClass(section, 'fade'+parseInt(i+1));
			});
			addEventListener(links[i], 'mouseout', function(){
				removeClass(this, 'on');
				removeClass(section, 'fade');
				removeClass(section, 'fade'+parseInt(i+1));
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
		i = 0, j, buttons = [], imgsBefore = [], imgsAfter = [], rands = [], limit = 3, length = 0;

	function shitAppens(section, img, id){
		var imgById = section.querySelector('#'+id);
		imgById ? imgById.remove() : section.appendChild(img);		
	}

	for(i; i<tabs.length; i++){
		j = 0;
		buttons[i] = [];
		imgsBefore[i] = [];
		imgsAfter[i] = [];
		rands = [];

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
				addClass(buttons[i][j], 'bullshitBtn');
				addClass(buttons[i][j], positions[rands[j]]);

				sections[i].querySelector('.container').appendChild(buttons[i][j]);

				if(tabs[i][j][1]){
					imgsAfter[i][j] = document.createElement('img');
					imgsAfter[i][j].setAttribute('src', tabs[i][j][2]);
					imgsAfter[i][j].setAttribute('id', 'img-'+i+'-'+j);
					addClass(imgsAfter[i][j], 'bullshit');

					// un écouteur sur le bouton pour faire apparaitre la connerie
					addEventListener(buttons[i][j], tabs[i][j][1], function(){
						shitAppens(sections[i], imgsAfter[i][j], 'img-'+i+'-'+j); 
					});

					// un écouteur sur la connerie pour la faire disparaitre au clic
					addEventListener(imgsAfter[i][j], tabs[i][j][1], function(){
						this.remove();
					});
				}else{
					addClass(buttons[i][j], 'not-a-btn');
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
		btn = container.querySelector('button'),
		sentenceContainer = container.querySelector('p'),
		actualSentence = 0;

	function newSentence(){
		var rand = Math.floor( Math.random()*sentences.length );
		if(rand === actualSentence){
			while(rand === actualSentence)
				rand = Math.floor( Math.random()*sentences.length );
		}
		actualSentence = rand;
		sentenceContainer.innerHTML = sentences[rand];
	}

	// set size to the container <p> so it won't move on sentence changing
	sentenceContainer.style.width = sentenceContainer.offsetWidth + 'px';
	sentenceContainer.style.minHeight = sentenceContainer.offsetHeight + 'px';

	addEventListener(btn, 'click', newSentence);
}

/**** INIT ****/
function init(){
	bullshitGenerator();

	var phrase = document.getElementById('phrase-creuse');
	if(phrase !== null) setSentences(phrase);

	var youSection = document.getElementById('vous');
	if(youSection !== null) linksHoverYou(youSection);
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