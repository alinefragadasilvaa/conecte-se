drop database conecte_se;
create database conecte_se;
use conecte_se;

create table papeis_usuario(
papel_id int not null auto_increment,
nome varchar(50) not null,
descricao varchar(120) not null,
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
descricao varchar(120),
criador varchar(30) not null,
primary key(categoria_id),
foreign key(criador)
references usuarios_da_plataforma(apelido)
);

create table comunidades(
comunidade_id int auto_increment,
nome varchar(50) not null,
descricao varchar(120),
categoria int not null,
data_criacao date not null,
criador varchar(30) not null,
estado boolean not null,
primary key(comunidade_id),
foreign key(criador) 
references usuarios_da_plataforma(apelido),
foreign key(categoria) 
references categorias_comunidades(categoria_id)
);

create table foruns(
forum_id int auto_increment,
titulo varchar(50) not null,
assunto varchar(1000) not null,
data_criacao date not null,
autor varchar(30) not null, 
comunidade int not null,
estado boolean not null, 
primary key(forum_id),
foreign key(autor)
references comunidades(criador),
foreign key(comunidade)
references comunidades(comunidade_id)
);

create table respostas_foruns(
resposta_id int auto_increment,
mensagem varchar(1000) not null,
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
descricao varchar(120) not null,
primary key(ramo_id)
);

create table empresas(
empresa_id int auto_increment,
nome varchar(50) not null,
cnpj varchar(14),
proprietario varchar(30) not null,
ramo int not null,
fundacao date not null,
numero_funcionarios int not null,
contato varchar(100) not null,
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
