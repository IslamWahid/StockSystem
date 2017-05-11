<?php
$con = mysqli_connect("localhost", "Username", "Password", "fak5");
//Check connection
if($con->connect_error){
 die ("Connection failed: " . $con->connect_error);
}
 ?>
