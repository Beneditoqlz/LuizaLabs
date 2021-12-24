const CommunicationRepository = require("../repositories/CommunicationRepository");
const CommunicationTypeRepository = require("../repositories/CommunicationTypeRepository");

exports.create = (req, res) => {
  const { destinatario, mensagem, tipo, data } = req.body;

  if (!destinatario || !mensagem || !tipo || !data) {
    let error = " is required";

    if (!destinatario) {
      error = "Destinatario" + error;
    }
    if (!mensagem) {
      error = "Mensagem" + error;
    } else if (!tipo) {
      error = "Tipo" + error;
    } else {
      error = "Data" + error;
    }

    return res.status(400).send({ error: error });
  }

  CommunicationTypeRepository.getTypeId(tipo, (error, result) => {
    if (error) {
      return res.status(500).send({ error: "An unexpected error occured" });
    }

    if (!result.length) {
      return res.status(400).send({ error: "Tipo is invalid" });
    }

    const idTipo = result[0].id_tipo;
    const idStatus = 1; // À enviar

    CommunicationRepository.create(
      req.user.id_usuario,
      destinatario,
      mensagem,
      idTipo,
      idStatus,
      data,
      (error2, result2) => {
        if (error2) {
          return res.status(500).send({ error: error2 });
        }

        CommunicationRepository.getUserCommunication(
          req.user.id_usuario,
          result2.insertId,
          (error3, result3) => {
            if (error3) {
              return res
                .status(500)
                .send({ error: "An unexpected error occured" });
            }

            return res.status(200).send({
              id: result3[0].id,
              data_envio: result3[0].data_envio,
              destinatario: result3[0].destinatario,
              mensagem: result3[0].mensagem,
              tipo: result3[0].tipo,
              status: result3[0].status,
            });
          }
        );
      }
    );
  });
};

exports.getCommunication = (req, res) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send({ error: "Invalid id" });
  }

  CommunicationRepository.getUserCommunication(
    req.user.id_usuario,
    id,
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: "An unexpected error occured" });
      }

      if (!result.length) {
        return res.status(404).send({ error: "Communication not found" });
      }

      return res.status(200).send({
        communication: {
          id: result[0].id,
          data_envio: result[0].data_envio,
          destinatario: result[0].destinatario,
          mensagem: result[0].mensagem,
          tipo: result[0].tipo,
          status: result[0].status,
        },
      });
    }
  );
};

exports.cancel = (req, res) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send({ error: "Invalid id" });
  }

  CommunicationRepository.getUserCommunication(
    req.user.id_usuario,
    id,
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: "An unexpected error occured" });
      }

      if (!result.length) {
        return res.status(404).send({ error: "Communication not found" });
      }

      CommunicationRepository.cancel(id, (err2) => {
        if (err2) {
          return res.status(500).send({ error: "An unexpected error occured" });
        }

        return res
          .status(200)
          .send({ message: "Communication successfully canceled" });
      });
    }
  );
};
