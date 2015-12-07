<?php define( 'LABELLEBOITE_VERSION', 1.0 );
add_filter( 'auto_update_plugin', '__return_true' );


/*-----------------------------------------------------------------------------------*/
/* General
/*-----------------------------------------------------------------------------------*/
// Theme support
add_theme_support( 'html5' );
add_theme_support( 'post-thumbnails' ); 

// Feed
add_theme_support( 'automatic-feed-links' );
function remove_comments_rss( $for_comments ){ return; }
add_filter('post_comments_feed_link', 'remove_comments_rss');

// Admin bar
show_admin_bar(false);

// Search results
function search_filter($query){
    if($query->is_main_query() && $query->is_search){
        $query->set('post_type', 'post');
    }
}
add_action('pre_get_posts', 'search_filter');

// Disable Tags
function unregister_tags() {
    unregister_taxonomy_for_object_type('post_tag', 'post');
}
add_action('init', 'unregister_tags');

// Add caps for editors and remove some menu items
function add_theme_caps(){
    $role = get_role('editor');
    $role->add_cap('edit_theme_options');
    $role->add_cap('manage_options');
}
add_action('admin_init', 'add_theme_caps');

function remove_menu_items(){
    $currentRoles = wp_get_current_user()->roles;
    if($currentRoles[0] === 'editor'){
        remove_menu_page( 'edit.php?post_type=acf' );
        remove_menu_page( 'wpseo_dashboard' );
        remove_menu_page( 'WP-Optimize' );
        remove_menu_page( 'tools.php' );
    }
}
add_action('admin_menu', 'remove_menu_items', 99);

function remove_admin_bar_items( $wp_admin_bar ){
    $currentRoles = wp_get_current_user()->roles;
    if($currentRoles[0] === 'editor'){
        $wp_admin_bar->remove_node( 'wpseo-menu' );
    }
}
add_action('admin_bar_menu', 'remove_admin_bar_items', 99);


/*-----------------------------------------------------------------------------------*/
/* Hide Wordpress version and stuff for security, hide login errors
/*-----------------------------------------------------------------------------------*/
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');

add_filter('login_errors', create_function('$a', "return null;"));

function remove_comment_author_class( $classes ){
	foreach( $classes as $key => $class ){
		if(strstr($class, "comment-author-")) 
			unset( $classes[$key] );
	}
	return $classes;
}
add_filter( 'comment_class' , 'remove_comment_author_class' );


/*-----------------------------------------------------------------------------------*/
/* Gestion erreurs formulaire comments
/*-----------------------------------------------------------------------------------*/
function lbb_die_handler($message, $title='', $args=array()){
    if(empty($_POST['errorcomment'])){
        $_POST['errorcomment'] = $message;
    }

    if(!session_id())
        session_start();

    $_SESSION = $_POST;
    session_write_close();

    $url = strtok(wp_get_referer(), '?');
    header('Location: ' . $url . '?error=true#commentform');
    die();
}
function get_lbb_die_handler(){
    return 'lbb_die_handler';
}
add_filter('wp_die_handler', 'get_lbb_die_handler');


/*-----------------------------------------------------------------------------------*/
/* Admin
/*-----------------------------------------------------------------------------------*/

// Enlever le lien par défaut autour des images
function lbb_imagelink_setup(){
	$image_set = get_option( 'image_default_link_type' );
    if($image_set !== 'none')
        update_option('image_default_link_type', 'none');
}
add_action('admin_init', 'lbb_imagelink_setup', 10);

// New button wysiwyg
if(!function_exists('lbb_button')){
    function lbb_button( $buttons ){
        array_unshift( $buttons, 'styleselect' );
        return $buttons;
    }
}
add_filter( 'mce_buttons_2', 'lbb_button' );
 
if(!function_exists('lbb_mce_before_init')){
    function lbb_mce_before_init( $styles ){
        $style_formats = array(
            array(
                'title' => 'Bouton bas',
                'selector' => 'a',
                'classes' => 'btn btn-down'
            ),
            array(
                'title' => 'Bouton droite',
                'selector' => 'a',
                'classes' => 'btn btn-right'
            ),
            array(
                'title' => 'Colonne',
                'wrapper' => 'div',
                'classes' => 'w50'
            )
        );
        $styles['style_formats'] = json_encode( $style_formats );

        // Remove h1 and code
        $styles['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';
        // Let only the colors you want
        $styles['textcolor_map'] = '[' . "'000000', 'Noir', '565656', 'Texte', 'b5006a', 'Violet'" . ']';
        return $styles;
    }
}
add_filter( 'tiny_mce_before_init', 'lbb_mce_before_init' );

if(!function_exists('lbb_init_editor_styles')){
    function lbb_init_editor_styles(){
        add_editor_style();
    }
    add_action( 'after_setup_theme', 'lbb_init_editor_styles' );
}

// Custom posts in the dashboard
function add_right_now_custom_post() {
    $post_types = get_post_types(array( '_builtin' => false ) , 'objects' , 'and');
    foreach($post_types as $post_type){
        $cpt_name = $post_type->name;
        if($cpt_name != 'acf'){
            $num_posts = wp_count_posts($post_type->name);
            $num = number_format_i18n($num_posts->publish);
            $text = _n($post_type->labels->name, $post_type->labels->name , intval($num_posts->publish));
            echo '<li class="'. $cpt_name .'-count"><tr><a class="'.$cpt_name.'" href="edit.php?post_type='.$cpt_name.'"><td></td>' . $num . ' <td>' . $text . '</td></a></tr></li>';
        }
    }
}
add_action('dashboard_glance_items', 'add_right_now_custom_post');

// Page d'options
function lbb_menu_order( $menu_ord ){  
    if(!$menu_ord) return true;  
    $menu = 'acf-options';
    $menu_ord = array_diff($menu_ord, array( $menu ));
    array_splice( $menu_ord, 1, 0, array( $menu ) );
    return $menu_ord;
}  
add_filter('custom_menu_order', 'lbb_menu_order');
add_filter('menu_order', 'lbb_menu_order');

// Thumbnail sizes
function lbb_thumbnail_sizes(){
    add_image_size( 'presta-thumb', 360, 360, true );
    add_image_size( 'blog-thumb', 460, 460, true );
}
add_action( 'after_setup_theme', 'lbb_thumbnail_sizes' );


/*-----------------------------------------------------------------------------------*/
/* Menus
/*-----------------------------------------------------------------------------------*/
register_nav_menus( 
	array(
		'primary' => 'Primary Menu',
		'secondary1' => 'First Footer Menu',
		'secondary2' => 'Second Footer Menu',
		'secondary3' => 'Third Footer Menu'
	)
);

// Cleanup WP Menu html
function css_attributes_filter($var) {
     return is_array($var) ? array_intersect($var, array('current-menu-item', 'current_page_parent')) : '';
}
add_filter('nav_menu_css_class', 'css_attributes_filter', 10, 1);
add_filter('page_css_class', 'css_attributes_filter', 10, 1);


/*-----------------------------------------------------------------------------------*/
/* Custom Post Types => Témoignages
/*-----------------------------------------------------------------------------------*/
function lbb_post_type() { 
  	register_post_type('temoignage', array(
    	'label' => 'Témoignages',
	    'singular_label' => 'Témoignage',
	    'public' => true,
	    'publicly_queryable' => false,
	    'query_var' => false,
	    'menu_icon' => 'dashicons-format-status',
	    'supports' => array('title', 'thumbnail')
  	));
    register_post_type('prestation', array(
        'label' => 'Prestations',
        'singular_label' => 'Prestation',
        'public' => true,
        'menu_icon' => 'dashicons-palmtree',
        'supports' => array('title', 'editor', 'thumbnail')
    ));
}
add_action( 'init', 'lbb_post_type' );

function lbb_taxonomy(){
    register_taxonomy('prestation-categorie', array('prestation'), array(
        'hierarchical' => true,
        'label' => 'Catégories',
        'singular_label' => 'Catégorie',
        'hierarchical' => true
    ));
}
add_action( 'init', 'lbb_taxonomy' );


/*-----------------------------------------------------------------------------------*/
/* Sidebars
/*-----------------------------------------------------------------------------------*/
function lbb_register_sidebars(){
	register_sidebar(array(				
		'id' => 'footer', 					
		'name' => 'Footer',				
		'description' => 'Partie droite du footer', 
		'before_widget' => '',
		'after_widget' => '',
		'before_title' => '',
		'after_title' => '',
		'empty_title'=> ''
	));
} 
add_action( 'widgets_init', 'lbb_register_sidebars' );


/*-----------------------------------------------------------------------------------*/
/* Widgets
/*-----------------------------------------------------------------------------------*/

// widget phrase creuse
class Phrase_Widget extends WP_Widget{
    function Phrase_Widget() {
        parent::__construct(false, 'la Belle Boîte - Phrase creuse');
    }
    function form($instance){
        $title = esc_attr($instance['title']);
        $first = esc_attr($instance['first']);
        $phrases = esc_attr($instance['phrases']);
        $btn = esc_attr($instance['btn']);
        ?>
            <p><label for="<?php echo $this->get_field_id('title'); ?>">Titre :</label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $title; ?>" /></p>
            <p><label for="<?php echo $this->get_field_id('first'); ?>">Phrase affichée par défaut :</label> <input class="widefat" id="<?php echo $this->get_field_id('first'); ?>" name="<?php echo $this->get_field_name('first'); ?>" value="<?php echo $first; ?>" /></p>
            <p><label for="<?php echo $this->get_field_id('phrases'); ?>">Phrases (entre guillemets et séparées par une virgule) :</label> <textarea style="height:200px;" class="widefat" id="<?php echo $this->get_field_id('phrases'); ?>" name="<?php echo $this->get_field_name('phrases'); ?>"><?php echo $phrases; ?></textarea></p>
            <p><label for="<?php echo $this->get_field_id('tbtn'); ?>">Texte du bouton :</label> <input class="widefat" id="<?php echo $this->get_field_id('btn'); ?>" name="<?php echo $this->get_field_name('btn'); ?>" value="<?php echo $btn; ?>" /></p>
        <?php
    }
    function update($new_instance, $old_instance){
        return $new_instance;
    }
    function widget($args, $instance){ ?>
        <?php if($instance['title'] && $instance['first']){ ?>
        	<span class='sup-title'><?php echo $instance['title']; ?></span>
        	<div id='phrase-creuse'>
        	    <p class='h3'><span><?php echo $instance['first']; ?></span></p>
        	    <?php if($instance['btn'] && $instance['phrases']){ ?>
        	    	<button class='sub-title'><span class='icon-loop'></span> <?php echo $instance['btn']; ?></button>
        	    <?php } ?>
        	    <div id='cisors'>
        	        <div id="cisors1" class='icon-half-cisors cisors'></div>
        	        <div id="cisors2" class='icon-half-cisors2 cisors'></div>
        	    </div>
        	</div>
        	<?php if($instance['phrases']){ ?>
        		<script>var sentences = [<?php echo $instance['phrases']; ?>];</script>
        	<?php } ?>
        <?php }
    }
}
register_widget('Phrase_Widget');


/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/

function lbb_scripts(){ 
		// header
		wp_enqueue_style( 'lbb-style', get_template_directory_uri() . '/css/style.css', array(), LABELLEBOITE_VERSION );
		wp_enqueue_script( 'lbb-modernizr', get_template_directory_uri() . '/js/modernizr.min.js', array(), null);
		
		// footer
	    wp_deregister_script('jquery');
		wp_enqueue_script( 'isMobile', get_template_directory_uri() . '/js/isMobile.min.js', array(), null, true );
		wp_enqueue_script( 'tweenMax', get_template_directory_uri() . '/js/tweenMax.min.js', array(), null, true );
		wp_enqueue_script( 'tweenSprite', get_template_directory_uri() . '/js/tweenSprite.min.js', array(), null, true );
		wp_enqueue_script( 'splitText', get_template_directory_uri() . '/js/splitText.min.js', array(), null, true );
		wp_enqueue_script( 'script', get_template_directory_uri() . '/js/script.js', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'lbb_scripts' );