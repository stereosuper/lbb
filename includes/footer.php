  	<footer role='contentinfo' id='footer' class='container'>
  		<div>
  			<div class='w50'>
                <div class='phrase'>
                    <span class='sup-title'>la Belle Boîte vous offre cette phrase creuse :</span>
                    <div id='phrase-creuse'>
                        <p class='h3'><span>Stop aux acronymes, travaillons l'U.M.1</span></p>
                        <button class='sub-title'><span class='icon-loop'></span> une autre phrase creuse ?</button>
                        <div id='cisors'>
                            <div id="cisors1" class='icon-half-cisors cisors'></div>
                            <div id="cisors2" class='icon-half-cisors2 cisors'></div>
                        </div>
                    </div>
                </div>
            </div><div class='w50'>
  			  	<div class='menu w50'>
  			  		<span class='sup-title'>la Belle Boîte</span>
  					<ul>
  						<li><a href='#'>pourquoi</a></li>
  						<li><a href='#'>pour qui ?</a></li>
  						<li><a href='#'>l'équipe</a></li>
  						<li><a href='#'>le blog</a></li>
  					</ul>
  				</div><div class='menu w50'>
  			  		<span class='sup-title'>Pour Vous</span>
  					<ul>
  						<li><a href='#'>prestations</a></li>
  						<li><a href='#'>ateliers</a></li>
  						<li><a href='#'>interventions</a></li>
  						<li><a href='#'>références</a></li>
  					</ul>
  				</div><div class='menu w50'>
  			  		<span class='sup-title'>Mais aussi</span>
  					<ul>
  						<li><a href='#'>contact</a></li>
  						<li><a href='#' target='_blank'>sur facebook</a></li>
  						<li><a href='#' target='_blank'>sur twitter</a></li>
  						<li><a href='#'>mentions légales</a></li>
  					</ul>
  				</div>
  			</div>
  		</div>
  	</footer>
	
    <div id='fdMenu'></div>
	
  	<!--<script src='js/jquery-1.11.2.min.js'></script>-->
    <script src='js/isMobile.min.js'></script>
  	<script src='js/tweenMax.min.js'></script>
  	<script src='js/tweenSprite.min.js'></script>
  	<script src='js/splitText.min.js'></script>
  	<!--<script src="js/tweenCssPlugin.min.js"></script>
  	<script src="js/tweenEasePack.min.js"></script>
  	<script src="js/tweenLite.min.js"></script>
  	<script src="js/timelineLite.min.js"></script>-->
    <script>
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
        ], pinkShits = [], whiteShits = [];
    </script>

    <script>
      var sentences = [
        "Stop aux acronymes, travaillons l'U.M.1",
        "Une autre phrase creuse",
        "Des trucs et des machins"
      ];
      
      function preloader(){
        if(document.images){
          var imgLogo1 = new Image(), imgLogo1Bis = new Image(), imgLogo2 = new Image(), imgLogo2Bis = new Image(),
            imgLogo3 = new Image(), imgLogo3Bis = new Image(), imgLogo4 = new Image(), imgLogo4Bis = new Image();

          imgLogo1.src = 'layoutImg/_logo-banane@2x.png';
          imgLogo1Bis.src = 'layoutImg/_logo-banane.png';
          imgLogo2.src = 'layoutImg/_logo-bisou@2x.png';
          imgLogo2Bis.src = 'layoutImg/_logo-bisou.png';
          imgLogo3.src = 'layoutImg/_logo-mouche@2x.png';
          imgLogo3Bis.src = 'layoutImg/_logo-mouche.png';
          imgLogo4.src = 'layoutImg/_logo-moustache@2x.png';
          imgLogo4Bis.src = 'layoutImg/_logo-moustache.png';

          if(hasClass(body, 'home')){
            var imgVous1 = new Image(), imgVous2 = new Image(), imgVous3 = new Image(), imgVous4 = new Image(),
              imgBullShit1 = new Image(), imgBullShit2 = new Image();
              
            imgVous1.src = 'layoutImg/vous/fouet.png';
            imgVous2.src = 'layoutImg/vous/noise.png';
            imgVous3.src = 'layoutImg/vous/teletubies.png';
            imgVous4.src = 'layoutImg/vous/tronconneuse.png';

            imgBullShit1.src = 'img/bullshit/licorne.gif';
            imgBullShit2.src = 'img/bullshit/lama.jpg';
          }

          if(hasClass(body, 'page-template-default')){
            var imgLogoRose = new Image(), imgLogoRoseBis = new Image();

            imgLogoRose.src = 'layoutImg/logo-rose.png';
            imgLogoRoseBis.src = 'layoutImg/logo-rose-small.png';
          }
          
        }
      }

      /**** INIT (ON DOCUMENT LOAD) ****/
      function onLoadEvt(func){
        var oldonload = window.onload;
        if(typeof window.onload != 'function'){
          window.onload = func;
        }else{
          window.onload = function(){
            if(oldonload)
              oldonload();
            func();
          }
        }
      }
      onLoadEvt(preloader);
    </script>
  	<script src='js/script.js'></script>