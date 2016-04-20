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
					</div>
				</div>
				<?php the_post_thumbnail('full', array('class' => 'img')); ?>
				<div class='fd'></div>
			</header>

			<section class='page-content container' id='page-content'>

				<?php the_content(); ?>

			</section>

		<?php else : ?>

			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>
