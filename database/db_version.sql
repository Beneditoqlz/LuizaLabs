
CREATE TABLE IF NOT EXISTS comunicacao(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    destinatario VARCHAR(100) NOT NULL,
    mensagem VARCHAR (100) NOT NULL,
    tipo_comunicacao INT NOT NULL,
    situacao VARCHAR (100)  NOT NULL,
    recebimento varchar (100) NULL,
    Data DATETIME
);

CREATE TABLE IF NOT EXISTS TIPO(
    id_tipo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo varchar (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);


ALTER TABLE COMUNICACAO ADD FOREIGN KEY (tipo_comunicacao)
REFERENCES tipo (id_tipo);



INSERT INTO TIPO (TIPO) VALUES ('email');
INSERT INTO TIPO (TIPO) VALUES ('whatsapp');
INSERT INTO TIPO (TIPO) VALUES ('push');
INSERT INTO TIPO (TIPO) VALUES ('sms');