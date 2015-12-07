<?php
/*
Template Name: Home
*/

get_header(); ?>
	
	<main id='wrapper' role='main'>

		<?php if ( have_posts() ) : the_post(); ?>

			<header class='head bg-purple section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'><?php the_field('headerSupTitle'); ?></strong>
						<h1><span class='animTxt small'><?php the_field('headerTitle1'); ?> </span><span class='animTxt'><?php the_field('headerTitle2'); ?> </span></h1>
						<a href='#vous' class='btn btn-down scrollTo'><?php the_field('headerBtn'); ?> </a>
						<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/pipe.png' alt="On aime l'improvisation" width='586' height='453' id='pipe' class='img'>
					</div>
				</div>
			</header>

			<section id='vous' class='bg-yellow section on'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'><?php the_field('prestaSupTitle'); ?></strong>
						<h2 class='light'>
							<a href='<?php the_field('nousLink'); ?>' class='animTxt'><?php the_field('prestaTitle1'); ?></a> 
							<strong class='animTxt'><?php the_field('prestaTitle2'); ?></strong><span class='animTxt'> <?php the_field('prestaTitle3'); ?></span> 
							<a href='<?php the_field('prestaLink'); ?>#ateliers' class='animTxt'><?php the_field('prestaTitle4'); ?></a><span class='animTxt'><?php the_field('prestaTitle5'); ?></span> 
							<a href='<?php the_field('prestaLink'); ?>#interventions' class='animTxt'><?php the_field('prestaTitle6'); ?></a>.
						</h2>
						<span class='sub-title'><?php the_field('prestaSubTitle'); ?></span>
					</div>
				</div>
				<div id='bgVous'></div>
			</section>

			<section id='confiance' class='bg-blue section left'>
				<div class='section-cell'>
					<div class='container'>
						<h2 class='sup-title'><?php the_field('temoignagesTitle'); ?></h2>
						<?php $temoignages = new WP_Query( array('post_type' => 'temoignage', 'posts_per_page' => -1) ); ?>
						<?php if($temoignages->have_posts()) : ?>
						<div class='slider'>
							<ul>
							<?php while($temoignages->have_posts()) : $temoignages->the_post();  ?>
								<li class='slide'>
									<article>
										<div class='img anim-slide'>
											<?php if(has_post_thumbnail()){ the_post_thumbnail(); } ?>
											<div class='tv'></div>
										</div><div class='txt'>
											<h3 class='anim-slide'><?php the_title(); ?></h3>
											<div class='anim-slide'>
												<blockquote>
													<p class='quote'><?php the_field('quote'); ?></p>
													<p class='by'>
														<b><?php the_field('name'); ?></b>
														<?php the_field('poste'); ?>
													</p>
												</blockquote>
											</div>
										</div>
									</article>
								</li>
							<?php endwhile; ?>
							</ul>
						</div>
						<?php endif; wp_reset_query(); ?>
					</div>
				</div>
			</section>

			<section id='live' class='bg-pink section'>
				<div class='section-cell'>
					<div class='container'>
						<strong class='sup-title'><?php the_field('blogSupTitle'); ?></strong>
						<h2><?php the_field('blogTitle'); ?></h2>
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
								$url = 'https://api.instagram.com/v1/users/' . $userId . '/media/recent/?access_token=' . $token;
								$inst_stream = callInstagram($url);
								$results = json_decode($inst_stream, true);
								$goodItem = $results['data'][0];

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
									<span class='sup-title'><?php the_field('instTitle'); ?></span>
									<span class='content'>
										<span class='meta'><?php if($location) echo $location . ' - '; echo date('j M Y', $date); ?></span>
										<i class='desc'><?php echo $desc; ?></i>
									</span>
								</span>
							</a>
							</div><ul class='blog-list w50'>
							<?php $posts = new WP_Query( array('post_type' => 'post', 'posts_per_page' => 4) ); ?>
							<?php if($posts->have_posts()) : ?>
								<?php while($posts->have_posts()) : $posts->the_post(); ?><li>
									<a href='<?php the_permalink(); ?>' class='black-hover-link'>
										<?php echo wp_get_attachment_image(get_field('vignette'), 'thumbnail'); ?>
										<span class='hover'>
											<span class='sup-title'>Blog</span>
											<em class='content'><?php the_title(); ?></em>
										</span>
									</a>
								</li><?php endwhile; ?>
							<?php endif; wp_reset_query(); ?>
							</ul>
						</div>
					</div>
				</div>
				<div id='bgMasques'></div>
			</section>
		
		<?php else : ?>
					
			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>