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
						<h1><span>Nous sommes </span>sérieusement drôles</h1>
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
							<a href='#'>Nous</a> 
							<strong>conçevons & animons</strong><span> des</span> 
							<a href='#'>spectacles</a><span>, des </span><a href='#'>ateliers</a>
							<span>, des </span><a href='#'>formations</a><span>.</span>
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
			<!--<div id='cisors'>
				<svg id="cisors1" width="100px" height="80px" xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<path class="cisors" d="M40,44.7c-1.1-0.4-6.4-1.1-8.5-0.5c0.2-0.4,0.4-0.8,0.5-1.2c1.7-5.4-3.2-11.9-10.9-14.5
						S3.8,27.6,2.1,33s5.5,11.6,13.2,14.1c4.2,1.4,8.1,1.8,11.4,0.6c2.7-0.9,6-0.1,8.2,1.4c2.4,2.5,3.1,2.9,5.9,4.3
						c3.4,1.1,41,13.1,45.1,13.4c4.4,0.3,12.4-2.6,12.4-2.6s-27.2-9.1-44.5-14.9C45.5,45.4,40.1,44.7,40,44.7z M28.5,41.8
						c-1.3,4.1-6.5,4.3-12.3,2.4C10.5,42.2,3.8,38,5.1,34c1.3-4.1,9.5-5,15.2-3.1C26.1,32.8,29.8,37.7,28.5,41.8L28.5,41.8z"/>
				</svg>
				<svg id="cisors2" width="100px" height="80px" xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					<path class="cisors" d="M53.8,44.8C71.1,39,98.3,29.9,98.3,29.9s-8-2.9-12.4-2.6c-4.1,0.3-41.7,12.3-45.1,13.4
						c-2.8,1.4-3.5,1.8-5.9,4.3c-2.2,1.5-5.5,2.3-8.2,1.4c-3.3-1.2-7.2-0.8-11.4,0.6C7.6,49.5,0.4,55.7,2.1,61.1s11.3,7.1,19,4.5
						C28.8,63,33.7,56.5,32,51.1c-0.1-0.4-0.3-0.8-0.5-1.2c2.1,0.6,7.4-0.1,8.5-0.5C40.1,49.4,45.5,48.8,53.8,44.8z M28.5,52.3
						c1.3,4.1-2.4,9-8.2,10.9c-5.7,1.9-13.9,1-15.2-3.1c-1.3-4,5.4-8.2,11.1-10.2C22,48,27.2,48.2,28.5,52.3L28.5,52.3z"/>
				</svg>
			</div>-->
				<div class='phrase'>
					<span class='sup-title'>la Belle Boîte vous offre cette phrase creuse :</span>
					<div id='phrase-creuse'>
						<p class='h3'>Stop aux acronymes, travaillons l'U.M.1</p>
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
	  	<!--<script src='js/tweenMax.min.js'></script>-->
	  	<script src="js/tweenCssPlugin.min.js"></script>
	  	<script src="js/tweenEasePack.min.js"></script>
	  	<script src="js/tweenLite.min.js"></script>
	  	<script src="js/timelineLite.min.js"></script>
	  	<script src='js/script.js'></script>

	</body>

</html>