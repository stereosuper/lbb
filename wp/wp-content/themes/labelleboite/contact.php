<?php
/*
Template Name: Contact
*/

$error = false;
$success = false;
$erreurPrenom = false;
$erreurNom = false;
$erreurMail = false;
$erreurTel = false;
$erreurSujet = false;
$erreurMsg = false;
$erreurEnvoi = false;

$nom = isset($_POST['nom']) ? strip_tags(stripslashes($_POST['nom'])) : '';
$prenom = isset($_POST['prenom']) ? strip_tags(stripslashes($_POST['prenom'])) : '';
$mail = isset($_POST['email']) ? strip_tags(stripslashes($_POST['email'])) : '';
$tel = isset($_POST['tel']) ? strip_tags($_POST['tel']) : '';
$bonus = isset($_POST['bonus']) ? strip_tags(stripslashes($_POST['bonus'])) : '';
$sujet = isset($_POST['sujet']) ? strip_tags(stripslashes($_POST['sujet'])) : '';
$msg = isset($_POST['message']) ? strip_tags(stripslashes($_POST['message'])) : '';

$devis = isset($_GET['devis']) ? strip_tags(stripslashes($_GET['devis'])) : false;

//$mailto = get_field('email');
$mailto = 'shwarp@live.fr';


if(isset($_POST['submit'])){
	
	if(empty($nom)){
		$erreurNom = 'Le champ Nom est obligatoire';
		$error = true;
	}
 	if(empty($prenom)){
 		$erreurPrenom = 'Le champ Prénom est obligatoire';
 		$error = true;
 	}
 	if(empty($mail)){
 		$erreurMail = 'Le champ Email est obligatoire';
 		$error = true; 
 	}else{
 		if(!preg_match('/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i', $mail)){
 			$erreurMail = "L'adresse email est invalide";
 			$error = true;
 		}
 	}
 	if(!empty($tel)){
 		if(!(strlen($tel) < 20 && strlen($tel) > 9 && preg_match("/^\+?[^.\-][0-9\.\- ]+$/", $tel))){
 			$erreurTel = 'Le numéro de téléphone est incorrect';
 			$error = true;
 		}
 	}
 	if(empty($sujet)){
 		$erreurSujet = 'Le champ Sujet est obligatoire';
 		$error = true;
 	}
 	if(empty($msg)){
 		$erreurMsg = 'Le champ Message est obligatoire';
 		$error = true;
 	}

 	if(!$error){
        $nom = sprintf('%s %s', $prenom, $nom);
 		$subject = 'Nouveau message provenant de labelleboite.com';
 		$headers = 'From: "' . $nom . '" <' . $mail . '>' . "\r\n" .
 				   'Reply-To: ' . $mail . "\r\n";

 		$content = 'De: ' . $nom . "\r\n" .
 				   'Adresse e-mail: ' . $mail . "\r\n";
 		if(!empty($tel)){
 			$content .= 'Numéro de téléphone: ' . $tel . "\r\n";
 		}
 		if(!empty($sujet)){
 			$content .= 'Sujet: ' . $sujet . "\r\n";
 		}
 		if(!empty($bonus)){
 			$content .= 'Question bonus: ' . $bonus . "\r\n";
 		}
 		$content .= "\r\n" . 'Message: ' . $msg;

        $sent = wp_mail($mailto, $subject, $content, $headers);

 		if($sent){
 			$success = true;
 		}else{ 
 			$error = true;
 			$erreurEnvoi = 'Nous sommes désolés, une erreur est survenue. Veuillez réessayer!';
 		}
 	}
}

get_header(); ?>

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
				<?php the_post_thumbnail(); ?>
				<div class='fd'></div>
			</header>

			<section class='container page-content' id='page-content'>

				<?php the_content(); ?>

				<aside class='sidebar-contact'>
					<h2><?php the_field('titreContact'); ?></h2>
					<?php if(get_field('adresse')){ ?>
						<p>
							<?php if(get_field('titrAdresse')){ ?><b><?php the_field('titrAdresse'); ?></b><?php } ?>
							<?php the_field('adresse'); ?>
						</p>
					<?php } ?>
					<?php if(get_field('tel')){ ?>
						<p>
							<?php if(get_field('titreTel')){ ?><b><?php the_field('titreTel'); ?></b><?php } ?>
							<a href='tel:<?php the_field('tel'); ?>' title='Appeler la Belle Boîte'><?php the_field('tel'); ?></a>
						</p>
					<?php } ?>
					<?php if(get_field('email')){ ?>
						<p>
							<?php if(get_field('titreEmail')){ ?><b><?php the_field('titreEmail'); ?></b><?php } ?>
							<a href='mailto:<?php the_field('email'); ?>' title='Envoyer un email à la Belle Boîte'>
								<?php get_field('emailAffiche') ? the_field('emailAffiche') : the_field('email'); ?>
							</a>
						</p>
					<?php } ?>
				</aside>

				<form action='<?php the_permalink(); ?>#contact' method='post' class='contactform <?php if($error) echo "formerror"; ?>' id='contact'>
					<?php if(!$success){ ?>
						<?php if($error){ ?>
							<p class='error'>Votre message n'a pas pu être envoyé.<?php if($erreurEnvoi) echo '<br>'.$erreurEnvoi; ?></p>
						<?php } ?>
						<fieldset <?php if($erreurNom) echo "class='error'"; ?>>
							<label for='nom' class='required'><?php the_field('labelNom'); ?></label>
							<input type='text' name='nom' id='nom' value='<?php echo $nom; ?>' required <?php if(get_field('placeholderNom')){ echo "placeholder='".get_field('placeholderNom')."'"; } ?>>
							<span><?php echo $erreurNom; ?></span>
						</fieldset>
						<fieldset <?php if($erreurPrenom) echo "class='error'"; ?>>
							<label for='prenom' class='required'><?php the_field('labelPrenom'); ?></label>
							<input type='text' name='prenom' id='prenom' value='<?php echo $prenom; ?>' required <?php if(get_field('placeholderPrenom')){ echo "placeholder='".get_field('placeholderPrenom')."'"; } ?>>
							<span><?php echo $erreurPrenom; ?></span>
						</fieldset>
						<fieldset <?php if($erreurMail) echo "class='error'"; ?>>
							<label for='email' class='required'><?php the_field('labelEmail'); ?></label>
							<input type='email' name='email' id='email' value='<?php echo $mail; ?>' required <?php if(get_field('placeholderEmail')){ echo "placeholder='".get_field('placeholderEmail')."'"; } ?> pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?">
							<span><?php echo $erreurMail; ?></span>
						</fieldset>
						<?php if(get_field('labelTel')){ ?>
							<fieldset <?php if($erreurTel) echo "class='error'"; ?>>
								<label for='tel'><?php the_field('labelTel'); ?></label>
								<input type='tel' name='tel' id='tel' value='<?php echo $tel; ?>' <?php if(get_field('placeholderTel')){ echo "placeholder='".get_field('placeholderTel')."'"; } ?> pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$">
								<span><?php echo $erreurTel; ?></span>
							</fieldset>
						<?php } if(get_field('labelBonus')){ ?>
							<fieldset>
								<label for='bonus' class='no-margin'><?php the_field('labelBonus'); ?></label>
								<input type='text' name='bonus' id='bonus' value='<?php echo $bonus; ?>' <?php if(get_field('placeholderBonus')){ echo "placeholder='".get_field('placeholderBonus')."'"; } ?>>
								<span></span>
							</fieldset>
						<?php } if(get_field('labelSujet') && get_field('sujets')){ ?>
							<fieldset <?php if($erreurSujet) echo "class='error'"; ?>>
								<label for='sujet' class='required'><?php the_field('labelSujet'); ?></label>
								<select name='sujet' id='sujet' required>
									<?php
									$output = empty($sujet) ? '<option disabled selected>Sélectionnez votre sujet</option>' : '<option disabled>Sélectionnez votre sujet</option>';
									$sujetsSelect = preg_split('/,/', get_field('sujets'));
									foreach($sujetsSelect as $sujetSelect){
										$output.= $sujet === $sujetSelect ? "<option value='".$sujetSelect."' selected>".$sujetSelect."</option>" : "<option value='".$sujetSelect."'>".$sujetSelect."</option>";
									}
									echo $output;
									?>
								</select>
								<span><?php echo $erreurSujet; ?></span>
							</fieldset>
						<?php } ?>
						<fieldset <?php if($erreurMsg) echo "class='error'"; ?>>
							<label for='message' class='required'><?php the_field('labelMessage'); ?></label>
							<?php $placeholderMsg = $devis ? 'Je suis intéressé(e) par la prestation "'.get_the_title($devis).'"' : get_field('placeholderMessage') ?>
							<textarea name='message' id='message' required <?php if($devis || ($error && !$erreurMsg)) echo "class='on'"; ?>><?php echo $error ? $msg : $placeholderMsg; ?></textarea>
							<span><?php echo $erreurMsg; ?></span>
						</fieldset>
						<button type='submit' name='submit' class='btn btn-right'><?php the_field('btn'); ?></button>
					<?php }else{ ?>
						<p class='success'><?php the_field('succes'); ?></p>
					<?php } ?>
				</form>

			</section>
		
		<?php else : ?>
					
			<?php get_template_part( 'includes/404' ); ?>

		<?php endif; ?>

	</main>

<?php get_footer(); ?>