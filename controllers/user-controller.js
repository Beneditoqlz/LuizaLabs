const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.cadastrarUsuarios =
  ("/cadastro",
  (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "SELECT * FROM usuarios where usuario = ?",
        [req.body.usuario],
        (error, results) => {
          if (error) {
            return res.status(500).send({ error: error });
          }
          if (results.length > 0) {
            res.status(409).send({ error: "Usuário ja cadastrado" });
          } else {
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
              if (errBcrypt) {
                return res.status(500).send({ error: errBcrypt });
              }
              conn.query(
                "INSERT INTO usuarios (usuario, senha) values (?,?)",
                [req.body.usuario, hash],
                (error, results) => {
                  conn.release();
                  if (error) {
                    return res.status(500).send({ error: error });
                  }
                  response = {
                    message: "User successfully created",
                    usuarioCriado: {
                      id_usuario: results.insertId,
                      usuario: req.body.usuario,
                    },
                  };
                  return res.status(201).send(response);
                }
              );
            });
          }
        }
      );
    });
  });

exports.efetuarLogin =
  ("/login",
  (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      const query = "SELECT * FROM usuarios where usuario = ?";
      conn.query(query, [req.body.usuario], (error, results, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        if (results.length < 1) {
          return res.status(401).send({ error: "Unauthorized" });
        }
        bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
          if (err) {
            return res.status(401).send({ error: "Unauthorized" });
          }
          if (result) {
            const token = jwt.sign(
              {
                id_usuario: results[0].id_usuario,
                usuario: results[0].usuario,
              },
              "SECRET",
              {
                expiresIn: "5h",
              }
            );

            return res.status(200).send({
              message: "Successfully authenticated",
              token: token,
            });
          }
          return res.status(401).send({ error: "Unauthorized" });
        });
      });
    });
  });
