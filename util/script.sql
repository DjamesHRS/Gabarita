create database gabarita;
use gabarita;

CREATE TABLE IF NOT EXISTS aluno (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(45) NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  data_de_nascimento DATE NOT NULL,
  data_de_cadastro DATETIME NOT NULL,
  status ENUM('ativo', 'inativo') NOT NULL
);

CREATE TABLE IF NOT EXISTS professor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(45) NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  minibiografia TEXT NOT NULL,
  data_de_cadastro DATETIME NOT NULL,
  status ENUM('ativo', 'inativo') NOT NULL
);

CREATE TABLE IF NOT EXISTS administrador (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(45) NOT NULL,
  nivel_de_acesso ENUM('total', 'parcial', 'leitura') NOT NULL,
  data_de_cadastro DATETIME NOT NULL,
  status ENUM('ativo', 'inativo') NOT NULL
);

CREATE TABLE IF NOT EXISTS disciplina (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS conteudo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  disciplina_id INT NOT NULL,
  FOREIGN KEY (disciplina_id) REFERENCES disciplina(id)
);

CREATE TABLE IF NOT EXISTS questao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  enunciado TEXT NOT NULL,
  tipo ENUM('multipla_escolha', 'dissertativa', 'verdadeiro_falso') NOT NULL,
  nivel_de_dificuldade ENUM('facil', 'medio', 'dificil', 'expert') NOT NULL,
  gabarito TEXT NOT NULL,
  alternativas JSON NOT NULL,
  professor_id INT NOT NULL,
  FOREIGN KEY (professor_id) REFERENCES professor(id)
);

CREATE TABLE IF NOT EXISTS modelo_atividade (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo ENUM('simulado', 'redacao') NOT NULL,
  data_de_criacao DATETIME NOT NULL,
  status ENUM("nao_inciada", "aberta", "encerrada") NOT NULL,
  professor_id INT NOT NULL,
  FOREIGN KEY (professor_id) REFERENCES professor(id)
);

CREATE TABLE IF NOT EXISTS modelo_simulado (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  modelo_atividade_id INT NOT NULL,
  FOREIGN KEY (modelo_atividade_id) REFERENCES modelo_atividade(id)
);

CREATE TABLE IF NOT EXISTS modelo_redacao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tema TEXT NOT NULL,
  tipo VARCHAR(255) NOT NULL,
  modelo_atividade_id INT NOT NULL,
  FOREIGN KEY (modelo_atividade_id) REFERENCES modelo_atividade(id)
);

CREATE TABLE IF NOT EXISTS atividade_aplicada (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo_da_aplicacao VARCHAR(255) NOT NULL,
  data_realizacao DATETIME NOT NULL,
  nota DECIMAL(5,2) NOT NULL,
  status ENUM('agendado', 'ativo', 'encerrado') NOT NULL,
  modelo_atividade_id INT NOT NULL,
  FOREIGN KEY (modelo_atividade_id) REFERENCES modelo_atividade(id)
);

CREATE TABLE IF NOT EXISTS correcao_professor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nota_final DECIMAL(5,2) NOT NULL,
  comentarios TEXT NOT NULL,
  data_da_correcao DATETIME NOT NULL,
  atividade_aplicada_id INT NOT NULL UNIQUE,
  FOREIGN KEY (atividade_aplicada_id) REFERENCES atividade_aplicada(id)
);

CREATE TABLE IF NOT EXISTS correcao_ia (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nota_gerada DECIMAL(5,2) NOT NULL,
  analise JSON NOT NULL,
  data_da_correcao DATETIME NOT NULL,
  atividade_aplicada_id INT NOT NULL UNIQUE,
  FOREIGN KEY (atividade_aplicada_id) REFERENCES atividade_aplicada(id)
);

CREATE TABLE IF NOT EXISTS conteudo_da_questao (
  questao_id INT NOT NULL,
  conteudo_id INT NOT NULL,
  PRIMARY KEY (questao_id, conteudo_id),
  FOREIGN KEY (questao_id) REFERENCES questao(id),
  FOREIGN KEY (conteudo_id) REFERENCES conteudo(id)
);

CREATE TABLE IF NOT EXISTS questao_do_simulado (
  questao_id INT,
  modelo_simulado_id INT,
  PRIMARY KEY (questao_id, modelo_simulado_id),
  FOREIGN KEY (questao_id) REFERENCES questao(id),
  FOREIGN KEY (modelo_simulado_id) REFERENCES modelo_simulado(id)
);

CREATE TABLE IF NOT EXISTS atividade_do_aluno (
  atividade_aplicada_id INT,
  aluno_id INT,
  texto_redacao TEXT NULL,
  PRIMARY KEY (atividade_aplicada_id, aluno_id),
  FOREIGN KEY (atividade_aplicada_id) REFERENCES atividade_aplicada(id),
  FOREIGN KEY (aluno_id) REFERENCES aluno(id)
);