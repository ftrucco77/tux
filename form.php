<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->SMTPDebug = 3;                                      // Enable verbose debug output
  $mail->isSMTP();                                           // Send using SMTP
  $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
  $mail->SMTPAuth   = false;                                  // Enable SMTP authentication
  $mail->Username   = '';                   // SMTP username
  $mail->Password   = '';                             // SMTP password
 // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port       = 25;                                   // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
  $mail->CharSet = 'UTF-8';

$mail->setFrom('ftrucco@tux-solutions.com', 'Tux');         // From email (remitente)
$mail->addAddress('ftrucco@tux-solutions.com',);            // To email (destinatario)

$mail->isHTML(true);                                         // Set email format to HTML


$message = '<html><body>';
$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
$message .= "<tr><td><strong>Nombre:</strong> </td><td>" . strip_tags($_POST['nombre']) . "</td></tr>";
$message .= "<tr><td><strong>Apellido:</strong> </td><td>" . strip_tags($_POST['apellido']) . "</td></tr>";
$message .= "<tr><td><strong>Telefono:</strong> </td><td>" . strip_tags($_POST['telefono']) . "</td></tr>";
$message .= "<tr><td><strong>Email:</strong> </td><td>" . strip_tags($_POST['email']) . "</td></tr>";
$message .= "<tr><td><strong>Compa&ntilde;ia:</strong> </td><td>" . strip_tags($_POST['empresa']) . "</td></tr>";
$message .= "<tr><td><strong>Pais:</strong> </td><td>" . strip_tags($_POST['pais']) . "</td></tr>";
$message .= "<tr><td><strong>Nivel laboral:</strong> </td><td>" . strip_tags($_POST['cargo']) . "</td></tr>";
$message .= "<tr><td><strong>Funcion laboral:</strong> </td><td>" . strip_tags($_POST['funcion']) . "</td></tr>";
$message .= "<tr><td><strong>Comentarios:</strong> </td><td>" . strip_tags($_POST['comentarios']) . "</td></tr>";
if($_POST['acepto']==1){
$message .= "<tr><td><strong>Consentimiento:</strong> </td><td>Si</td></tr>";
}else{
$message .= "<tr><td><strong>Consentimiento:</strong> </td><td>No</td></tr>";
}

$message .= "</table>";
$message .= "</body></html>";



$mail->Subject = 'Mensaje desde Fortinet Tux';
$mail->Body    = $message;

if(!$mail->send()) {
    echo json_encode(array('estado'=>-1));
} else {
    echo json_encode(array('estado'=>1));
}