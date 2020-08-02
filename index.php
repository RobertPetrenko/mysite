<?php
require("vendor/autoload.php");

use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/.env.local');

$serverName = $_ENV['DB_HOST'];
$serverPort = $_ENV['DB_PORT'];
$userName = $_ENV['DB_USER_NAME'];
$password = $_ENV['DB_USER_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

$langCode = "fr";
$errorm = " ";

if(isset($_GET['language']))
{
    $language = $_GET['language'];
}

try {
        $pdo = new PDO("mysql:host=$serverName;port=$serverPort;dbname=$dbname;charset=UTF8", $userName, $password);
        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        
        if(isset($language) && $language == "en"){
            $sth = $pdo->prepare("SELECT placeholder, text_eng AS text FROM languages");

            $langCode = "en";
        }
        else{
            $sth = $pdo->prepare("SELECT placeholder, text_fr AS text FROM languages");
        }

        $sth->execute();
        $results = $sth->fetchAll(PDO::FETCH_ASSOC);

        $translations = [];

        foreach ($results as $result) {
            $translations[$result["placeholder"]] = $result["text"];
        }

    }
catch(PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
    $name = $_REQUEST['name']; 
    $email = $_REQUEST['email'];
    $message = $_REQUEST['message'];

    $mail = new \SendGrid\Mail\Mail(); 
    $mail->setFrom($email, $name);
    $mail->setSubject("Email from my site");
    $mail->addTo("robertpetrenko9@gmail.com");
    $mail->addContent("text/plain", $message);

    $sendgrid = new \SendGrid($_ENV['SENDGRID_KEY']);
    try {
        $response = $sendgrid->send($mail);
    } catch (Exception $e) {
        echo 'Caught exception: '. $e->getMessage() ."\n";
    } 
}

include('index.phtml');
?>