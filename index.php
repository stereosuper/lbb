<!DOCTYPE html>
<!--[if lt IE 9]> <html lang='fr-FR' class='no-js lt-ie9 lt-ie10'> <![endif]-->
<!--[if IE 9]> <html lang='fr-FR' class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang='fr-FR' class='no-js'> <!--<![endif]-->

	<head>
	  	<meta charset='utf-8'>
	  	<title>la Belle Boîte</title>
	  	<meta name='description' content=''>
	  	<meta name='viewport' content='width=device-width,initial-scale=1'>		
	  	<meta http-equiv='X-UA-Compatible' content='IE=edge'>

	  	<link rel='stylesheet' href='css/style.css'>
	</head>

	<body class='home'>
		
		<header id='header'>
			<div class='container'>
				<a id='logo' href='./'>la Belle Boîte</a>
				<nav role='navigation' id='main-menu' class='menu'>
					<ul>
						<li class='actif'><a href='./'>Accueil</a></li>
						<li><a href='#'>la Belle Boîte</a></li>
						<li><a href='#'>Pour Vous</a></li>
						<li><a href='#'>Blog</a></li>
						<li><a href='#'>Contact</a></li>
					</ul>
				</nav>
				<button id='burger'></button>
			</div>
		</header>

		<main id='wrapper' role='main'>
			
			<section class='head bg-purple section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'>Bonjour :</strong>
						<h1><span>Nous sommes </span>sérieusement drôles</h1>
						<a href='#' class='btn'>Découvrez comment</a>
					</div>
				</div>
			</section>

			<section id='vous' class='bg-yellow section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'>Pour vous,</strong>
						<h2 class='light'>
							<a href='#'>Nous</a> 
							<strong>conçevons & animons</strong> des 
							<a href='#'>spectacles</a>, 
							des <a href='#'>ateliers</a>, 
							des <a href='#'>formations</a>.
						</h2>
						<span class='sub-title'>( et tout un tas d'autres trucs qui nous amusent )</span>
					</div>
				</div>
			</section>

			<section id='confiance' class='bg-blue section left'>
				<div class='section-cell'>
					<div class='container'>
						<h2 class='sup-title'>Ils nous ont quand même fait confiance :</h2>
						<div class='slider'>
							<ul>
								<li>
									<article>
										<h3>Et si nous échangions notre patrimoine immatériel?</h3>
										<blockquote>
											<p class='quote'>
												C'était à la fois riche, dense, distrayant et convivial...
											</p>
											<p class='by'>
												<b>Alexis Moisdon</b>
												Directeur Général de Naoned System
											</p>
										</blockquote>
									</article>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section id='live' class='bg-pink section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'>Live :</strong>
						<h2>Notre passionante vie</h2>
						<div class='left'>
							<div id='instagram'>
								<?php
									function callInstagram($url){
										$ch = curl_init();
									   	curl_setopt_array($ch, array(
										   	CURLOPT_URL => $url,
										   	CURLOPT_RETURNTRANSFER => true,
										   	CURLOPT_SSL_VERIFYPEER => false,
										   	CURLOPT_SSL_VERIFYHOST => 2
									   	));

									   	$result = curl_exec($ch);
									   	curl_close($ch);
									   	return $result;
									}

									$userId = '2178546014';
									$token = '7000940.b09096c.26db5dc93433407599ded1ce4aaf2cd3';
									$tagLbb = 'lieudetravaildujour';
									//$client_id = "b09096c4b743493baf7f45e84e838d29";
									$url = 'https://api.instagram.com/v1/users/' . $userId . '/media/recent/?access_token=' . $token;
									$inst_stream = callInstagram($url);
									$results = json_decode($inst_stream, true);
									$goodItem = $results['data'][0];

									//print_r($results);
									foreach($results['data'] as $item){
										$tags = $item['tags'];
										foreach($tags as $tag){
											if($tag === $tagLbb){
												$goodItem = $item;
												break;
											}
										}
									}

									$location = $goodItem['location']['name'];
									$desc =  $goodItem['caption']['text'];
									$image =  $goodItem['images']['standard_resolution']['url'];
									$date =  $goodItem['created_time'];
								?>
								<a href='https://instagram.com/labelleboite/' target='_blank'>
									<img src='<?php echo $image; ?>' alt='Lieu de travail du jour' width='460' height='460'>
									<div>
										<span class='sup-title'>Notre lieu de travail du jour :</span>
										<span class='meta'><?php if($location) echo $location . ' - '; echo date('j M Y', $date); ?></span>
										<span class='desc'><?php echo $desc; ?></span>
									</div>
								</a>
							</div><ul class='blog-list'>
								<li>
									<a href='#'>
										<img src='' alt=''>
										<div>
											<span class='sup-title'>Blog</span>
											<em>Nom d'un article super que vous écrirez plus tard</em>
										</div>
									</a>
								</li><li>
									<a href='#'>
										<img src='' alt=''>
										<div>
											<span class='sup-title'>Blog</span>
											<em>Nom d'un article super que vous écrirez plus tard</em>
										</div>
									</a>
								</li><li>
									<a href='#'>
										<img src='' alt=''>
										<div>
											<span class='sup-title'>Blog</span>
											<em>Nom d'un article super que vous écrirez plus tard</em>
										</div>
									</a>
								</li><li>
									<a href='#'>
										<img src='' alt=''>
										<div>
											<span class='sup-title'>Blog</span>
											<em>Nom d'un article super que vous écrirez plus tard</em>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

		</main>

	  	<footer role='contentinfo' id='footer' class='container'>
	  		<div class='w50'>
	  			<div class='menu w50'>
	  				<span class='sup-title'>la Belle Boîte</span>
					<ul>
						<li><a href='#'>pourquoi</a></li>
						<li><a href='#'>pour qui ?</a></li>
						<li><a href='#'>l'équipe</a></li>
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
			</div><div class='w50'>
				<div class='phrase'>
					<span class='sup-title'>la Belle Boîte vous offre cette phrase creuse :</span>
					<div id='phrase-creuse'>
						<p class='h3'>Stop aux acronymes, travaillons l'U.M.1</p>
						<button class='sub-title'>une autre phrase creuse ?</button>
					</div>
				</div>
			</div>
	  	</footer>
		
		<script src='js/modernizr.min.js'></script>
	  	<script src='js/jquery-1.11.2.min.js'></script>
	  	<script src='js/script.js'></script>

	</body>

</html>