<?php
require_once 'DB_Con.php';
session_start();

function getUserStocks(){
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "SELECT * FROM `Users-Stocks` WHERE (uid = '$uid')";
  $stocks = $con->query($sql)->fetch_all(MYSQLI_ASSOC);
  foreach ($stocks as $stock) {
    $result[] = getMyStock($stock['id']);
  }
  return $result;
}

function getAvailableStocks(){
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "SELECT * FROM `Stocks` WHERE `id` NOT IN (SELECT `id` FROM `Users-Stocks` WHERE (uid = '$uid'))";
  $stocks = $con->query($sql)->fetch_all(MYSQLI_ASSOC);
  foreach ($stocks as $stock) {
    $result[] = getStock($stock['id']);
  }
  return $result;
}

function addUserStock($id){
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "INSERT INTO `Users-Stocks` VALUES ($id,$uid,DEFAULT)";
  $result = $con->query($sql);
  return $result;
}

function addUserStocks($arr){
  foreach ($arr as $id) {
    addUserStock($id);
  }
}

function removeUserStock($id){
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "DELETE FROM `Users-Stocks` WHERE id='$id' AND uid='$uid'";
  $result = $con->query($sql);
  return $result;
}

function getStock($id)
{
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "SELECT * FROM `Stocks` WHERE (id = '$id')";
  $result = $con->query($sql)->fetch_all(MYSQLI_ASSOC)[0];
  return $result;
}

function getMyStock($id){
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "SELECT * FROM `Stocks` WHERE (id = '$id')";
  $result = $con->query($sql)->fetch_all(MYSQLI_ASSOC)[0];
  $result['note'] = getNote($id);
  return $result;
}

function getNote($id)
{
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "SELECT `notes` FROM `Users-Stocks` WHERE (uid = '$uid' AND id='$id' )";
  $note = $con->query($sql)->fetch_all(MYSQLI_ASSOC)[0];
  return $note['notes'];
}

function saveNote($id,$note){
  global $con;
  $uid = $_SESSION['user_id'];
  $sql = "UPDATE `Users-Stocks` SET`notes` = '$note' WHERE id='$id' AND uid='$uid'";
  $result = $con->query($sql);
  return $result;
}

switch (strtoupper($_SERVER["REQUEST_METHOD"])) {
  case 'GET':
  if (isset($_GET['id'])) {
    echo json_encode(getMyStock($_GET['id']));
  }
  elseif (isset($_GET['available'])) {
    echo json_encode(getAvailableStocks());
  }
  else {
    echo json_encode(getUserStocks());
  }
  break;

  case 'POST':

  if (isset($_POST['note'])) {
    saveNote($_POST['id'],$_POST['note']);
  }elseif (isset($_POST['action'])) {
    removeUserStock($_POST['id']);
  }else {
    $arr = json_decode(file_get_contents('php://input'));
    addUserStocks($arr);
  }
  break;
}
// echo "$sql";
// $jsonstring = json_encode($_POST);
// echo $jsonstring;
mysqli_close($con);

?>
