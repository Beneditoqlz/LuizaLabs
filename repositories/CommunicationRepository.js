const mysql = require("../mysql").pool;

module.exports = {
  create(idUsuario, destinatario, mensagem, tipo, status, data, callback) {
    return mysql.getConnection((error, conn) => {
      if (error) {
        console.log(error);
        return;
      }

      conn.query(
        "INSERT INTO comunicacao (id_usuario, destinatario, mensagem, tipo_comunicacao, id_status, data_envio) VALUES (?, ?, ?, ?, ?, ?)",
        [idUsuario, destinatario, mensagem, tipo, status, data],
        (err, result) => {
          conn.release();
          callback(err, result);
        }
      );
    });
  },

  getUserCommunication(userId, id, callback) {
    return mysql.getConnection((error, conn) => {
      if (error) {
        console.log(error);
        return;
      }

      conn.query(
        "SELECT *, tipo, status FROM comunicacao c INNER JOIN tipo t ON c.tipo_comunicacao = t.id_tipo INNER JOIN status_comunicacao s ON c.id_status = s.id_status_comunicacao WHERE c.id_usuario = ? AND c.id = ? LIMIT 1",
        [userId, id],
        (err, result) => {
          conn.release();
          callback(err, result);
        }
      );
    });
  },

  cancel(id, callback) {
    return mysql.getConnection((error, conn) => {
      if (error) {
        console.log(error);
        return;
      }

      conn.query(
        "UPDATE comunicacao SET id_status = ? WHERE id = ?",
        [3, id],
        (err, result) => {
          conn.release();
          callback(err, result);
        }
      );
    });
  },
};
