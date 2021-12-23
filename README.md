# LuizaLabs
Projeto  de uma API RestFul para agendamento de comunicação. Feito na linguagem javascript por meio do node.js.

Licença
GNU General Public License v3.0

Tecnologias Utilizadas:

NODE JS: Node.js é um runtime de JavaScript que leva a renderização e processamento do código JavaScript para o lado do servidor, desvinculando-o totalmente do browser, possibilitando o desenvolvimento de  aplicações de rede rápidas e estáveis.

EXPRESS: Express é um framework para aplicativo da web do Node.js mínimo e flexível que fornece um conjunto robusto de recursos para aplicativos web, móvel e API.

NODEMON: Utilitário de interface de linha de comando (CLI) desenvolvido pelo @rem que encapsula seu aplicativo Node, monitora o sistema de arquivos e reinicia o processo automaticamente, utilizado no ambiente de desenvolvimento, trazendo otimização de tempo ao desenvolvedor.

MORGAN: Biblioteca utilizada no NodeJS para salvar o log das requisições feitas a API.
Com ele e  possível monitorar todos os dados de entrada de sua API, verificar se tem algum dado incorreto que está sendo enviado e entre outros casos de uso.

BODY-PARSER: Middleware de análise de corpo do Node.js. Faz analise dos corpos das solicitações recebidas em um middleware antes de seus manipuladores, disponíveis na req.bodypropriedade.

JWT: É uma string de caracteres codificados que, caso cliente e servidor estejam sob HTTPS, permite que somente o servidor que conhece o ‘segredo’ possa ler o conteúdo do token, e assim confirmar a autenticidade do cliente

BCRYPT: Método de criptografia do tipo hash para senhas baseado no Blowfish

MYSQL: Sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface. 

POSTMAN: API Client que facilita aos desenvolvedores criar, compartilhar, testar e documentar APIs. Isso é feito, permitindo aos usuários criar e salvar solicitações HTTP e HTTPs simples e complexas, bem como ler suas respostas.


VISUAL STUDIO CODE: Editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS. Ele inclui suporte para depuração, controle de versionamento Git incorporado, realce de sintaxe, complementação inteligente de código, snippets e refatoração de código.

HEROKU: Ferramenta para deploy.

GITHUB: Plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git.


PARA COMPILAR E EXECUTAR O PROJETO É NECESSÁRIO TER INSTALADO O NODE.JS e um terminal , alguns exemplos são o cmd do windows, o bash do git e o terminal do Visual Studio Code e uma ferramenta de API cliente para acessar as rotas, alguns exemplos dessas ferramentas são Postman e Insomnia.


INSTALAÇÃO:
Clone o projeto https://github.com/Beneditoqlz/LuizaLabs.git .
É necessário executar o script contido no arquivo db_version.sql localizado na pasta database, para a criação do banco de dados.
Apos a conclusão do download do projeto, navegue dentro da pasta LuizaLabs e execute o terminal, na linha de comando digite: npm install, o node ira baixar os arquivos necessários para execução, após digite no terminal npm start, e a aplicação irá iniciar.

No aplicativo Postman ou Inomnia a primeira rota a ser executada deve ser a de cadastro de usuario na seguinte URL http://localhost:3000/users/cadastro, é necessário preencher um arquivo json, com usuario e senha para cadastro no banco como o a seguir:
{
    "usuario": "beneditoqlz2022",
    "senha": "123456"
}

A aplicação retornara avisos dizendo se foi concluido com sucesso, se o usuario já existe. Será gerado tambem um token , que é exibido quando e feito o login, esse mesmo token será necessário para as ações de post e patch. 

O login é feito pela URL: http://localhost:3000/users/login  e quando feito com sucesso retorna o seguinte arquivo json:
{
    "mensagem": "Autenticado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjo1LCJ1c3VhcmlvIjoiYmVuZWRpdG9xbHoyMDIyIiwiaWF0IjoxNjQwMjk0MTkwLCJleHAiOjE2NDAzMTIxOTB9.wmhpPF5pBUdl4gyBN5m-0EFfezCHan01AnDMnCD8wQM"
}
(Observação: Para cada usuário é gerado um token diferente)

1º Endpoint: A URL para Agendamento de envio de comunicação(POST) http://localhost:3000/agendamentos, é necessário inserir o token no postman ou insomnia com o type: bearen token, e enviar um arquivo json conforme o exemplo:
{
    "destinatario": "Benedito",
    "mensagem": "Promoção Natal",
    "situacao": "agendado",
    "tipo_comunicacao": "email",
    "recebimento": "beneditoqlz@hotmail.com",
    "data": "2020-08-21 18:26:00"


}

Caso o formato de comunicacao (tipo_comunicacao) não seja email, push, sms ou whatsapp, o sistema retorna um erro , informando que o tipo de comunicação não é valido.

2º Endpoint: Para verificar o status de um agendamento se coloca a seguinte URL (GET) http://localhost:3000/agendamentos/ seguida do id , por exemplo http://localhost:3000/agendamentos/2.
Exemplo resultado:
{
    "Agendamento": {
        "id_agendamento": 10,
        "destinatario": "beneditoqlz",
        "situacao": "agendado",
        "request": {
            "tipo": "GET",
            "Descricao": "Retorna todos os agendamentos",
            "url": "http://localhost:3000/agendamento/"
        }
    }
}

3° Endpoint - Cancelamento de um agendamento (PATCH) , acessar a URL http://localhost:3000/agendamentos e informar o id em um arquivo json:
Exemplo Arquivo:
{
    "id": 10,
    "situacao": "CANCELADA"
}
Exemplo de retorno:
{
    "mensagem": "Agendamento Cancelado com sucesso",
    "AgendamentoAtualizado": {
        "id": 10,
        "situacao": "CANCELADA",
        "request": {
            "tipo": "GET",
            "descricao": "Retorna os dados de um agendamento em específico",
            "url": "http://localhost:3000/agendamento/10"
        }
    }
}
