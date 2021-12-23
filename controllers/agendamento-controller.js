const mysql = require('../mysql').pool;



exports.postAgendamentos = ('/',(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error){ return res.status(500).send({error: error}) }

    if([req.body.tipo_comunicacao] =='email') {
      conn.query(
        'INSERT INTO comunicacao (destinatario, mensagem, tipo_comunicacao, situacao, recebimento, data) VALUES (?,?,?,?,?,?)',
        [req.body.destinatario, req.body.mensagem,'5',req.body.situacao, req.body.recebimento,req.body.data],
        (error, result, field) => {
          conn.release();
          if (error){return res.status(500).send({ error: error})}
           const response = {
             mensagem: "Inserido com sucesso",
             AgendamentoCriado: {
               id_agendamento: result.id,
               destinatario: req.body.destinatario,
               mensagem: req.body.mensagem,
               request: {
                 tipo: 'POST',
                 Descricao: 'Retorna todos os agendamentos ',
                 url: 'http://localhost:3000/agendamento'
               }
               
             }
           }
           return res.status(201).send(response);
     
          }
                
     
        )
      
    }
    if([req.body.tipo_comunicacao] =='whatsapp') {
      conn.query(
        'INSERT INTO comunicacao (destinatario, mensagem, tipo_comunicacao, situacao, recebimento, data) VALUES (?,?,?,?,?,?)',
        [req.body.destinatario, req.body.mensagem,'5',req.body.situacao, req.body.recebimento,req.body.data],
        (error, result, field) => {
          conn.release();
          if (error){return res.status(500).send({ error: error})}
           const response = {
             mensagem: "Inserido com sucesso",
             AgendamentoCriado: {
               id_agendamento: result.id,
               destinatario: req.body.destinatario,
               mensagem: req.body.mensagem,
               request: {
                 tipo: 'POST',
                 Descricao: 'Retorna todos os agendamentos ',
                 url: 'http://localhost:3000/agendamento'
               }
               
             }
           }
           return res.status(201).send(response);
     
          }
                
     
        )
      
    }
    if([req.body.tipo_comunicacao] =='push') {
      conn.query(
        'INSERT INTO comunicacao (destinatario, mensagem, tipo_comunicacao, situacao, recebimento, data) VALUES (?,?,?,?,?,?)',
        [req.body.destinatario, req.body.mensagem,'5',req.body.situacao, req.body.recebimento,req.body.data],
        (error, result, field) => {
          conn.release();
          if (error){return res.status(500).send({ error: error})}
           const response = {
             mensagem: "Inserido com sucesso",
             AgendamentoCriado: {
               id_agendamento: result.id,
               destinatario: req.body.destinatario,
               mensagem: req.body.mensagem,
               request: {
                 tipo: 'POST',
                 Descricao: 'Retorna todos os agendamentos ',
                 url: 'http://localhost:3000/agendamento'
               }
               
             }
           }
           return res.status(201).send(response);
     
          }
                
     
        )
      
    }
    if([req.body.tipo_comunicacao] =='sms') {
      conn.query(
        'INSERT INTO comunicacao (destinatario, mensagem, tipo_comunicacao, situacao, recebimento, data) VALUES (?,?,?,?,?,?)',
        [req.body.destinatario, req.body.mensagem,'5',req.body.situacao, req.body.recebimento,req.body.data],
        (error, result, field) => {
          conn.release();
          if (error){return res.status(500).send({ error: error})}
           const response = {
             mensagem: "Inserido com sucesso",
             AgendamentoCriado: {
               id_agendamento: result.id,
               destinatario: req.body.destinatario,
               mensagem: req.body.mensagem,
               request: {
                 tipo: 'POST',
                 Descricao: 'Retorna todos os agendamentos ',
                 url: 'http://localhost:3000/agendamento'
               }
               
             }
           }
           return res.status(201).send(response);
     
          }
                
     
        )
      
    }
   
    
    
     
  
  })
      
  }
)



exports.getAgendamentos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error){ return res.status(500).send({error: error}) }
    conn.query(
     'select * from comunicacao inner join tipo on comunicacao.tipo_comunicacao = tipo.id_tipo;',
     (error, result, fields) => {
      if (error){ return res.status(500).send({error: error}) }
      const response = {
        Quantidade: result.length,
        Registros: result.map(agen => {
          return {
            id: agen.id,
            destinatario: agen.destinatario,
            mensagem: agen.mensagem,
            request:{
              descricao: 'Retorna os dados de um agendamento',
              url: 'http://localhost:3000/agendamento/'+agen.id
            }
          }
        })
      }
       return res.status(200).send({response})
     }
    )
  })
};

exports.updateAgendamentos = ('/',(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error){ return res.status(500).send({error: error}) }
    
    conn.query(
     'UPDATE COMUNICACAO SET DESTINATARIO = ?, MENSAGEM = ? WHERE ID = ? ',
     [req.body.destinatario,req.body.mensagem, req.body.id],
     (error, result, fields) => {
       conn.release();
      if (error){ return res.status(500).send({error: error}) }
      const response = {
        mensagem: 'Agendamento Cancelado com sucesso',
        AgendamentoAtualizado: {
          id: req.body.id,
          destinatario: req.body.destinatario,
          situacao: req.body.situacao,
          request :{
            tipo: 'GET',
            descricao: 'Retorna os dados de um agendamento em específico',
            url: 'http://localhost:3000/agendamento/' + req.body.id
          }
        }
      }
      res.status(202).send(response);
    }
    )
  })
});
  


exports.getAgendamentoEspecifico = ('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error){ return res.status(500).send({error: error}) }
    conn.query(
     'select * from comunicacao inner join tipo on comunicacao.tipo_comunicacao = tipo.id_tipo  where id = ?;',
     [req.params.id],
     (error, result, fields) => {
      if (error){ return res.status(500).send({error: error}) }

        if (result.length == 0){
          return res.status(404).send({
            mensagem: 'Agendamento não Encontrado'
          })
        }
      const response = {
        Agendamento: {
          id_agendamento: result[0].id,
          destinatario: result[0].destinatario,
          situacao: result[0].situacao,
          request: {
            tipo: 'GET',
            Descricao: 'Retorna todos os agendamentos',
            url: 'http://localhost:3000/agendamento/'
          }
          
        }
      }
      return res.status(200).send(response);
     }
    )
  })
});


