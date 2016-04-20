<?php
define( 'LABELLEBOITE_VERSION', 1.0 );

/*-----------------------------------------------------------------------------------*/
/* General
/*-----------------------------------------------------------------------------------*/
// Plugins updates
add_filter('auto_update_plugin', '__return_true');

// Theme support
add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'widgets'));
add_theme_support('post-thumbnails');

// Admin bar
show_admin_bar(false);

// Search results
function lbb_search_filter($query){
    if($query->is_main_query() && $query->is_search){
        $query->set('post_type', 'post');
    }
}
add_action('pre_get_posts', 'lbb_search_filter');

// Disable Tags
function lbb_unregister_tags(){
    unregister_taxonomy_for_object_type('post_tag', 'post');
}
add_action('init', 'lbb_unregister_tags');

// Add caps for editors
function lbb_add_theme_caps(){
    $role = get_role('editor');
    $role->add_cap('edit_theme_options');
    $role->add_cap('manage_options');
}
add_action('admin_init', 'lbb_add_theme_caps');

// Remove some menu items for editors
function lbb_remove_menu_items(){
    $currentRoles = wp_get_current_user()->roles;
    if($currentRoles[0] === 'editor'){
        remove_menu_page( 'edit.php?post_type=acf' );
        remove_menu_page( 'wpseo_dashboard' );
        remove_menu_page( 'WP-Optimize' );
        remove_menu_page( 'tools.php' );
    }
}
add_action('admin_menu', 'lbb_remove_menu_items', 99);

// Remove some admin bar items for editors
function lbb_remove_admin_bar_items( $wp_admin_bar ){
    $currentRoles = wp_get_current_user()->roles;
    if($currentRoles[0] === 'editor'){
        $wp_admin_bar->remove_node( 'wpseo-menu' );
    }
}
add_action('admin_bar_menu', 'lbb_remove_admin_bar_items', 99);

// Add category class on single post
function lbb_add_category_to_single($classes){
    if(is_single()){
        global $post;
        foreach((get_the_category($post->ID)) as $category){
            $classes[] = 'single-'.$category->category_nicename;
        }
    }
    return $classes;
}
add_filter('body_class','lbb_add_category_to_single');


/*-----------------------------------------------------------------------------------*/
/* Clean WordPress head and remove some stuff for security
/*-----------------------------------------------------------------------------------*/
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');

// remove api rest links
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// remove comment author class
function lbb_remove_comment_author_class( $classes ){
	foreach( $classes as $key => $class ){
		if(strstr($class, "comment-author-"))
			unset( $classes[$key] );
	}
	return $classes;
}
add_filter( 'comment_class' , 'lbb_remove_comment_author_class' );

// remove login errors
add_filter('login_errors', create_function('$a', "return null;"));


/*-----------------------------------------------------------------------------------*/
/* Gestion erreurs formulaire comments
/*-----------------------------------------------------------------------------------*/
function lbb_die_handler($message, $title='', $args=array()){
    if(empty($_POST['errorcomment'])){
        $_POST['errorcomment'] = $message;
    }

    if(!session_id()){
        session_start();
    }

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
add_action('admin_init', 'lbb_imagelink_setup');

// New button wysiwyg
function lbb_button( $buttons ){
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
add_filter('mce_buttons_2', 'lbb_button');

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
add_filter('tiny_mce_before_init', 'lbb_mce_before_init');

function lbb_init_editor_styles(){
    add_editor_style();
}
add_action('after_setup_theme', 'lbb_init_editor_styles');

// Custom posts in the dashboard
function lbb_right_now_custom_post() {
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
add_action('dashboard_glance_items', 'lbb_right_now_custom_post');

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
    add_image_size( 'logo-ref', 160, 100, false );
    add_image_size( 'presta-thumb', 360, 360, true );
    add_image_size( 'blog-thumb', 460, 460, true );
}
add_action( 'after_setup_theme', 'lbb_thumbnail_sizes' );

// Some CSS in admin -> show which posts are 'cas client'
function lbb_icon_posts(){
  echo
  '<style>
    tr.type-post.category-cas-client td.column-title strong:before{
        content: "\f130";
        font-family: "dashicons";
        color: #b5006a;
        display: inline-block;
        margin: 0 5px 0 0;
        font-size: 21px;
        vertical-align: middle;
    }
    tr.type-post.category-cas-client td.column-title strong a, tr.type-post.category-cas-client td.categories a{
        color: #b5006a;
    }
    tr.type-post.category-cas-client td.column-title strong a:hover, tr.type-post.category-cas-client td.categories a:hover{
        color: #ff5fac;
    }
    .acf_postbox.no_box > h2{
        display: none;
    }
  </style>';
}
add_action('admin_head', 'lbb_icon_posts');

// Show parent-child relationship for categories in the wordpress admin
function lbb_taxonomy_relationship($args){
    $args['checked_ontop'] = false;
    return $args;
}
add_filter('wp_terms_checklist_args', 'lbb_taxonomy_relationship');


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
function lbb_css_attributes_filter($var){
     return is_array($var) ? array_intersect($var, array('current-menu-item', 'current_page_parent')) : '';
}
add_filter('nav_menu_css_class', 'lbb_css_attributes_filter');


/*-----------------------------------------------------------------------------------*/
/* Custom Post Types => Témoignages
/*-----------------------------------------------------------------------------------*/
function lbb_post_type(){
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
    register_post_type('rat', array(
        'label' => 'Rats',
        'singular_label' => 'Rat',
        'public' => true,
        'menu_icon' => 'dashicons-smiley',
        'supports' => array('title', 'editor', 'thumbnail')
    ));
}
add_action( 'init', 'lbb_post_type' );

function lbb_taxonomy(){
    register_taxonomy('prestation-categorie', array('prestation'), array(
        'hierarchical' => true,
        'label' => 'Catégories',
        'singular_label' => 'Catégorie',
        'show_admin_column' => true,
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
            <p><label for="<?php echo $this->get_field_id('first'); ?>">Phrase affichée par défaut (il est conseillé de mettre la plus longue pour un affichage optimal) :</label> <input class="widefat" id="<?php echo $this->get_field_id('first'); ?>" name="<?php echo $this->get_field_name('first'); ?>" value="<?php echo $first; ?>" /></p>
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
