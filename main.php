<?php
$db_host = "localhost";
$db_user = "test"; // Логин БД
$db_password = "123456"; // Пароль БД
$db_base = 'test'; // Имя БД
$db_table = "sms"; // Имя Таблицы БД


if($_POST['text'] == "") {
    $res = "<p style='color: red'>Введите сообщение!</p>";
}
else {
    $text=$_POST['text'];
    $count=$_POST['count'];
    // Подключение к базе данных
    $mysqli = new mysqli($db_host, $db_user, $db_password, $db_base);
    if ($mysqli->connect_error) {
        $res ="<p style='color: red'>Не удалось подключиться к БД</p>";
    }
    else {
        $result = $mysqli->query("INSERT INTO " . $db_table . " (text, count) VALUES ('$text','$count')");
        if ($result == true) {
            $res = "<p style='color: green'>Информация занесена в базу данных</p>";
        } else {
            $res = "<p style='color: red'>Информация не занесена в базу данных</p>";
        }
    }
}

echo json_encode(array('result' => $res));
?>