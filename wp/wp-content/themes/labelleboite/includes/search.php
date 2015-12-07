<form role='search' method='get' class='searchform' action='<?php echo home_url( '/' ); ?>' id='searchform'>
	<input type='search' name='s' value='<?php the_search_query(); ?>' placeholder='Rechercher' id='searchinput'>
	<button type='submit' id='searchsubmit'>Go</button>
</form>