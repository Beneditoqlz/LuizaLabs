const jwt = require("jsonwebtoken");

exports.obrigatorio = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "SECRET");
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({ mensagem: "Falha na autenticação" });
  }
};

exports.Login = async (req, res, next) => {
  try {
    const query = `SELECT * FROM usuarios WHERE usuario = ?`;
    var results = await mysql.execute(query, [req.body.usuario]);

    if (results.length < 1) {
      return res.status(401).send({ message: "Falha na autenticação" });
    }

    if (await bcrypt.compareSync(req.body.senha, results[0].senha)) {
      const token = jwt.sign(
        {
          userId: results[0].usuario_id,
          usuario: results[0].usuario,
        },
        "SECRET",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({
        message: "Autenticado com sucesso",
        token: token,
      });
    }
    return res.status(401).send({ message: "Falha na autenticação" });
  } catch (error) {
    return res.status(500).send({ message: "Falha na autenticação" });
  }
};
