<?php
error_reporting(E_ALL);
if(!isset($_POST['disable_ob']))
  ob_start('error_handler');
if(isset($_POST['compile']))
{
  $php_data = base64_decode($_POST['compile']);
  $php_data = preg_replace('#^<\?php#i', "", trim($php_data));
  file_put_contents("php_inc.txt", "<?php\n".$php_data);
  require_once ("php_inc.txt");
}

function error_handler($output) {
  $errno = array(
    "1" => "E_ERROR",
    "2" => "E_WARNING",
    "4" => "E_PARSE",
    "8" => "E_NOTICE",
    "16" => "E_CORE_ERROR",
    "32" => "E_CORE_WARNING",
    "64" => "E_COMPILE_ERROR",
    "128" => "E_COMPILE_WARNING",
    "256" => "E_USER_ERROR",
    "512" => "E_USER_WARNING",
    "1024" => "E_USER_NOTICE",
    "2048" => "E_STRICT",
    "4096" => "E_RECOVERABLE_ERROR",
    "8192" => "E_DEPRECATED",
    "16384" => "E_USER_DEPRECATED",
    "32767" => "E_ALL"
  );
  if(error_get_last())
  {
    $error = error_get_last();
    $output = "";
    foreach($error as $info => $string) {
      if ($info == "file")
        continue;
      if ($info == "type")
        $output.= "{$info}: {$string} - {$errno[$string]}\n";
      else
        $output.= "{$info}: {$string}\n";
    }
  }
  return $output;
}
if(!isset($_POST['disable_ob']))
  ob_get_flush();
?>