/**** VARIABLES ****/

function addEventListener(el, eventName, handler){
	if(el.addEventListener){
		el.addEventListener(eventName, handler);
	}else if(el.attachEvent){
		el.attachEvent('on' + eventName, function(){
			handler.call(el);
		});
	}else{
		el['on' + eventName] = handler;
	}
}



function bullshitGenerator(){
	// for each element: img to display, action to execute, img to display after the action
	var yellowShits = [
			['img/bullshit/no-clic-yellow.png', 'click', 'img/bullshit/licorne.gif']
		],
		blueShits = [
			['img/bullshit/no-clic-blue.png', 'click', 'img/bullshit/licorne.gif']
		],
		yellowSection = document.getElementsByClassName('bg-yellow')[0];

	function shitAppens(){
		var imgAfter = document.createElement('img');
		imgAfter.setAttribute('src', yellowShits[0][2]);
		yellowSection.querySelector('.container').appendChild(imgAfter);
	}

	var button = document.createElement('button');
	button.setAttribute('id', 'yellowShits0');
	yellowSection.querySelector('.container').appendChild(button);
	var img = document.createElement('img');
	img.setAttribute('src', yellowShits[0][0]);
	button.appendChild(img);
	addEventListener(button, yellowShits[0][1], shitAppens);
}

function setSentences(container){
	var sentences = [
			"Stop aux acronymes, travaillons l'U.M.1",
			"Une autre phrase creuse",
			"Des b*tes",
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