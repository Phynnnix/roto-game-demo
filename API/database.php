<?php
$DATABASE_TESTS_ARE_ALLOWED = TRUE;

function new_connection()
{
    $ret = (object)[];
    $ret->err = FALSE;
    $servername = "localhost";
    $username = "webapp";
    $password = "bf7e7Hgdo8eBbkdz-Gkdhk8z78+BKJGSJHutue7988tzoebks6209p3AA";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=roto", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        $ret->conn = $conn;
    } catch(PDOException $e) {
        $ret->message = $e->getMessage();
        $ret->err = TRUE;
    }

    return $ret;
}

function property_brackets($properties, $nobrack = FALSE){
    $str = "";
    if(!$nobrack) $str = "(";
    $first = TRUE;
    foreach ($properties as $key => $value) {
        if($first){
            $first = FALSE;
        }else{
            $str.= ", ";
        }
        $str.= $value;
    }
    if(!$nobrack) $str.=")";
    return $str;
}

function value_brackets($properties, $thing){
    $str = "(";
    $first = TRUE;
    foreach ($properties as $key => $value) {
        if($first){
            $first = FALSE;
        }else{
            $str.= ", ";
        }
        $thiva = ((array)$thing)[$value];
        if(is_string($thiva))
            $str.="'";
        $str.= $thiva;
        if(is_string($thiva))
            $str.="'";
    }
    $str.=")";
    return $str;
}

function update_string($properties){
    $str = "";
    $first = TRUE;
    foreach ($properties as $key => $value) {
        if($first){
            $first = FALSE;
        }else{
            $str.= ", ";
        }
        $str.= $value."= ins.".$value;
    }
    return $str;
}

function write_list_to_sql($table, $gameid, $list, $properties){
    $properties[] = "game_id";
    $prop_brack = property_brackets($properties);
    $val_list = "";
    $first_val = TRUE;
    foreach($list as $key => $thing){
        $thing->game_id = $gameid;
        if($first_val){
            $first_val = FALSE;
        }else{
            $val_list.= ", ";
        }
        $val_list .= value_brackets($properties, $thing);
    }
    $upd_str = update_string($properties);
    $sql = "INSERT INTO $table $prop_brack VALUES $val_list AS ins ON DUPLICATE KEY UPDATE $upd_str WHERE id = ins.id AND game_id = ins.game_id";
    return $sql;
}

function write_to_sql($table, $gameid, $thing, $properties){
    $thing->game_id = $gameid;
    $properties[] = "game_id";
    $prop_brack = property_brackets($properties);
    $val_brack = value_brackets($properties, $thing);
    $upd_str = update_string($properties);
    $sql = "INSERT INTO $table $prop_brack VALUES $val_brack AS ins ON DUPLICATE KEY UPDATE $upd_str WHERE id = ins.id AND game_id = ins.gameId";
    return $sql;
}

function read_all_sql($table, $gameid, $properties){
    $properties[] = "game_id";
    $prop_brack = property_brackets($properties);
    $sql = "SELECT $prop_brack FROM $table WHERE game_id = $gameid";
    return $sql;
}

function read_all_updated_sql($table, $gameid, $properties, $playerid){
    $properties[] = "game_id";
    $prop_brack = property_brackets($properties, TRUE);
    $sql = "SELECT $prop_brack FROM ".
                "$table AS T ".
                "INNER JOIN ".
                "(SELECT changed_id, player_id FROM ".
                    "changelog ".
                    "INNER JOIN ".
                    "changelog_not_pulled ".
                    "ON changelog.id = changelog_not_pulled.changelog_id ".
                "WHERE changed_table = '$table') AS LOGGED ".
                "ON T.id = LOGGED.changed_id ".
            "WHERE game_id = $gameid AND LOGGED.player_id = $playerid";
    return $sql;
}

function read_by_id_sql($table, $gameid, $id, $properties){
    
}


if(isset($_GET["test"]) && $DATABASE_TESTS_ARE_ALLOWED){
    if($_GET["test"] == "connect"){
        echo "...testing connection to database...\n";
        var_dump(new_connection());
        $prop = ["id", "type"];
        $json = '{"id": 1453625, "type": "1"}';
        $json_list = '[{"id": 12345, "type": "1"}, {"id": 23456, "type": "3"}, {"id": 34567, "type": "5"}]';
        $thg = json_decode($json);
        $thg_list = json_decode($json_list);
        
        var_dump($thg);
        var_dump(property_brackets($prop));
        var_dump(value_brackets($prop, $thg));
        echo "...done...\n";
    }
    if($_GET["test"] == "sql"){
        echo "...testing sql generation...";
        echo "\n<br/>\n";
        $prop = ["id", "type", "gold"];
        $json = '{"id": 1453625, "type": 1, "gold": 12}';
        $json_list = '[{"id": 12345, "type": 1, "gold": 1}, {"id": 23456, "type": 3, "gold": 10}, {"id": 34567, "type": 5, "gold": 5}]';
        $thg = json_decode($json);
        $thg_list = json_decode($json_list);
        var_dump($thg);
        echo "\n<br/>\n";
        var_dump(property_brackets($prop));
        echo "\n<br/>\n";
        var_dump(value_brackets($prop, $thg));
        echo "\n<br/>\n";
        var_dump(update_string($prop));
        echo "\n<br/>\n";
        var_dump(write_to_sql('tiles', 1, $thg, $prop));
        echo "\n<br/>\n";
        var_dump(write_list_to_sql('tiles', 1, $thg_list, $prop));
        echo "\n<br/>\n";
        var_dump(read_all_sql('tiles', 1, $prop));
        echo "\n<br/>\n";
        var_dump(read_all_updated_sql('tiles', 1, $prop, 1));
        echo "\n<br/>\n";
        echo "...done...\n";
    }
}
?>