<?php
class Conexao {
    public static $conn;

    // Método para conectar ao banco de dados
    static function conectar() {
        try {
            $endereco = "mysql:host=localhost;dbname=gabarita;port=3306";
            $usuariobd = "root";
            $senhabd = "";
            self::$conn = new PDO($endereco, $usuariobd, $senhabd);
            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erro na conexão com o banco de dados: " . $e->getMessage());
        }
    }    

    // Método para executar queries sem parâmetros
    static function executar($query) {
        if (self::$conn == null)
            self::conectar();
        $stmt = self::$conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Método para executar queries com parâmetros (prepared statements)
    static function executarComParametros($query, $parametros = array()) {
        if (self::$conn == null)
            self::conectar();
        $stmt = self::$conn->prepare($query);
        foreach ($parametros as $chave => $valor) {
            $stmt->bindValue($chave, $valor);  // Vincula os parâmetros
        }
        $stmt->execute();
        return $stmt;
    }
}
?>
