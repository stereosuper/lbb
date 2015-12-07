<?php get_header(); ?>
	
	<main id='wrapper' role='main'>

		<?php if ( have_posts() ) : the_post(); ?>

			<header class='head section bg-white'>
				<div class='section-cell'>
					<div class='container'>
						<?php if(get_field('supTitle')){ ?>
							<strong class='sup-title'><?php the_field('supTitle'); ?></strong>
						<?php } ?>
						<h1 class='animTxt'><?php the_title(); ?></h1>
						<span class='sup-title'>
							Publié
							<?php
								$cats = get_the_category();
								$count = 0;
								$nbCats = count($cats);
								echo ' dans ';
								foreach($cats as $cat){
									$count ++;
									echo "<a href='".get_category_link($cat->term_id)."'>".$cat->name."</a>";
									if($count > 0 && $count !== $nbCats) echo ', ';
								}
							?>
							<?php echo ' le ' . get_the_date(); ?> par
							<a href='<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>'><?php the_author(); ?></a>
						</span>
					</div>
				</div>
				<?php the_post_thumbnail('full', array('class' => 'img')); ?>
				<div class='fd'></div>
			</header>

			<nav role='navigation' class='nav-blog' id='fixedMenu'>
				<div class='big-container clearfix'>
					<?php get_template_part('includes/search'); ?>
					<div class='share'>
						<p>Partager sur :</p>
						<ul>
							<li>
								<a href='http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' target='_blank' rel='nofollow' title='Partager cet article sur Facebook' class='icon-facebook'></a>
							</li><li>
								<a href='http://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=labelleboite' target='_blank' rel='nofollow' title='Partager cet article sur Twitter' class='icon-twitter'></a>
							</li><li>
								<a href='http://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' target='_blank' rel='nofollow' title='Partager cet article sur LinkedIn' class='icon-linkedin'></a>
							</li>
						</ul>
					</div>
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

			<article class='page-content container' id='page-content'>
				
				<?php if(get_field('chapeau')){ ?>
					<p class='chapeau'>
						<?php the_field('chapeau'); ?>
					</p>
				<?php } ?>
				
				<?php the_content(); ?>

				<div class='share'>
					<p>Partager sur :</p>
					<ul>
						<li>
							<a href='http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&t=<?php the_title(); ?>' target='_blank' rel='nofollow' title='Partager cet article sur Facebook' class='icon-facebook'></a>
						</li><li>
							<a href='http://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>&via=labelleboite' target='_blank' rel='nofollow' title='Partager cet article sur Twitter' class='icon-twitter'></a>
						</li><li>
							<a href='http://www.linkedin.com/shareArticle?mini=true&url=<?php the_permalink(); ?>&title=<?php the_title(); ?>' target='_blank' rel='nofollow' title='Partager cet article sur LinkedIn' class='icon-linkedin'></a>
						</li>
					</ul>
				</div>

			</article>
			
			<aside class='comments'>
				<?php comments_template(); ?>
			</aside>
		
		<?php else : ?>
					
			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>