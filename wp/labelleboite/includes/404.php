<header class='head bg-white'>
    <div class='section'>
    	<div class='section-cell'>
    		<div class='container'>
    			<strong class='sup-title'>Ooops! La page est introuvable</strong>
    			<h1 class='animTxt'>404</h1>
    		</div>
    	</div>
        <?php echo wp_get_attachment_image(get_field('404img', 'options'), 'full', false, array('class' => 'img')); ?>
    	<div class='fd'></div>
    </div>
</header>

<section class='page-content container' id='page-content'>

    <?php the_field('404', 'options'); ?>

</section>
