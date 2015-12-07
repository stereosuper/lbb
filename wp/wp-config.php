<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Le script de création wp-config.php utilise ce fichier lors de l'installation.
 * Vous n'avez pas à utiliser l'interface web, vous pouvez directement
 * renommer ce fichier en "wp-config.php" et remplir les variables à la main.
 * 
 * Ce fichier contient les configurations suivantes :
 * 
 * * réglages MySQL ;
 * * clefs secrètes ;
 * * préfixe de tables de la base de données ;
 * * ABSPATH.
 * 
 * @link https://codex.wordpress.org/Editing_wp-config.php 
 * 
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'labelleboite');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'admin42');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', 'P@ssw0rd44_cli024');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données. 
  * N'y touchez que si vous savez ce que vous faites. 
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant 
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '/a[`C(<gpMG*DhO{X^>E_!2;J 9-4-z1-mxl:qri3Y]:5B)oe$S]Og*_gP6`x;yf');
define('SECURE_AUTH_KEY',  'eWr.@JfC<:uYub@y^rmry:bFH7b4ZA`3-{0Vx5_qXe$^gOc=6pc;hdwP~ygwY%+H');
define('LOGGED_IN_KEY',    '4L{{d!e0^(E=vH8{X`*5#cgLBm8+}TtU;iI>)NVYt[IPudD^#jIOlO[M1UyQaR/:');
define('NONCE_KEY',        'ZF]H&I;?vANPD^td[1S/cEK4+9g+md^!J4fo /nvy0~2E|6qSkoUPYkAurmGv|f5');
define('AUTH_SALT',        'Vl*Uj:%HTN,_D2a)!oCn@NO<50A]QGS/RyS1qu,`7|T/ST*r8hFHV*BnG1a_>T(L');
define('SECURE_AUTH_SALT', '^z >T>4n+kkE4|Vy?]6T7>7 V7-Pn3]|{[=I)PW607.qXSPVFib?c8?YC)aQK{Gz');
define('LOGGED_IN_SALT',   '$r8W7rot=lKI3[|,>;>/0:V}#VFlK!Kl}f7Xw-%h<nPX FT>xN;=GN@g>frF^2Q7');
define('NONCE_SALT',       '8jq;;<?=gNIg*]acB;[7E0#z5:4IUgcpqsghle:sSAyyoyBPqojU#_(G%L$xR^M8');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique. 
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'lbb_';

/** 
 * Pour les développeurs : le mode déboguage de WordPress.
 * 
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant votre essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de 
 * développement.
 * 
 * Pour obtenir plus d'information sur les constantes 
 * qui peuvent être utilisée pour le déboguage, consultez le Codex.
 * 
 * @link https://codex.wordpress.org/Debugging_in_WordPress 
 */ 
define('WP_DEBUG', true);

define('WP_POST_REVISIONS', 5);
define('EMPTY_TRASH_DAYS', 10);
define('WP_AUTO_UPDATE_CORE', true);

// BEGIN iThemes Security - Do not modify or remove this line
// iThemes Security Config Details: 2
define( 'DISALLOW_FILE_EDIT', true ); // Disable File Editor - Security > Settings > WordPress Tweaks > File Editor
// END iThemes Security - Do not modify or remove this line

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');