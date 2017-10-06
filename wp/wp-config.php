<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'lbb_dev');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', '');

/** Adresse de l’hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|{a5IEZXHZ6jP_S!0avU2fL_^&V90-:pJ6yDQ4G5A`;~tp=|QjhrzTxHFxWJf9{*');
define('SECURE_AUTH_KEY',  'Xb8W.hD4sB)vf;P7h|wQ2j/s|/OWeyWK;<Bic`-wd[ypcvyg{RAE]1A6UW^Z_|DL');
define('LOGGED_IN_KEY',    '[&BUJ+B9`Iz7%Ad4]W&H Z2qyH)R<KzR]kIQu326~4E5|XClYf_#u;k[C%}b_`]M');
define('NONCE_KEY',        '{ab(`5~F>)zn&lj#<dy&*p+|d+r*Y^TxyuZRz|QAGzYLXdcBlxMegu;#-_X2B]>W');
define('AUTH_SALT',        'y+fnm|Kd$lo{~34v&>Bf&s1mp %.`elW/RQ^|V:4t&6TshZs?1gY[q!`{OP U>8f');
define('SECURE_AUTH_SALT', 'Nl_q.z{23:izQ>bHQ3-<B&0nB|$ZmvI(|U4G.:Lftfb~8nG&~foA?w7Wk0UNj1Ef');
define('LOGGED_IN_SALT',   'iPm%$s5h`=hO.lO`0<pOb=V6HM!<Z}jWYpc{45C=sQMP8dE0e#Cfd[tzqZ>a: VL');
define('NONCE_SALT',       '@Tt;q~c~9^e&7v(BbMM&8>&6Pnwk#NXx%HR*~$G(RL^])pRImh^CCDhDD4#H/qJg');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix  = 'lbb_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d'information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* C’est tout, ne touchez pas à ce qui suit ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');