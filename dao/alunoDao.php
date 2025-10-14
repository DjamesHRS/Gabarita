<?php
    include_once('../util/conexao.php');

    class AlunoDao {
        function cadastrar($aluno) {
            try {
                $parametros = [
                    ':nome' => $aluno->nome,
                    ':email' => $aluno->email,
                    ':senha' => $aluno->senha,
                    ':cpf' => $aluno->cpf,
                    ':data_de_nascimento' => $aluno->data_de_nascimento,
                    ':status' => $aluno->status,
                    ':data_de_cadastro' => $aluno->data_de_cadastro,
                ];                
                $query = 'INSERT INTO aluno (nome, email, senha, cpf, data_de_nascimento,  data_de_cadastro, status)
                          VALUES (:nome, :email, :senha, :cpf, :data_de_nascimento, :data_de_cadastro, :status)';
                return Conexao::executarComParametros($query, $parametros);
            } catch (Exception $e) {
                // Aqui você pode logar o erro, por exemplo
                return false;
            }
        }
    }
    
?>