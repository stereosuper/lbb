<?php
	if(!session_id())
		session_start();

	$_POST = $_SESSION;
	global $errorComment;
	$errorComment = isset($_POST['errorcomment']) ? $_POST['errorcomment'] : false;

	if(!isset($_GET['error'])){
		if($errorComment){
			$_POST['errorcomment'] = false;
		}
		session_destroy();
	}
?>
<!DOCTYPE html>
<!--[if lt IE 9]> <html <?php language_attributes(); ?> class='no-js lt-ie9 lt-ie10'> <![endif]-->
<!--[if IE 9]> <html <?php language_attributes(); ?> class='no-js ie9 lt-ie10'> <![endif]-->
<!--[if IE 10]> <html <?php language_attributes(); ?> class='no-js ie10'> <![endif]-->
<!--[if gt IE 9]><!--> <html <?php language_attributes(); ?> class='no-js'> <!--<![endif]-->

	<head>
		<meta http-equiv='X-UA-Compatible' content='IE=edge'>
		<meta charset='UTF-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>

		<title><?php wp_title(''); ?></title>

		<link rel='apple-touch-icon' sizes='57x57' href='<?php echo site_url(); ?>/apple-touch-icon-57x57.png'>
		<link rel='apple-touch-icon' sizes='60x60' href='<?php echo site_url(); ?>/apple-touch-icon-60x60.png'>
		<link rel='apple-touch-icon' sizes='72x72' href='<?php echo site_url(); ?>/apple-touch-icon-72x72.png'>
		<link rel='apple-touch-icon' sizes='76x76' href='<?php echo site_url(); ?>/apple-touch-icon-76x76.png'>
		<link rel='apple-touch-icon' sizes='114x114' href='<?php echo site_url(); ?>/apple-touch-icon-114x114.png'>
		<link rel='apple-touch-icon' sizes='120x120' href='<?php echo site_url(); ?>/apple-touch-icon-120x120.png'>
		<link rel='apple-touch-icon' sizes='144x144' href='<?php echo site_url(); ?>/apple-touch-icon-144x144.png'>
		<link rel='apple-touch-icon' sizes='152x152' href='<?php echo site_url(); ?>/apple-touch-icon-152x152.png'>
		<link rel='apple-touch-icon' sizes='180x180' href='<?php echo site_url(); ?>/apple-touch-icon-180x180.png'>
		<link rel='icon' type='image/png' href='<?php echo site_url(); ?>/favicon-32x32.png' sizes='32x32'>
		<link rel='icon' type='image/png' href='<?php echo site_url(); ?>/favicon-194x194.png' sizes='194x194'>
		<link rel='icon' type='image/png' href='<?php echo site_url(); ?>/favicon-96x96.png' sizes='96x96'>
		<link rel='icon' type='image/png' href='<?php echo site_url(); ?>/android-chrome-192x192.png' sizes='192x192'>
		<link rel='icon' type='image/png' href='<?php echo site_url(); ?>/favicon-16x16.png' sizes='16x16'>
		<link rel='manifest' href='<?php echo site_url(); ?>/manifest.json'>
		<link rel='mask-icon' href='<?php echo site_url(); ?>/safari-pinned-tab.svg' color='#b5006a'>
		<meta name='apple-mobile-web-app-title' content='La Belle Boîte'>
		<meta name='application-name' content='La Belle Boîte'>
		<meta name='msapplication-TileColor' content='#ffffff'>
		<meta name='msapplication-TileImage' content='<?php echo site_url(); ?>/mstile-144x144.png'>
		<meta name='theme-color' content='#ffffff'>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed' href='<?php echo get_bloginfo('rss2_url') ?>'>

		<?php wp_head(); ?>

		<script>
		  	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		  	ga('create', 'UA-84497214-1', 'auto');
		  	ga('send', 'pageview');
		</script>
	</head>

	<?php
		$img = has_post_thumbnail($post->ID) ? true : false;
		$class = $img ? '' : 'no-img';
	?>

	<body <?php body_class($class); ?>>

		<header id='header' role='banner'>
			<a class='logo' href='<?php echo home_url( '/' ); ?>' rel='home' title='Accueil'><?php echo get_bloginfo( 'name', 'display' ); ?></a>
		</header>

		<nav role='navigation' id='main-menu' class='menu'>
			<a class='logo' href='<?php echo home_url( '/' ); ?>' rel='home' title='Accueil'><?php echo get_bloginfo( 'name', 'display' ); ?></a>
			<div>
				<div><?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => '', 'menu_class' => 'big-menu' ) ); ?></div>
			</div>
			<button id='burger'>
				<i>Menu</i>
				<span class='b1'></span><span class='b2'></span><span class='b3'></span>
			</button>
		</nav>
