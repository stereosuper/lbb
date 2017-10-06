<?php
/*
Template Name: About
*/

get_header(); ?>

	<main id='wrapper' class='bg-purple' role='main'>

		<?php if ( have_posts() ) : the_post(); ?>

			<nav role='navigation' class='second-menu' id='fixedMenuStep'>
				<ul>
					<li class='on down'><a href='#equipe' class='h5 scrollTo'><?php the_field('equipeTitre'); ?></a></li>
					<li><a href='#intervenants' class='h5 scrollTo'><?php the_field('intervenantsTitre'); ?></a></li>
				</ul>
			</nav>

			<header class='head section'>
				<div class='section-cell'>
					<div class='container'>
						<?php if(get_field('supTitle')){ ?>
							<strong class='sup-title'><?php the_field('supTitle'); ?></strong>
						<?php } ?>
						<h1 class='animTxt'><?php the_title(); ?></h1>
						<?php $slides = get_field('slides'); if($slides){ $count = 1; ?>
							<div id='smallSlider' class='small-slider'>
								<ul><?php foreach($slides as $slide){  ?><li class='small-slide' id='slide<?php echo $count; ?>'>
									<div>
										<?php
											$output = $slide['contentSlide'];
											if(!empty($slide['imgSlide'])){
												$output = "<div class='img-slide'>".wp_get_attachment_image($slide['imgSlide'], 'medium')."</div><div class='txt-slide'>".$slide['contentSlide']."</div>";
											}
											echo $output;
										?>
									</div>
								</li><?php $count ++; } ?></ul>
							</div>
						<?php } ?>
						<a href='#equipe' class='icon-down scrollTo btn-down'></a>
						<p class='google-text'><?php the_field('google', 'options'); ?></p>
					</div>
				</div>
			</header>

			<section id='equipe' class='section'>
				<div class='section-cell'>
					<h2><?php the_field('equipeTitre'); ?></h2>
					<div class='container'>
						<div class='small-p'><?php the_field('equipeTxt'); ?></div>
						<?php $loop = new WP_Query(array('order' => 'ASC', 'post_type' => 'rat', 'posts_per_page' => -1, 'tax_query' => array(
							array(
								'taxonomy' => 'rat-categorie',
								'field'    => 'slug',
								'terms'    => 'boss',
							),
						),));
						if($loop->have_posts()){ ?>
							<ul class='presta-list'>
								<?php while($loop->have_posts()){ $loop->the_post(); ?><!--
									--><li class='presta-item'>
										<a href='<?php the_permalink(); ?>' class='square-link'>
											<img src='<?php echo wp_get_attachment_image_src(get_field('vignette'), 'presta-thumb')[0]; ?>' width='360' height='360' alt='<?php echo get_post_meta(get_field('vignette'))['_wp_attachment_image_alt']['0']; ?>'/>
											<span class='hover'>
												<span>
													<strong class='title'><span><?php the_title(); ?></span></strong>
													<span class='cat'><?php the_field('poste'); ?></span>
													<span class='link'>Je brûle d'en savoir plus</span>
												</span>
											</span>
										</a>
									</li><!--
								--><?php } ?>
							</ul>
						<?php } wp_reset_query(); ?>
					</div>
				</div>
			</section>

			<section id='intervenants' class='section'>
				<div class='section-cell'>
					<h2><?php the_field('intervenantsTitre'); ?></h2>
					<div class='container'>
						<div class='small-p'><?php the_field('intervenantsTxt'); ?></div>


						<?php $loop = new WP_Query(array('order' => 'ASC', 'post_type' => 'rat', 'posts_per_page' => -1, 'tax_query' => array(
							array(
								'taxonomy' => 'rat-categorie',
								'field'    => 'slug',
								'terms'    => 'intervenants',
							),
						),));
						if($loop->have_posts()){ ?>
							<ul class='presta-list small-presta-list'>
								<?php while($loop->have_posts()){ $loop->the_post(); ?><!--
									--><li class='presta-item'>
										<a href='<?php the_permalink(); ?>' class='square-link'>
											<img src='<?php echo wp_get_attachment_image_src(get_field('vignette'), 'presta-thumb')[0]; ?>' width='360' height='360' alt='<?php echo get_post_meta(get_field('vignette'))['_wp_attachment_image_alt']['0']; ?>'/>
											<span class='hover'>
												<span>
													<strong class='title'><span><?php the_title(); ?></span></strong>
													<span class='cat'><?php the_field('poste'); ?></span>
													<span class='link'>Je brûle d'en savoir plus</span>
												</span>
											</span>
										</a>
									</li><!--
								--><?php } ?>
							</ul>
						<?php } wp_reset_query(); ?>
					</div>
				</div>
			</section>

			<aside id='prestations' class='center plus-presta'>
				<h2><?php the_field('prestationsTitre'); ?></h2>
				<div class='container'>
					<div class='small-p'><?php the_field('prestationsTxt'); ?></div>
					<a href='<?php the_field('lienPresta', 'options'); ?>' class='btn btn-right'><?php the_field('prestationsBtn'); ?></a>
				</div>
			</aside>

		<?php else : ?>

			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>
