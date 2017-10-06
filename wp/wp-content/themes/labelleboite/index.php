<?php get_header(); ?>

	<main id='wrapper' role='main'>

		<header class='head section <?php if(is_category('cas-client')){ echo "bg-blue"; }else{ echo "bg-pink"; } ?>'>
			<div class='section-cell'>
				<div class='container'>
					<h1 class='animTxt'>
						<?php
						if(is_search()){
							echo 'Résultats de la recherche';
						}else if(is_category()){
							single_cat_title( '', true );
						}else if(is_author()){
							$curauth = isset($_GET['author_name']) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
							echo $curauth->nickname;
						}else{
							echo 'Blog';
						}
						?>
					</h1>
				</div>
			</div>
			<div id='bgMasques' class='blue'></div>
		</header>

		<nav role='navigation' class='nav-blog' id='fixedMenu'>
			<div class='big-container clearfix'>
				<?php get_template_part('includes/search'); ?>
				<div class='cats-container'>
					<button id='catsBtn' class='cats-btn'>catégories</button>
					<ul id='cats' class='cats'>
						<?php
							$cats = get_categories();
							foreach($cats as $cat){
								echo "<li><a href='".get_category_link($cat->term_id)."'>".$cat->name."</a></li>";
							}
						?>
					</ul>
					<button id='closeCats' class='close-cats'>Close</button>
				</div>
			</div>
		</nav>

		<section class='container page-content' id='page-content'>

			<?php if ( have_posts() ) : $count = 0;

				$catCasClient = get_category_by_slug( 'cas-client' );
				$idCasClient = $catCasClient->term_id;
			?>

				<?php while ( have_posts() ) : the_post(); ?>
					<?php
						$cats = get_the_category();
						$count = 0;
						$nbCats = count($cats);
						$outputCats = ' dans ';
						$isCasClient = false;
						foreach($cats as $cat){
							$count ++;
							$outputCats .= "<a href='".get_category_link($cat->term_id)."'>".$cat->name."</a>";
							if($count > 0 && $count !== $nbCats) $outputCats .= ', ';
							if($cat->term_id === $idCasClient) $isCasClient = true;
						}
					?><article class='post <?php if(get_field('vignette')) echo "has-img"; if($isCasClient) echo " cas-client"; ?>'>

						<a href='<?php the_permalink(); ?>' class='img'>
							<?php if(get_field('vignette')){
								if($count < 1){
									echo wp_get_attachment_image(get_field('vignette'), 'medium');
								}else{ ?>
									<img src='<?php echo wp_get_attachment_image_src(get_field('vignette'), 'presta-thumb')[0]; ?>' width='300' height='300' alt='<?php echo get_post_meta(get_field('vignette'))['_wp_attachment_image_alt']['0']; ?>'/>
								<?php }
							} ?>
						</a><div class='content'>
							<h2><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h2>
							<span class='sup-title'>
								Publié <?php echo $outputCats . ' le ' . get_the_date(); ?> par
								<a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
							</span>
							<p><a href='<?php the_permalink(); ?>'><?php the_field('chapeau'); ?></a></p>
						</div>

				</article><?php $count++; endwhile; ?>

				<div class='pagination'>
				<?php
					global $wp_query;

					$big = 999999999; // need an unlikely integer

					echo paginate_links( array(
						'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
						'format' => '?paged=%#%',
						'current' => max( 1, get_query_var('paged') ),
						'total' => $wp_query->max_num_pages,
						'mid_size' => '1'
					) );
					?>
				</div>

			<?php else : ?>

				<p>
					<?php
						if(is_search()){
							echo "Désolé, votre recherche n'a retourné aucun résultats parmi les articles.<br>";
						}else if(is_category()){
							echo "Désolé, il n'y a pas d'articles dans cette catégorie pour le moment!<br>";
						}else if(is_author()){
							echo "Désolé, il n'y a pas d'articles écrits par cet auteur pour le moment!<br>";
						}else{
							echo "Désolé, il n'y a pas d'articles pour le moment!<br>";
						}

						if(is_search() || is_category() || is_author()){ ?>
							<a href='<?php echo get_permalink( get_option('page_for_posts' ) ); ?>'>Retour au blog</a>
						<?php }else{ ?>
							<a href='<?php echo site_url(); ?>'>Retour à l'accueil</a>
						<?php }
					?>
				</p>

			<?php endif; ?>

		</section>

	</main>

<?php get_footer(); ?>
