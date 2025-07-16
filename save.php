<?php
$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
  $log = "[" . date("Y-m-d H:i:s") . "]\n";
  foreach ($data as $key => $value) {
    $log .= ucfirst($key) . ": " . $value . "\n";
  }
  $log .= "--------------------------\n";
  file_put_contents("location-log.txt", $log, FILE_APPEND);
}
?>
