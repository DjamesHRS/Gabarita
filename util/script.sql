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

-- Inserir dados na tabela disciplina
INSERT INTO disciplina (nome, descricao) VALUES
('Matemática', 'Disciplina de matemática básica'),
('Português', 'Estudo da língua portuguesa'),
('História', 'História mundial e do Brasil'),
('Geografia', 'Estudo do espaço geográfico'),
('Física', 'Fundamentos da física'),
('Química', 'Estudo da química básica'),
('Biologia', 'Ciências biológicas'),
('Inglês', 'Língua inglesa básica'),
('Literatura', 'Estudo de obras literárias'),
('Educação Física', 'Atividades físicas e esportes');

-- Inserir dados na tabela professor
INSERT INTO professor (nome, email, senha, cpf, minibiografia, data_de_cadastro, status) VALUES
('Carlos Silva', 'carlos.silva@email.com', 'senha123', '12345678901', 'Professor de matemática', NOW(), 'ativo'),
('Ana Paula', 'ana.paula@email.com', 'senha123', '12345678902', 'Professora de português', NOW(), 'ativo'),
('Marcos Lima', 'marcos.lima@email.com', 'senha123', '12345678903', 'Professor de história', NOW(), 'ativo'),
('Fernanda Souza', 'fernanda.souza@email.com', 'senha123', '12345678904', 'Professora de geografia', NOW(), 'ativo'),
('Julio Rocha', 'julio.rocha@email.com', 'senha123', '12345678905', 'Professor de física', NOW(), 'ativo'),
('Laura Mendes', 'laura.mendes@email.com', 'senha123', '12345678906', 'Professora de química', NOW(), 'ativo'),
('Pedro Santos', 'pedro.santos@email.com', 'senha123', '12345678907', 'Professor de biologia', NOW(), 'ativo'),
('Mariana Costa', 'mariana.costa@email.com', 'senha123', '12345678908', 'Professora de inglês', NOW(), 'ativo'),
('Lucas Oliveira', 'lucas.oliveira@email.com', 'senha123', '12345678909', 'Professor de literatura', NOW(), 'ativo'),
('Patricia Gomes', 'patricia.gomes@email.com', 'senha123', '12345678910', 'Professora de educação física', NOW(), 'ativo');

-- Inserir dados na tabela aluno
INSERT INTO aluno (nome, email, senha, cpf, data_de_nascimento, data_de_cadastro, status) VALUES
('João Silva', 'joao.silva@email.com', 'senha123', '98765432101', '2000-05-15', NOW(), 'ativo'),
('Maria Santos', 'maria.santos@email.com', 'senha123', '98765432102', '1999-08-22', NOW(), 'ativo'),
('Pedro Costa', 'pedro.costa@email.com', 'senha123', '98765432103', '2001-11-10', NOW(), 'ativo'),
('Ana Lima', 'ana.lima@email.com', 'senha123', '98765432104', '2000-01-05', NOW(), 'ativo'),
('Lucas Fernandes', 'lucas.fernandes@email.com', 'senha123', '98765432105', '1998-07-20', NOW(), 'ativo'),
('Carla Rocha', 'carla.rocha@email.com', 'senha123', '98765432106', '2002-03-25', NOW(), 'ativo'),
('Ricardo Alves', 'ricardo.alves@email.com', 'senha123', '98765432107', '1997-12-11', NOW(), 'ativo'),
('Patricia Moreira', 'patricia.moreira@email.com', 'senha123', '98765432108', '2000-09-30', NOW(), 'ativo'),
('Marcelo Dias', 'marcelo.dias@email.com', 'senha123', '98765432109', '1999-04-16', NOW(), 'ativo'),
('Juliana Pires', 'juliana.pires@email.com', 'senha123', '98765432110', '2001-06-08', NOW(), 'ativo');

-- Inserir dados na tabela administrador
INSERT INTO administrador (nome, email, senha, nivel_de_acesso, data_de_cadastro, status) VALUES
('Admin Total', 'admin.total@email.com', 'senha123', 'total', NOW(), 'ativo'),
('Admin Parcial', 'admin.parcial@email.com', 'senha123', 'parcial', NOW(), 'ativo'),
('Admin Leitura', 'admin.leitura@email.com', 'senha123', 'leitura', NOW(), 'ativo'),
('Admin Extra1', 'admin.extra1@email.com', 'senha123', 'total', NOW(), 'ativo'),
('Admin Extra2', 'admin.extra2@email.com', 'senha123', 'parcial', NOW(), 'ativo'),
('Admin Extra3', 'admin.extra3@email.com', 'senha123', 'leitura', NOW(), 'ativo'),
('Admin Extra4', 'admin.extra4@email.com', 'senha123', 'total', NOW(), 'ativo'),
('Admin Extra5', 'admin.extra5@email.com', 'senha123', 'parcial', NOW(), 'ativo'),
('Admin Extra6', 'admin.extra6@email.com', 'senha123', 'leitura', NOW(), 'ativo'),
('Admin Extra7', 'admin.extra7@email.com', 'senha123', 'total', NOW(), 'ativo');

-- Inserir dados na tabela conteudo (usar disciplina_id de 1 a 10 conforme inserido)
INSERT INTO conteudo (nome, descricao, disciplina_id) VALUES
('Álgebra Básica', 'Conteúdo de álgebra para iniciantes', 1),
('Gramática', 'Conteúdo sobre gramática da língua portuguesa', 2),
('Revolução Francesa', 'Conteúdo sobre a revolução francesa', 3),
('Cartografia', 'Conteúdo sobre mapas e localização', 4),
('Leis de Newton', 'Conteúdo sobre as leis do movimento', 5),
('Tabela Periódica', 'Conteúdo sobre elementos químicos', 6),
('Genética', 'Conteúdo sobre genes e hereditariedade', 7),
('Vocabulário Básico', 'Conteúdo para iniciantes em inglês', 8),
('Literatura Brasileira', 'Conteúdo sobre literatura do Brasil', 9),
('Atividades Físicas', 'Conteúdo sobre exercícios e esportes', 10);

-- Inserir dados na tabela questao (usar professor_id de 1 a 10 conforme inserido)
INSERT INTO questao (enunciado, tipo, nivel_de_dificuldade, gabarito, alternativas, professor_id) VALUES
('Qual o resultado de 2+2?', 'multipla_escolha', 'facil', '4', JSON_ARRAY('1','2','3','4'), 1),
('Complete a frase: Eu ___ feliz.', 'dissertativa', 'facil', 'estou', JSON_ARRAY(), 2),
('A Revolução Francesa ocorreu em que século?', 'multipla_escolha', 'medio', 'XVIII', JSON_ARRAY('XVII','XVIII','XIX','XX'), 3),
('Qual o continente onde fica o Brasil?', 'multipla_escolha', 'facil', 'América do Sul', JSON_ARRAY('África','América do Norte','América do Sul','Europa'), 4),
('Quem formulou as Leis de Newton?', 'multipla_escolha', 'medio', 'Isaac Newton', JSON_ARRAY('Galileu','Isaac Newton','Einstein','Tesla'), 5),
('Qual o símbolo químico da água?', 'multipla_escolha', 'facil', 'H2O', JSON_ARRAY('CO2','H2O','NaCl','O2'), 6),
('O que é DNA?', 'dissertativa', 'medio', 'Ácido desoxirribonucleico', JSON_ARRAY(), 7),
('Como se diz "casa" em inglês?', 'multipla_escolha', 'facil', 'House', JSON_ARRAY('House','Car','Dog','Tree'), 8),
('Quem escreveu "Dom Casmurro"?', 'multipla_escolha', 'medio', 'Machado de Assis', JSON_ARRAY('Machado de Assis','José de Alencar','Carlos Drummond','Cecília Meireles'), 9),
('Qual esporte é praticado com uma bola e duas cestas?', 'multipla_escolha', 'facil', 'Basquete', JSON_ARRAY('Futebol','Basquete','Vôlei','Handebol'), 10);

-- Inserir dados na tabela modelo_atividade (usando professor_id 1 a 10)
INSERT INTO modelo_atividade (tipo, data_de_criacao, status, professor_id) VALUES
('simulado', NOW(), 'aberta', 1),
('simulado', NOW(), 'nao_inciada', 2),
('redacao', NOW(), 'aberta', 3),
('simulado', NOW(), 'encerrada', 4),
('redacao', NOW(), 'aberta', 5),
('simulado', NOW(), 'aberta', 6),
('redacao', NOW(), 'nao_inciada', 7),
('simulado', NOW(), 'aberta', 8),
('redacao', NOW(), 'encerrada', 9),
('simulado', NOW(), 'aberta', 10);

-- Inserir dados na tabela modelo_simulado (usando modelo_atividade_id de 1 a 10)
INSERT INTO modelo_simulado (titulo, descricao, modelo_atividade_id) VALUES
('Simulado 1', 'Simulado de matemática básica', 1),
('Simulado 2', 'Simulado de português', 2),
('Simulado 3', 'Simulado de história', 4),
('Simulado 4', 'Simulado de geografia', 6),
('Simulado 5', 'Simulado de física', 8),
('Simulado 6', 'Simulado de química', 10),
('Simulado 7', 'Simulado de biologia', 5),
('Simulado 8', 'Simulado de inglês', 3),
('Simulado 9', 'Simulado de literatura', 7),
('Simulado 10', 'Simulado de educação física', 9);

-- Inserir dados na tabela modelo_redacao (usando modelo_atividade_id 1 a 10)
INSERT INTO modelo_redacao (tema, tipo, modelo_atividade_id) VALUES
('Tema 1', 'Dissertação', 3),
('Tema 2', 'Narrativa', 5),
('Tema 3', 'Expositivo', 7),
('Tema 4', 'Argumentativo', 9),
('Tema 5', 'Descritivo', 2),
('Tema 6', 'Dissertação', 4),
('Tema 7', 'Narrativa', 6),
('Tema 8', 'Expositivo', 8),
('Tema 9', 'Argumentativo', 10),
('Tema 10', 'Descritivo', 1);

-- Inserir dados na tabela atividade_aplicada (usando modelo_atividade_id 1 a 10)
INSERT INTO atividade_aplicada (titulo_da_aplicacao, data_realizacao, nota, status, modelo_atividade_id) VALUES
('Aplicação 1', NOW(), 8.5, 'ativo', 1),
('Aplicação 2', NOW(), 7.0, 'agendado', 2),
('Aplicação 3', NOW(), 0.0, 'ativo', 3),  
('Aplicação 4', NOW(), 0.0, 'ativo', 4),  
('Aplicação 5', NOW(), 0.0, 'ativo', 5),  
('Aplicação 6', NOW(), 0.0, 'ativo', 6); 

INSERT INTO atividade_do_aluno (atividade_aplicada_id, aluno_id, texto_redacao) VALUES 
(1, 1, 'Redação para Aplicação 1. (João)'),  
(2, 1, 'Redação para Aplicação 2. (João)'),  
(3, 2, 'Redação para Aplicação 3 (IA). (Maria)'),
(4, 2, 'Simulado Global concluído. (Maria)'),  
(5, 3, 'Redação sobre Clima submetida. (Pedro)'),
(6, 3, 'Simulado Final concluído. (Pedro)'); 

INSERT INTO correcao_professor (nota_final, comentarios, data_da_correcao, atividade_aplicada_id) VALUES 
(9.0, 'Excelente argumentação na Aplicação 1.', NOW(), 1), 
(8.2, 'Boa estrutura, mas o tema da Aplicação 2 precisa ser revisado.', NOW(), 2), 
(7.5, 'Aceitável, mas o uso do ponto final precisa de atenção (Aplicação 3).', NOW(), 3),
(9.8, 'Perfeito! Maior nota no Simulado Global (Aplicação 4).', NOW(), 4), 
(6.9, 'Nota baixa devido à falta de profundidade no tema Clima (Aplicação 5).', NOW(), 5), 
(8.4, 'Bom resultado geral no Simulado Final (Aplicação 6).', NOW(), 6); 
