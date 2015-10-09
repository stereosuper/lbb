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
			<a id='logo' href='./'>la Belle Boîte</a>
		</header>

		<nav role='navigation' id='main-menu' class='menu'>
			<ul>
				<li class='actif'><a href='./'>Accueil</a></li>
				<li><a href='#'>la Belle Boîte</a></li>
				<li><a href='#'>Pour Vous</a></li>
				<li><a href='#'>Blog</a></li>
				<li><a href='#'>Contact</a></li>
			</ul>
			<button id='burger'></button>
		</nav>

		<main id='wrapper' role='main'>
			
			<section class='head bg-purple section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'>Bonjour :</strong>
						<h1><span class='animTxt small'>Nous sommes </span><span class='animTxt'>sérieusement drôles</span></h1>
						<a href='#vous' class='btn btn-left scrollTo'>Découvrez comment</a>
						<img src='layoutImg/pipe.png' alt="On aime l'improvisation" width='586' height='453' id='pipe'>
					</div>
				</div>
			</section>

			<section id='vous' class='bg-yellow section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'>Pour vous,</strong>
						<h2 class='light'>
							<a href='#' class='animTxt'>Nous</a> 
							<strong class='animTxt'>conçevons & animons</strong><span class='animTxt'> des</span> 
							<a href='#' class='animTxt'>spectacles</a><span class='animTxt'>, des</span> 
							<a href='#' class='animTxt'>ateliers</a><span class='animTxt'>, des</span> <a href='#' class='animTxt'>formations</a><span>.</span>
						</h2>
						<span class='sub-title'>( et tout un tas d'autres trucs qui nous amusent )</span>
					</div>
				</div>
				<div id='bgVous'></div>
			</section>

			<section id='confiance' class='bg-blue section left'>
				<div class='section-cell'>
					<div class='container'>
						<h2 class='sup-title'>Ils nous ont quand même fait confiance :</h2>
						<div class='slider'>
							<ul>
								<li class='slide'>
									<article>
										<div class='img anim-slide'>
											<img src='img/naoned.png' width='130' height='43' alt='Naoned'>
											<div id='tv'></div>
										</div><div class='txt'>
											<h3 class='anim-slide'>Et si nous échangions notre patrimoine immatériel?</h3>
											<div class='anim-slide'>
												<blockquote>
													<p class='quote'>
														C'était à la fois riche, dense, distrayant et convivial...
													</p>
													<p class='by'>
														<b>Alexis Moisdon</b>
														Directeur Général de Naoned System
													</p>
												</blockquote>
											</div>
										</div>
									</article>
								</li>
								<li class='slide'>
									<article>
										<div class='img anim-slide'>
											<img src='img/naoned.png' width='130' height='43' alt='Naoned'>
											<div id='tv'></div>
										</div><div class='txt'>
											<h3 class='anim-slide'>Un deuxième titre</h3>
											<div class='anim-slide'>
												<blockquote>
													<p class='quote'>
														Une autre citation...
													</p>
													<p class='by'>
														<b>Alexis Moisdon</b>
														Directeur Général de Naoned System
													</p>
												</blockquote>
											</div>
										</div>
									</article>
								</li>
								<li class='slide'>
									<article>
										<div class='img anim-slide'>
											<img src='img/naoned.png' width='130' height='43' alt='Naoned'>
											<div id='tv'></div>
										</div><div class='txt'>
											<h3 class='anim-slide'>Le troisième</h3>
											<div class='anim-slide'>
												<blockquote>
													<p class='quote'>
														Une citation... numéro trois!
													</p>
													<p class='by'>
														<b>Alexis Moisdon</b>
														Directeur Général de Naoned System
													</p>
												</blockquote>
											</div>
										</div>
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
						<div class='table left'>
							<div id='instagram' class='w50'>
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
							<a href='https://instagram.com/labelleboite/' target='_blank' class='black-hover-link'>
								<img src='<?php echo $image; ?>' alt='Lieu de travail du jour' width='460' height='460'>
								<span class='hover'>
									<span class='sup-title'>Notre lieu de travail du jour :</span>
									<span class='content'>
										<span class='meta'><?php if($location) echo $location . ' - '; echo date('j M Y', $date); ?></span>
										<i class='desc'><?php echo $desc; ?></i>
									</span>
								</span>
							</a>
							</div><ul class='blog-list w50'>
							<li>
								<a href='#' class='black-hover-link'>
									<img src='img/blog1.jpg' alt='' width='220' height='220'>
									<span class='hover'>
										<span class='sup-title'>Blog</span>
										<em class='content'>Nom d'un article super que vous écrirez plus tard</em>
									</span>
								</a>
							</li><li>
								<a href='#' class='black-hover-link'>
									<img src='img/blog2.jpg' alt='' width='220' height='220'>
									<span class='hover'>
										<span class='sup-title'>Blog</span>
										<em class='content'>Nom d'un article super que vous écrirez plus tard</em>
									</span>
								</a>
							</li><li>
								<a href='#' class='black-hover-link'>
									<img src='img/blog3.jpg' alt='' width='220' height='220'>
									<span class='hover'>
										<span class='sup-title'>Blog</span>
										<em class='content'>Nom d'un article super que vous écrirez plus tard</em>
									</span>
								</a>
							</li><li class='last'>
								<a href='#' class='black-hover-link'>
									<img src='img/blog4.jpg' alt='' width='220' height='220'>
									<span class='hover'>
										<span class='sup-title'>Blog</span>
										<em class='content'>Nom d'un article super que vous écrirez plus tard</em>
									</span>
								</a>
							</li>
							</ul>
						</div>
					</div>
				</div>
				<div id='bgMasques'></div>
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
			</div><div class='w50'>
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
			</div>
	  	</footer>
		
		<script src='js/modernizr.min.js'></script>
	  	<!--<script src='js/jquery-1.11.2.min.js'></script>-->
	  	<script src='js/tweenMax.min.js'></script>
	  	<script src='js/tweenSprite.min.js'></script>
	  	<script src='js/splitText.min.js'></script>
	  	<!--<script src="js/tweenCssPlugin.min.js"></script>
	  	<script src="js/tweenEasePack.min.js"></script>
	  	<script src="js/tweenLite.min.js"></script>
	  	<script src="js/timelineLite.min.js"></script>-->
	  	<script src='js/script.js'></script>

	</body>

</html>