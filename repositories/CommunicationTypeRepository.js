const mysql = require("../mysql").pool;

module.exports = {
  getAll(callback) {
    return mysql.getConnection((error, conn) => {
      if (error) {
        console.log(error);
        return;
      }

      conn.query("SELECT id_tipo, tipo FROM tipo", (err, results) => {
        conn.release();
        callback(err, results);
      });
    });
  },

  getTypeId(type, callback) {
    return mysql.getConnection((error, conn) => {
      if (error) {
        console.log(error);
        return;
      }

      conn.query(
        "SELECT id_tipo FROM tipo WHERE tipo = ?",
        [type],
        (err, result) => {
          conn.release();
          callback(err, result);
        }
      );
    });
  },
};
