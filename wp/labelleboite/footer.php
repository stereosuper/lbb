	<footer role='contentinfo' id='footer' class='container'>
		<div>

			<div class='w50'>
			    <div class='phrase'>
			        <?php dynamic_sidebar('footer'); ?>
			    </div>
			</div><div class='w50'>
				<div class='menu w50'>
					<?php $menu_locations = get_nav_menu_locations(); ?>
					<span class='sup-title'><?php echo wp_get_nav_menu_object($menu_locations['secondary1'])->name; ?></span>
					<?php wp_nav_menu( array( 'theme_location' => 'secondary1', 'container' => '', 'menu_class' => '' ) ); ?>
				</div><div class='menu w50'>
					<span class='sup-title'><?php echo wp_get_nav_menu_object($menu_locations['secondary2'])->name; ?></span>
					<?php wp_nav_menu( array( 'theme_location' => 'secondary2', 'container' => '', 'menu_class' => '' ) ); ?>
				</div><div class='menu w50'>
					<span class='sup-title'><?php echo wp_get_nav_menu_object($menu_locations['secondary3'])->name; ?></span>
					<?php wp_nav_menu( array( 'theme_location' => 'secondary3', 'container' => '', 'menu_class' => '' ) ); ?>
				</div>
			</div>

		</div>
	</footer>

	<?php
		function generateBullshitJs($btn, $action, $img){
			if($action === 'none'){
				echo "['".$btn."', false, false]";
			}else{
				if($img){
					echo "['".$btn."', 'click', '".$img."']";
				}else{
					echo "['".$btn."', '".$action."', false]";
				}
			}
		}
	?>
	<script>
		<?php
		$bullshits = get_field('bullshit', 'options');
		if($bullshits) :
		?>
			var purpleShits = [], pinkShits = [], blueShits = [], yellowShits = [], whiteShits = [];
			// for each element: img to display, action to execute (false si rien), img to display after the action (false si rien)
			<?php foreach($bullshits as $bullshit) : ?>
				<?php switch($bullshit['bullshitContainer']){
					case 'purple': ?>
						purpleShits.push(<?php generateBullshitJs($bullshit['btnBullshit'], $bullshit['bullshitAction'], $bullshit['bullshitImg']); ?>);
						<?php break;
					case 'pink': ?>
						pinkShits.push(<?php generateBullshitJs($bullshit['btnBullshit'], $bullshit['bullshitAction'], $bullshit['bullshitImg']); ?>);
						<?php break;
					case 'blue': ?>
						blueShits.push(<?php generateBullshitJs($bullshit['btnBullshit'], $bullshit['bullshitAction'], $bullshit['bullshitImg']); ?>);
						<?php break;
					case 'yellow': ?>
						yellowShits.push(<?php generateBullshitJs($bullshit['btnBullshit'], $bullshit['bullshitAction'], $bullshit['bullshitImg']); ?>);
						<?php break;
					case 'white': ?>
						whiteShits.push(<?php generateBullshitJs($bullshit['btnBullshit'], $bullshit['bullshitAction'], $bullshit['bullshitImg']); ?>);
						<?php break;
				} ?>
			<?php endforeach; ?>
		<?php endif; ?>
	</script>

	<script>
		function preloader(){
		    if(document.images){
		      	/*var imgLogo1 = new Image(), imgLogo1Bis = new Image(), imgLogo2 = new Image(), imgLogo2Bis = new Image(),
		        	imgLogo3 = new Image(), imgLogo3Bis = new Image(), imgLogo4 = new Image(), imgLogo4Bis = new Image();

		      	imgLogo1.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-banane@2x.png';
		      	imgLogo1Bis.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-banane.png';
		      	imgLogo2.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-bisou@2x.png';
		      	imgLogo2Bis.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-bisou.png';
		      	imgLogo3.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-mouche@2x.png';
		      	imgLogo3Bis.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-mouche.png';
		      	imgLogo4.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-moustache@2x.png';
		      	imgLogo4Bis.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/_logo-moustache.png';*/

		      	if(hasClass(body, 'page-template-default') || hasClass(body, 'blog') || hasClass(body, 'single') || hasClass(body, 'page-template-contact')){
		      	  	var imgLogoRose = new Image(), imgLogoRoseBis = new Image();

		      	  	imgLogoRose.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/logo-rose.png';
		      	  	imgLogoRoseBis.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/logo-rose-small.png';
		      	}

		      	if(hasClass(body, 'home') || hasClass(body, 'page-template-presta')){
		        	var imgVous1 = new Image(), imgVous2 = new Image(), imgVous3 = new Image();

		        	imgVous1.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/vous/noise.png';
		        	imgVous2.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/vous/teletubies.png';
		        	imgVous3.src = '<?php echo get_template_directory_uri(); ?>/layoutImg/vous/fouet.png';
		      	}

		      	<?php if($bullshits) : $count = 0; ?>
		      		var imgsBullShit = [];
		      		<?php foreach($bullshits as $bullshit) : ?>
		      			<?php if($bullshit['bullshitImg']){ ?>
		      				imgsBullShit[<?php echo $count; ?>] = new Image();
		      				imgsBullShit[<?php echo $count; ?>].src = "<?php echo $bullshit['bullshitImg']; ?>";
		      			<?php $count ++; } ?>
			      	<?php endforeach; ?>
		      	<?php endif; ?>

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

	<?php wp_footer(); ?>

	</body>
</html>
