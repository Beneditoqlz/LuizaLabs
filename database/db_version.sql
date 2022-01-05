
CREATE TABLE IF NOT EXISTS comunicacao(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    destinatario VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL,
    tipo_comunicacao INT NOT NULL,
    id_status INT NOT NULL,
    data_envio DATETIME
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

ALTER TABLE comunicacao ADD FOREIGN KEY (id_usuario)
REFERENCES usuarios (id_usuario);

ALTER TABLE comunicacao ADD FOREIGN KEY (tipo_comunicacao)
REFERENCES tipo (id_tipo);

INSERT INTO TIPO (TIPO) VALUES ('email');
INSERT INTO TIPO (TIPO) VALUES ('whatsapp');
INSERT INTO TIPO (TIPO) VALUES ('push');
INSERT INTO TIPO (TIPO) VALUES ('sms');

CREATE TABLE IF NOT EXISTS status_comunicacao(
    id_status_comunicacao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `status` varchar (100) NOT NULL
);

INSERT INTO status_comunicacao (`status`) VALUES ('À enviar'), ('Enviada'), ('Cancelada');

ALTER TABLE comunicacao ADD FOREIGN KEY (id_status)
REFERENCES status_comunicacao (id_status_comunicacao);
