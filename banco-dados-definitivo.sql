drop database conecte_se;
create database conecte_se;
use conecte_se;

create table papeis_usuario(
papel_id int not null auto_increment,
nome varchar(50) not null,
descricao varchar(250) not null,
primary key(papel_id)
);

create table usuarios_da_plataforma(
apelido varchar(30) not null,
cpf varchar(11) not null,
nome varchar(50) not null,
sobrenome varchar(50) not null,
papel int not null,
email varchar(50) not null,
telefone varchar(11) not null,
senha varchar(255) not null,
primary key(apelido)
);

create table categorias_comunidades(
categoria_id int auto_increment,
nome varchar(50) not null,
descricao varchar(250),
criador varchar(30) not null,
primary key(categoria_id),
foreign key(criador)
references usuarios_da_plataforma(apelido)
);

create table comunidades(
comunidade_id int auto_increment,
nome varchar(50) not null,
descricao varchar(250),
categoria int not null,
data_criacao date not null,
criador varchar(30) not null,
estado int not null,
primary key(comunidade_id),
foreign key(criador) 
references usuarios_da_plataforma(apelido),
foreign key(categoria) 
references categorias_comunidades(categoria_id)
);

create table foruns(
forum_id int auto_increment,
titulo varchar(50) not null,
assunto varchar(1500) not null,
data_criacao date not null,
autor varchar(30) not null, 
comunidade int not null,
estado int not null, 
primary key(forum_id),
foreign key(autor)
references comunidades(criador),
foreign key(comunidade)
references comunidades(comunidade_id)
);

create table respostas_foruns(
resposta_id int auto_increment,
mensagem varchar(2500) not null,
data_criacao date not null,
autor varchar(30) not null, 
forum int not null,
primary key(resposta_id),
foreign key(autor)
references usuarios_da_plataforma(apelido),
foreign key(forum)
references foruns(forum_id)
);

create table ramos_empresas(
ramo_id int auto_increment,
nome varchar(50) not null,
descricao varchar(250) not null,
primary key(ramo_id)
);

create table empresas(
empresa_id int auto_increment,
nome varchar(50) not null,
cnpj varchar(14),
proprietario varchar(30) not null,
ramo int not null,
sobre_empresa varchar(250) not null,
fundacao date not null,
numero_funcionarios int not null,
telefone varchar(11) not null,
email varchar(50) not null,
primary key(empresa_id),
foreign key(ramo)
references ramos_empresas(ramo_id),
foreign key(proprietario)
references usuarios_da_plataforma(apelido)
);

insert into papeis_usuario(nome, descricao)
VALUES ('Empreendedor', 'Utiliza a plataforma com objetivo de divulgar sua empresa e/ou encontrar conhecimentos sobre o meio empreendedor.'),
('Consumidor', 'Utiliza a plataforma com objetivo de encontrar produtos de seu desejo.'),
('Estudante', 'Utiliza a plataforma com o objetivo de prestar auxílio aos empreendedores e encontrar conhecimentos sobre o meio empreendedor.'),
('Desenvolvedor','Desenvolve a plataforma Conecte-se');

insert into usuarios_da_plataforma (apelido, cpf, nome, sobrenome, papel, email, telefone, senha) values 
("aline", "00000000001", "Aline", "Fraga", (select papel_id from papeis_usuario where nome="Desenvolvedor"), "10160096@restinga.ifrs.edu.br", "51995875224", "alinesenha1"), 
("bruno", "00000000002", "Bruno", "Neves", (select papel_id from papeis_usuario where nome="Desenvolvedor"), "10160107@restinga.ifrs.edu.br", "51987546223", "brunosenha1"),
("rafaela", "00000000003", "Rafaela", "Correa", (select papel_id from papeis_usuario where nome="Desenvolvedor"), "10160091@restinga.ifrs.edu.br", "51985475621", "rafaelasenha1"),
("barbara", "00000000004", "Bárbara", "Raupp", (select papel_id from papeis_usuario where nome="Desenvolvedor"), "10160087@restinga.ifrs.edu.br", "51945687952", "barbarasenha1"),
("joao", "00000000005", "João", "Trindade", (select papel_id from papeis_usuario where nome="Desenvolvedor"), "10160104@restinga.ifrs.edu.br", "51963215479", "joaosenha1");

insert into categorias_comunidades (nome, descricao, criador) values
("Finanças", "Gestão das receitas da empresa", (select apelido from usuarios_da_plataforma where nome="Aline")),
("Marketing", "Estudo do mercado, envolvendo a promoção e propaganda da empresa", (select apelido from usuarios_da_plataforma where nome="Aline")),
("Gestão de Pessoas", "Organização dos clientes, funcionários, fornecedores e colaboradores da empresa", (select apelido from usuarios_da_plataforma where nome="Aline")),
("Produção/Operação", "Organização dos processos da empresa", (select apelido from usuarios_da_plataforma where nome="Aline"));
 
insert into comunidades(nome, descricao, categoria, data_criacao, criador, estado)values
('Agricultores da Zona Sul - Porto Alegre', 'Comunidade voltada para a divulgação de produtos orgânicos e troca de conhecimentos.', (select categoria_id from categorias_comunidades where nome="Marketing"), '2022-08-23', (select apelido from usuarios_da_plataforma where nome = 'Aline'), "1"),
('Empreendendo com eficiência','Aprenda a otimizar suas propagandas e obter maiores recompensas.', (select categoria_id from categorias_comunidades where nome="Marketing"),'2022-01-01', (select apelido from usuarios_da_plataforma where nome ='Bruno'), "1" ),
('Criatividade - Como maximizar a sua', 'Em um empreendimento a inovação é crucial.', (select categoria_id from categorias_comunidades where nome="Produção/Operação"), '2022-03-09', (select apelido from usuarios_da_plataforma where nome ="Bárbara"), "1");

insert into foruns(titulo, assunto, data_criacao, autor, comunidade, estado) values
('Aumento de vendas','Estou com acúmulo de estoque', "2022-08-23", (select apelido from usuarios_da_plataforma where nome='Aline'),(select comunidade_id from comunidades where nome="Empreendendo com eficiência"), "1"),
('Plantio de cenoura','Minha mãe pediu para ajuda-la com o plantio de cenoura, porém eu não sei fazer.',"2022-08-23", (select apelido from usuarios_da_plataforma where nome='Bruno'),(select comunidade_id from comunidades where nome="Agricultores da Zona Sul - Porto Alegre"), "1");
 
 insert into respostas_foruns (mensagem, data_criacao, autor, forum) values
("Monte um sistema de descontos e divulgue para toda sua lista de contatos de clientes, fiz isso mês passado em minha empresa", "2022-08-23", (select apelido from usuarios_da_plataforma where nome="Aline"), (select forum_id from foruns where titulo="Aumento de vendas")),
("Basta plantá-la em um ambiente abaixo de 25ºC, para isso indico a utilização de ventiladores", "2022-08-23", (select apelido from usuarios_da_plataforma where nome="Bruno"), (select forum_id from foruns where titulo="Plantio de cenoura"));

insert into ramos_empresas(nome, descricao) values
 ('Agricultura Familiar', 'Agricultura familiar é o cultivo da terra realizado por pequenos proprietários rurais, tendo como mão de obra, essencialmente, o núcleo familiar'),
 ('Desenvolvimento de Softwares', 'Desenvolvimento de software é o ato de elaborar e implementar um sistema computacional, a partir das demandas recebidas.'),
 ('Saúde e Bem Estar', 'Voltado para a manutenção da saúde e do bem estar das pessoas.'),
 ('Varejo', 'Venda de produtos e serviços em pequenas quantidades.');
 
 insert into empresas(nome, cnpj, proprietario, ramo, sobre_empresa, fundacao, numero_funcionarios, telefone, email)values
('Orgânicos & Caipiras', '00000000000001',(select apelido from usuarios_da_plataforma where nome="bruno"), (select ramo_id from ramos_empresas where nome="Agricultura Familiar"), 'Empresa voltada para agricultura familiar, atua na venda de produtos orgânicos, com entrega domiciliar de produtos como alfaces, temperos, chás entre outros.', '2016-07-12', '5', '51999999999', 'organicoscaipiras@contato.com.br'),
('Aline Studio de Dança','', (select apelido from usuarios_da_plataforma where apelido="aline"), (select ramo_id from ramos_empresas where nome="Saúde e Bem Estar"), 'Academia de dança que tem como missão contribuir para a manutenção da saúde e bem estar dos alunos', '2022-06-25', '6', '51486325479', 'alinestudiodedanca@contato.com.br');


select * from papeis_usuario;
select * from usuarios_da_plataforma;
select * from categorias_comunidades;
select * from comunidades;
select * from foruns;
 select * from respostas_foruns;
