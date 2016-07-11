<?php
/*
Template Name: Presta
*/

get_header(); ?>

	<main id='wrapper' role='main' class='bg-yellow'>

		<?php if ( have_posts() ) : the_post(); ?>

			<nav role='navigation' class='second-menu' id='fixedMenuStep'>
				<ul>
					<li class='on down'><a href='#ateliers' class='h5 scrollTo'><?php the_field('ateliersTitle'); ?></a></li>
					<li><a href='#interventions' class='h5 scrollTo'><?php the_field('interventionsTitle'); ?></a></li>
				</ul>
			</nav>

			<header class='head section' id='vous'>
				<div class='section-cell'>
					<div class='container'>
						<?php if(get_field('supTitle')){ ?>
							<strong class='sup-title'><?php the_field('supTitle'); ?></strong>
						<?php } ?>
						<h1 class='h2 light'>
							<a href='<?php the_field('lienNous', 'options'); ?>' class='animTxt'><?php the_field('title1'); ?></a>
							<strong class='animTxt'><?php the_field('title2'); ?></strong><span class='animTxt'> <?php the_field('title3'); ?></span>
							<a href='#ateliers' class='animTxt scrollTo'><?php the_field('title4'); ?></a><span class='animTxt'><?php the_field('title5'); ?></span>
							<a href='#interventions' class='animTxt scrollTo'><?php the_field('title6'); ?></a>.
						</h1>
						<span class='sub-title'><?php the_field('subTitle'); ?></span>
						<?php $slides = get_field('slides'); if($slides){ $count = 1; ?>
							<div id='smallSlider' class='small-slider'>
								<ul><?php foreach($slides as $slide){  ?><li class='small-slide' id='slide<?php echo $count; ?>'>
									<div class='black'><?php echo $slide['contentSlide']; ?></div>
								</li><?php $count ++; } ?></ul>
							</div>
						<?php } ?>
						<a href='#ateliers' class='icon-down scrollTo btn-down'></a>
					</div>
				</div>
				<div id='bgVous'></div>
			</header>

			<section id='ateliers' class='section'>
				<div class='section-cell'>
					<h2><?php the_field('ateliersTitle'); ?></h2>
					<div class='container'>
						<?php $ateliersTerm = get_field('ateliersCat');
						$terms = get_terms('prestation-categorie', array('parent' => $ateliersTerm));
						if($terms){ ?>
							<div class='presta-filtres'>
								<span>Les thèmes abordés:</span>
								<ul>
									<li><button class='actif' data-cat-name='all'>Tous</button></li>
									<?php foreach($terms as $term){ ?>
										<li><button data-cat-name='<?php echo $term->slug; ?>'><?php echo $term->name; ?></button></li>
									<?php } ?>
								</ul>
							</div>
						<?php } ?>
						<ul class='presta-list presta-list-colors1'>
							<?php
							$ateliersTermSlug = get_term($ateliersTerm, 'prestation-categorie')->slug;
							$loop = new WP_Query(array('post_type' => 'prestation', 'posts_per_page' => -1, 'tax_query' => array(array('taxonomy' => 'prestation-categorie', 'field' => 'slug', 'terms' => $ateliersTermSlug))));
							if($loop->have_posts()){
								while($loop->have_posts()){ $loop->the_post(); $terms = wp_get_post_terms($post->ID, 'prestation-categorie'); ?><!--
									--><li class='presta-item' <?php if($terms){ echo "data-cat='"; foreach($terms as $term){ if($term->parent !== 0) echo $term->slug.','; } echo "'"; } ?>>
										<a href='<?php the_permalink(); ?>' class='square-link'>
											<img src='<?php echo wp_get_attachment_image_src(get_field('vignette'), 'presta-thumb')[0]; ?>' width='360' height='360' alt='<?php echo get_post_meta(get_field('vignette'))['_wp_attachment_image_alt']['0']; ?>'/>
											<span class='hover'>
												<span>
													<strong class='title'><span><?php the_title(); ?></span></strong>
													<span class='cat'>
														<?php
														$terms = wp_get_post_terms($post->ID, 'prestation-categorie');
														if($terms){
															$i = 0;
															$count = 0;
															$total = count($terms);
															for($i; $i<$total; $i++){
																if($terms[$i]->parent === 0){
																	unset($terms[$i]);
																	$terms = array_values($terms);
																}
															}

															$total = count($terms);
															foreach($terms as $term){
																if($term->parent !== 0){
																	$count ++;
																	$output = $term->name;
																	$output .= ($count > 0 && $count !== $total) ? ', ' : '';
																	echo $output;
																}
															}
														} ?>
													</span>
													<span class='link'>Je brûle d'en savoir plus</span>
												</span>
											</span>
										</a>
									</li><!--
								--><?php }
							} wp_reset_query();
							?><li>
								<img src='<?php echo get_template_directory_uri(); ?>/layoutImg/mask.png' alt='' width='360' height='360'>
								<a href='<?php the_field('lienContact', 'options'); ?>' class='contact-link'>
									<span>
										<i><?php the_field('ateliersContact'); ?></i>
										<span class='link'>contactez-nous</span>
									</span>
								</a>
							</li>
						</ul>
					</div>
					<div class='bg-ateliers' id='bgA1'></div>
					<div class='bg-ateliers' id='bgA2'></div>
				</div>
			</section>

			<section id='interventions' class='section'>
				<div class='section-cell'>
					<h2><?php the_field('interventionsTitle'); ?></h2>
					<div class='container'>
						<?php $interventionsTerm = get_field('interventionsCat');
						$terms = get_terms('prestation-categorie', array('parent' => $interventionsTerm));
						if($terms){ ?>
							<div class='presta-filtres'>
								<span>Les thèmes abordés:</span>
								<ul>
									<li><button class='actif' data-cat-name='all'>Tous</button></li>
									<?php foreach($terms as $term){ ?>
										<li><button data-cat-name='<?php echo $term->slug; ?>'><?php echo $term->name; ?></button></li>
									<?php } ?>
								</ul>
							</div>
						<?php } ?>
						<ul class='presta-list presta-list-colors2'>
							<?php
							$interventionsTermSlug = get_term($interventionsTerm, 'prestation-categorie')->slug;
							$loop = new WP_Query(array('post_type' => 'prestation', 'posts_per_page' => -1, 'tax_query' => array(array('taxonomy' => 'prestation-categorie', 'field' => 'slug', 'terms' => $interventionsTermSlug))));
							if($loop->have_posts()){
								while($loop->have_posts()){ $loop->the_post(); $terms = wp_get_post_terms($post->ID, 'prestation-categorie'); ?><!--
									--><li class='presta-item' <?php if($terms){ echo "data-cat='"; foreach($terms as $term){ if($term->parent !== 0) echo $term->slug.','; } echo "'"; } ?>>
										<a href='<?php the_permalink(); ?>' class='square-link'>
											<img src='<?php echo wp_get_attachment_image_src(get_field('vignette'), 'presta-thumb')[0]; ?>' width='360' height='360' alt='<?php echo get_post_meta(get_field('vignette'))['_wp_attachment_image_alt']['0']; ?>'/>
											<span class='hover'>
												<span>
													<strong class='title'><span><?php the_title(); ?></span></strong>
													<span class='cat'><?php the_field('subTitle'); ?></span>
													<span class='link'>Je brûle d'en savoir plus</span>
												</span>
											</span>
										</a>
									</li><!--
								--><?php }
							} wp_reset_query();
							?>
						</ul>
						<a href='<?php the_field('lienContact', 'options'); ?>' class='contact-link big-link peignes'>
							<i><?php the_field('interventionsContact'); ?></i>
							<span class='link'>contactez-nous</span>
						</a>
					</div>
					<div class='bg-interventions' id='bgI1'></div>
					<div class='bg-interventions' id='bgI2'></div>
				</div>
			</section>

			<aside class='center plus-presta'>
				<h2><span><?php the_field('clientsTitle'); ?></span></h2>
				<div class='container'>
					<?php if(get_field('btnIntervenants')){ ?>
						<a href='<?php the_field('lienNous', 'options'); ?>#intervenants' class='btn btn-right'><?php the_field('btnIntervenants'); ?></a>
					<?php } if(get_field('btnClients')){ ?>
						<a href='<?php echo get_category_link(get_category_by_slug('cas-client')->term_id); ?>' class='btn btn-right'><?php the_field('btnClients'); ?></a>
					<?php } ?>
				</div>
			</aside>

		<?php else : ?>

			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>
