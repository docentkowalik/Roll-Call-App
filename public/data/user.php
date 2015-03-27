<?php 
	$user=json_decode(file_get_contents('php://input'));  //get user from 
	if($user->mail=='a@a.a' && $user->pass=='1') 
		print 'succes';
	else 
		print 'error';
?>