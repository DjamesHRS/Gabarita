<?php
    include_once('../util/conexao.php')

    class AlunoDao{
        function cadastrar($aluno){
            $parametros = Array(
                ':nome' => $aluno->nome,
                ':cpf' => $aluno->cpf,
                ':numero_de_matricula' => $aluno->numero_de_matricula,
                ':email' => $aluno->email,
                ':senha' => $aluno->senha,
                ':data_de_nascimento' => $aluno->data_de_nascimento,
                ':sexo' => $aluno->sexo,
                ':telefone' => $aluno->telefone
            );
            $query = 'insert into aluno (nome, cpf, numero_de_matricula, email, senha, data_de_nascimento, sexo, telefone)
            values (:nome, :cpf, :numero_de_matricula, :email, :senha, :data_de_nascimento, :sexo, :telefone)';
            Conexao::executarComparametros($query, $parametros);
        }
    }
?>