<?php
if(isset($_POST['img'])){
  $log = fopen('log.txt', 'a');
  fwrite($log, date(DATE_ATOM) . ' ' . $_SERVER['REMOTE_ADDR'] . ' - ' . $_SERVER['HTTP_USER_AGENT'] . "\n");
  fclose($log);
  header('Content-Type: image/jpeg');
  header('Content-Disposition: attachment; filename="schedule-by-tscp.jpg"');
  echo base64_decode(str_replace('data:image/jpeg;base64,','',$_POST['img']));
} else {
  echo('<pエラー</p>');
}
?>
