<?php get_header(); ?>

	<?php if( have_posts() ){ ?>

		<?php
			$prev = get_previous_post();
			$next = get_next_post();
			if($next || $prev){
		?>
		<nav role='navigation' class='second-menu nav-single' id='fixedMenu'>
			<ul>
				<?php if($prev){ ?>
					<li class='left'><a href='<?php echo get_permalink( $prev->ID ); ?>' title='<?php echo $prev->post_title; ?>' class='h5'><span><?php echo get_the_title( $prev->ID ); ?></span></a></li>
				<?php } if($next){ ?>
					<li class='right'><a href='<?php echo get_permalink( $next->ID ); ?>' title='<?php echo $next->post_title; ?>' class='h5'><span><?php echo get_the_title( $next->ID ); ?></span></a></li>
				<?php } ?>
			</ul>
		</nav>
		<?php } ?>
	<?php } ?>

	<main id='wrapper' role='main'>

		<?php if( have_posts() ) : the_post(); ?>

			<header class='head bg-yellow section'>
				<a href='<?php the_field('lienPresta', 'options'); ?>' class='back-link'>Retour</a>
				<div class='section-cell'>
					<div class='container'>
						<?php if(get_field('supTitle')){ ?>
							<strong class='sup-title'><?php the_field('supTitle'); ?></strong>
						<?php } ?>
						<h1><?php the_title(); ?></h1>
						<strong class='sup-title'>
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
						</strong>
						<?php
							$imgRatio = 0;
							if(has_post_thumbnail()){
								$imgData = wp_get_attachment_metadata( get_post_thumbnail_id() );
								$imgRatio = round($imgData['width']/$imgData['height'], 2);
							}
						?>
						<div class='img-presta <?php if($imgRatio < 0.75){ echo "portrait"; } if($imgRatio > 1.1){ echo "paysage"; } ?>'>
							<?php the_post_thumbnail(); ?>
							<?php if(get_field('bulle')){ ?>
								<h2><?php the_field('bulle'); ?></h2>
							<?php } ?>
						</div>
						<?php if(get_field('fiche')){ ?>
							<a href='<?php the_field('fiche'); ?>' class='btn btn-download' target='_blank'>La fiche complète</a>
						<?php } ?>
					</div>
				</div>
			</header>

			<article class='page-content container' id='page-content'>

				<aside class='presta-sidebar'>
					<div class='grp-sidebar'><?php if(get_field('sCible')){ ?>
							<span class="target side-title">Cible</span>
							<p><?php the_field('sCible'); ?></p>
						<?php } if(get_field('sDuree')){ ?>
							<span class="clock side-title">Durée</span>
							<p><?php the_field('sDuree'); ?></p>
						<?php } ?></div><div class='grp-sidebar'><?php if(get_field('sLieu')){ ?>
							<span class="location side-title">Lieu</span>
							<p><?php the_field('sLieu'); ?></p>
						<?php } if(get_field('sNumerus')){ ?>
							<span class="numerus side-title">Numérus Clausus</span>
							<p><?php the_field('sNumerus'); ?></p>
						<?php } if( have_rows('reference_client') ): ?>
							<span class="ref-client side-title">Référence client</span>
							<div class="wrapper-ref-client">
							<?php while ( have_rows('reference_client') ) : the_row(); ?>
							<?php if(get_sub_field('link_website')){?>
								<div class='reference-client'>
									<a target="_blank" title='<?php the_sub_field('client_name'); ?>' href="<?php the_sub_field('link_website'); ?>">
										<span>
											<img src="<?php echo get_sub_field('logo')['url']; ?>" alt="<?php echo get_sub_field('logo')['alt']; ?>" />	
										</span>
									</a>
								</div>
							<?php }else{?>
								<div class='reference-client without-link'>
									<span>
										<img src="<?php echo get_sub_field('logo')['url']; ?>" alt="<?php echo get_sub_field('logo')['alt']; ?>" />	
									</span>
								</div>
							<?php } ?>
							
							<?php endwhile;?>
							</div>
						<?php endif; ?>
					</div>
					<div>
					<a href='<?php the_field('lienContact', 'options'); ?>?devis=<?php echo $post->ID; ?>' class='btn btn-right'>Demande de devis</a>
					</div>
				</aside><div class='presta-content'>
					<?php the_content(); ?>
					<?php if(get_field('bonus')){ ?>
						<p class='note'><?php the_field('bonus'); ?></p>
					<?php } ?>
				</div>

			</article>

		<?php else : ?>

			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>
