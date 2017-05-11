<?php
require_once 'DB_Con.php';
if($_SERVER["REQUEST_METHOD"]=="POST"){
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM Users WHERE (username = '$username' AND password = '$password')";
  // echo "$sql";
  $row = $con->query($sql)->fetch_all(MYSQLI_ASSOC)[0];
  if($row)
  {
    session_start();
    $_SESSION['user_id'] = $row['uid'];
    echo $row['username'];
  }
  else {
    http_response_code(401);
  }
}
elseif ($_SERVER["REQUEST_METHOD"]=="GET") {
  session_start();
  $_SESSION['user_id']=NULL;
  session_destroy();
}

mysqli_close($con);
?>
