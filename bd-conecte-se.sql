drop database conecte_se;
create database conecte_se;
use conecte_se;

create table usuarios_da_plataforma(
cpf varchar(11) not null,
nome varchar(50) not null,
sobrenome varchar(50) not null,
tipo_usuario int not null,
email varchar(50) not null,
telefone varchar(11) not null,
senha varchar(30) not null,
primary key(cpf)
);

create table categorias_comunidades(
categoria_id int auto_increment,
nome varchar(50) not null,
descricao varchar(120),
criador varchar(11) not null,
primary key(categoria_id),
foreign key(criador)
references usuarios_da_plataforma(cpf)
);

create table comunidades(
comunidade_id int auto_increment,
nome varchar(50) not null,
descricao varchar(120),
categoria int not null,
data_criacao date not null,
criador varchar(11) not null,
primary key(comunidade_id),
foreign key(criador) 
references usuarios_da_plataforma(cpf),
foreign key(categoria) 
references categorias_comunidades(categoria_id)
);

create table foruns(
forum_id int auto_increment,
titulo varchar(50) not null,
assunto varchar(1000) not null,
data_criacao date not null,
autor varchar(11) not null, 
comunidade int,
primary key(forum_id),
foreign key(autor)
references comunidades(criador),
foreign key(comunidade)
references comunidades(comunidade_id)
);

create table respostas_foruns(
resposta_id int auto_increment,
titulo varchar(50) not null,
assunto varchar(1000) not null,
data_criacao date not null,
autor varchar(11) not null, 
comunidade int,
primary key(forum_id),
foreign key(autor)
references comunidades(criador),
foreign key(comunidade)
references comunidades(comunidade_id)
);


select * from categorias_comunidades;
insert into categorias_comunidades(nome, descricao, criador) values ("marketing para varejo", "para falar da divulgação dos negócios varejistas", (select cpf from usuarios_da_plataforma where nome='aline' and sobrenome="fraga da silva"));