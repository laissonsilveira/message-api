/**
 * @api {get} /actions Lista Fontes
 * @apiDescription Lista as fontes cadastradas
 * @apiName GetActions
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost:9090/message-api/actions' \
 *      -H 'Authorization: Bearer skdlkjlkje....'
 *
 * @apiSuccess {String} _id Identificador único da fonte
 * @apiSuccess {String} name Nome da fonte
 * @apiSuccess {String} version Versão da fonte
 * @apiSuccess {String} versionDate Data da versão da fonte
 *
 * @apiSuccessExample {json} Success-Response
 * [
 *    {
 *        "_id": "5c0c18f30ed9c94a52d0657c",
 *        "name": "bradesco",
 *        "version": "1.0.4",
 *        "versionDate": "2018-12-08T19:18:11.740Z"
 *    },
 *    {
 *        "_id": "5c11bdb20ed9c94a52d09fce",
 *        "name": "facebook",
 *        "version": "1.0.8",
 *        "versionDate": "2018-12-13T02:02:26.259Z"
 *    }
 * ]
 */
/**
 * @api {post} /actions/update-check Verifica atualização
 * @apiDescription Informa quais actions necessitam de atualização (update/delete)
 * @apiName PostActionUpdateCheck
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X POST 'https://localhost:9090/message-api/actions/update-check' \
 *      -H 'Authorization: Bearer skdlkjlkje....'
 *      -H 'Content-Type: application/json' \
 *      -d '{
 * 	            "actions": [
 *                  {
 *                      "name": "facebook",
 *                      "version": "1.0.8"
 *                  },
 *                  {
 *                      "name": "amil",
 *                       "version": "1.0.7"
 *                  }
 *              ]
 *          }'
 *
 * @apiParam {Object[]} actions Lista das actions instaladas no cliente
 * @apiParam {String} name Nome da fonte
 * @apiParam {String} version Versão da fonte
 * @apiParamExample {json} Request-Example
 * {
 *     "actions": [
 *         {
 *             "name": "facebook",
 *             "version": "1.0.8"
 *         },
 *         {
 *             "name": "amil",
 *              "version": "1.0.7"
 *         }
 *     ]
 * }
 *
 * @apiSuccess {String[]}  Lista com nome das fontes a serem atualizadas/removidas
 * @apiSuccessExample {json} Success-Response
 * [
 *     "goldencross",
 *     "amil"
 * ]
 */

/**
 * @api {post} /actions Download Fontes
 * @apiDescription Efetua o download das fontes as serem atualizadas no cliente
 * @apiName PostAction
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X POST \
 *    'https://localhost:9090/api/actions' \
 *    -H 'Content-Type: application/json' \
 *    -d '{
 *            "actions": ["amil"]
 *        }'
 *
 * @apiParam {String[]} actions Lista de nome das fontes a serem atualizadas
 * @apiParamExample {json} Request-Example
 * {
 *     "actions": ["amil"]
 * }
 *
 * @apiSuccessExample {buffer} Success-Response
 * HTTP/1.1 200 OK
 * Buffer[]
 */

/**
* @api {put} /actions Insere/Atualiza Fonte
* @apiDescription Insere ou atualiza um fonte
* @apiName PutAction
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiExample {curl} Example usage:
*  curl -X PUT \
*    'https://localhost:9090/api/actions' \
*    -H 'Content-Type: application/json' \
*    -d '{
*            "name": "amil",
*            "version": "1.0.8"
*        }'
*
* @apiParam {String} name Nome da fonte
* @apiParam {String} version Versão da fonte
* @apiParamExample {json} Request-Example
* {
*     "name": "amil",
*     "version": "1.0.8"
* }
*
* @apiSuccess {String} _id Identificador único da fonte
* @apiSuccess {String} name Nome da fonte
* @apiSuccess {String} version Versão da fonte
* @apiSuccess {String} versionDate Data da versão da fonte
*
* @apiSuccessExample {json} Success-Response
* {
*     "_id": "5c1abb4be076277b959efdde",
*     "name": "amil",
*     "version": "1.0.8",
*     "versionDate": "2018-12-21T03:57:35.013Z"
* }
*/

/**
* @api {delete} /actions Exclui Fonte
* @apiDescription Exclui uma fonte pelo ID
* @apiName DeleteActions
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiExample {curl} Example usage:
* curl -X DELETE \
*   'https://localhost:9090/message-api/actions/5c1c5ad37ba5fb5256145df7' \
*   -H 'Authorization: Bearer CJstk7cypEDwaFW4...'
*
* @apiParam {String} id Identificador único da fonte
*
* @apiSuccess {String} _id Identificador único da fonte
* @apiSuccess {String} name Nome da fonte
* @apiSuccess {String} version Versão da fonte
* @apiSuccess {String} versionDate Data da versão da fonte
*
* @apiSuccessExample {json} Success-Response
* {
*     "_id": "5c0c18f30ed9c94a52d0657c",
*     "name": "bradesco",
*     "version": "1.0.4",
*     "versionDate": "2018-12-08T19:18:11.740Z"
* }
*/

/**
* @api {post} /auth/login Autenticação
* @apiDescription Authenticação do cliente DGT
* @apiName login
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiHeader {String} [csynctoken] Token de validação do cliente
* @apiHeaderExample {json} Header-Example:
*   {
*     "csynctoken": "4c749356680a61faee4753b116c6db441e923c538ff2e129de1be5cef7ec5506"
*   }
*
* @apiExample {curl} Example usage:
*  curl -X POST \
*    'https://localhost:9090/message-api/auth/login' \
*    -H 'Content-Type: application/json' \
*    -d '{
*  	"username": "usuario",
*  	"password": "senha"
*    }'
*
* @apiParam {String} username Usuário de acesso do cliente DGT
* @apiParam {String} password Senha de acesso do cliente DGT
* @apiParamExample {json} Request-Example:
*  {
*  	"username": "usuario",
*  	"password": "senha"
*  }
*
* @apiSuccess {String} token Token de acesso do usuário
* @apiSuccessExample {json} Success-Response
* {
*     "token": "sdlkflkd.4k4kk44kl2k3dlnl.nf-hqb-JWr3k_vP0Rm-...."
* }
*/

/**
 * @api {get} /message-api/status Status
 * @apiDescription Informa o status do serviço C-Sync Server
 * @apiName status
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://c-sync.digitro.com.br/message-api/status' -H 'Authorization: Basic YWRtaW46O1NhY0RHVDEwMDI='
 *
 * @apiSuccess (Success) {String} pid ID do processo que está rodando o servidor
 * @apiSuccess (Success) {String} nodeVersion Versão do node
 * @apiSuccess (Success) {String} uptime Tempo em que o serviço está em execução (segundos)
 * @apiSuccess (Success) {Object} memoryUsage Dados de uso de memória do serviço
 * @apiSuccess (Success) {String} memoryUsage.rss Tamanho do conjunto
 * @apiSuccess (Success) {String} memoryUsage.heapTotal Tamanho total do heap
 * @apiSuccess (Success) {String} memoryUsage.heapUsed Heap realmente usado
 *
 * @apiSuccessExample {json} Success-Response
 * {
 *      "pid": 13760,
 *      "nodeVersion": "6.2.1",
 *      "uptime": "3 seconds",
 *      "memoryUsage": {
 *          "rss": "50.72 MB",
 *          "heapTotal": "24.13 MB",
 *          "heapUsed": "14.39 MB"
 *      }
 * }
 */

/**
 * @api {get} /message-api/version Versão
 * @apiDescription Informa a versão do C-Sync Server e o motivo da geração do último pacote
 * @apiName version
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://c-sync.digitro.com.br/message-api/version' -H 'Authorization: Basic YWRtaW46O1NhY0RHVDEwMDI='
 *
 * @apiSuccess (Success) {String} version Versão do C-Sync Server
 * @apiSuccess (Success) {String} changeLog Motivo da geração do último pacote
 *
 * @apiSuccessExample {json} Success-Response
 * {
 *     'version': 'message-api-1.0.0 - 14/12/2018 09:54:00',
 *     'changeLog': 'Criado endpoint /version.'
 * }
 */


/**
 * @api {get} /users Lista Clientes
 * @apiDescription Lista os clientes da DGT cadastrados e suas fontes
 * @apiName GetUsers
 * @apiGroup C-Sync Server
 * @apiVersion 1.0.0
 *
 * @apiExample {curl} Example usage:
 *  curl -X GET 'https://localhost:9090/message-api/users' -H 'Authorization: Bearer skdlkjlkje....'
 *
 * @apiSuccess {String} _id Identificador único do cliente
 * @apiSuccess {String} name Nome do cliente
 * @apiSuccess {String} username Nome de usuário do cliente
 * @apiSuccess {String} password Senha do cliente
 * @apiSuccess {String} token Token de validação do cliente
 * @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
 * @apiSuccess {String} actions._id Identificador único da fonte
 * @apiSuccess {String} actions.name Nome da fonte
 * @apiSuccess {String} actions.version Versão da fonte
 * @apiSuccess {String} actions.versionDate Data da versão da fonte
 * @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
 * @apiSuccess {String} actionsInstalled._id Identificador único da fonte
 * @apiSuccess {String} actionsInstalled.name Nome da fonte
 * @apiSuccess {String} actionsInstalled.version Versão da fonte
 * @apiSuccess {String} actionsInstalled.versionDate Data da versão da fonte
 *
 * @apiSuccessExample {json} Success-Response
 * [
 *     {
 *         "_id": "5c0c056d8abbb3aaa833dfba",
 *         "name": "Laisson R. Silveira",
 *         "username": "laisson",
 *         "password": "42b3da517f9e384f43bcd7592bc2e900f54f725d",
 *         "token": "4c749356680a61faee4753b116c6db441e923c538ff2e129de1be5cef7ec5506",
 *         "actions": [
 *             {
 *                 "_id": "5c11bdb20ed9c94a52d09fce",
 *                 "name": "facebook",
 *                 "version": "1.0.8",
 *                 "versionDate": "2018-12-13T02:02:26.259Z"
 *             },
 *             {
 *                 "_id": "5c1abb45e076277b959efdd9",
 *                 "name": "goldencross",
 *                 "version": "1.0.1",
 *                 "versionDate": "2018-12-19T21:42:29.930Z"
 *             },
 *             {
 *                 "_id": "5c1abb4be076277b959efdde",
 *                 "name": "amil",
 *                 "version": "1.0.8",
 *                 "versionDate": "2018-12-19T21:42:35.569Z"
 *             }
 *         ],
 *         "actionsInstalled": [
 *             {
 *                 "versionDate": "2018-12-19T23:46:00.048Z",
 *                 "_id": "5c1ad838459e1936db11df86",
 *                 "name": "bradesco",
 *                 "version": "1.0.4"
 *             },
 *             {
 *                 "versionDate": "2018-12-19T23:46:00.048Z",
 *                 "_id": "5c1ad838459e1936db11df85",
 *                 "name": "facebook",
 *                 "version": "1.0.8"
 *             }
 *         ]
 *     }
 * ]
 */

/**
* @api {get} /users/:id Busca Cliente
* @apiDescription Busca cliente pelo ID
* @apiName GetUsersID
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiExample {curl} Example usage:
*  curl -X GET 'https://localhost:9090/message-api/users/5c0c056d8abbb3aaa833dfba' -H 'Authorization: Bearer skdlkjlkje....'
*
* @apiParam {String} id Identificador único do cliente
*
* @apiSuccess {String} _id Identificador único do cliente
* @apiSuccess {String} name Nome do cliente
* @apiSuccess {String} username Nome de usuário do cliente
* @apiSuccess {String} password Senha do cliente
* @apiSuccess {String} token Token de validação do cliente
* @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
* @apiSuccess {String} actions._id Identificador único da fonte
* @apiSuccess {String} actions.name Nome da fonte
* @apiSuccess {String} actions.version Versão da fonte
* @apiSuccess {String} actions.versionDate Data da versão da fonte
* @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
* @apiSuccess {String} actionsInstalled._id Identificador único da fonte
* @apiSuccess {String} actionsInstalled.name Nome da fonte
* @apiSuccess {String} actionsInstalled.version Versão da fonte
* @apiSuccess {String} actionsInstalled.versionDate Data da versão da fonte
*
* @apiSuccessExample {json} Success-Response
* {
*     "_id": "5c0c056d8abbb3aaa833dfba",
*     "name": "Laisson R. Silveira",
*     "username": "laisson",
*     "password": "42b3da517f9e384f43bcd7592bc2e900f54f725d",
*     "token": "4c749356680a61faee4753b116c6db441e923c538ff2e129de1be5cef7ec5506",
*     "actions": [
*         {
*             "_id": "5c11bdb20ed9c94a52d09fce",
*             "name": "facebook",
*             "version": "1.0.8",
*             "versionDate": "2018-12-13T02:02:26.259Z"
*         },
*         {
*             "_id": "5c1abb45e076277b959efdd9",
*             "name": "goldencross",
*             "version": "1.0.1",
*             "versionDate": "2018-12-19T21:42:29.930Z"
*         },
*         {
*             "_id": "5c1abb4be076277b959efdde",
*             "name": "amil",
*             "version": "1.0.8",
*             "versionDate": "2018-12-19T21:42:35.569Z"
*         }
*     ],
*     "actionsInstalled": [
*         {
*             "versionDate": "2018-12-19T23:46:00.048Z",
*             "_id": "5c1ad838459e1936db11df86",
*             "name": "bradesco",
*             "version": "1.0.4"
*         },
*         {
*             "versionDate": "2018-12-19T23:46:00.048Z",
*             "_id": "5c1ad838459e1936db11df85",
*             "name": "facebook",
*             "version": "1.0.8"
*         }
*     ]
* }
*/

/**
* @api {put} /users Atualiza Cliente
* @apiDescription Busca e atualiza cliente pelo ID
* @apiName PutUsers
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiExample {curl} Example usage:
* curl -X PUT \
*   'https://localhost:9090/message-api/users' \
*   -H 'Authorization: Bearer CJstk7cypEDwaFW4...' \
*   -H 'Content-Type: application/json' \
*   -d '{
*          "_id": "5c0c056d8abbb3aaa833dfba",
*          "name": "Outro nome"
*      }'
*
* @apiParam {String} _id Identificador único do cliente
* @apiParam {String} [name] Atributos a serem atualizados
* @apiParamExample {json} Request-Example
*  {
*      "_id": "5c0c056d8abbb3aaa833dfba",
*      "name": "Outro nome"
*  }
*
* @apiSuccess {String} _id Identificador único do cliente
* @apiSuccess {String} name Nome do cliente
* @apiSuccess {String} username Nome de usuário do cliente
* @apiSuccess {String} password Senha do cliente
* @apiSuccess {String} token Token de validação do cliente
* @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
* @apiSuccess {String} actions._id Identificador único da fonte
* @apiSuccess {String} actions.name Nome da fonte
* @apiSuccess {String} actions.version Versão da fonte
* @apiSuccess {String} actions.versionDate Data da versão da fonte
* @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
* @apiSuccess {String} actionsInstalled._id Identificador único da fonte
* @apiSuccess {String} actionsInstalled.name Nome da fonte
* @apiSuccess {String} actionsInstalled.version Versão da fonte
* @apiSuccess {String} actionsInstalled.versionDate Data da versão da fonte
*
* @apiSuccessExample {json} Success-Response
* {
*     "_id": "5c0c056d8abbb3aaa833dfba",
*     "name": "Outro nome",
*     "username": "laisson",
*     "password": "42b3da517f9e384f43bcd7592bc2e900f54f725d",
*     "token": "4c749356680a61faee4753b116c6db441e923c538ff2e129de1be5cef7ec5506",
*     "actions": [
*         {
*             "_id": "5c11bdb20ed9c94a52d09fce",
*             "name": "facebook",
*             "version": "1.0.8",
*             "versionDate": "2018-12-13T02:02:26.259Z"
*         },
*         {
*             "_id": "5c1abb45e076277b959efdd9",
*             "name": "goldencross",
*             "version": "1.0.1",
*             "versionDate": "2018-12-19T21:42:29.930Z"
*         },
*         {
*             "_id": "5c1abb4be076277b959efdde",
*             "name": "amil",
*             "version": "1.0.8",
*             "versionDate": "2018-12-19T21:42:35.569Z"
*         }
*     ],
*     "actionsInstalled": [
*         {
*             "versionDate": "2018-12-19T23:46:00.048Z",
*             "_id": "5c1ad838459e1936db11df86",
*             "name": "bradesco",
*             "version": "1.0.4"
*         },
*         {
*             "versionDate": "2018-12-19T23:46:00.048Z",
*             "_id": "5c1ad838459e1936db11df85",
*             "name": "facebook",
*             "version": "1.0.8"
*         }
*     ]
* }
*/

/**
* @api {post} /users Adiciona Cliente
* @apiDescription Adiciona um novo cliente
* @apiName PostUsers
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiExample {curl} Example usage:
* curl -X POST \
*   'https://localhost:9090/message-api/users' \
*   -H 'Authorization: Bearer CJstk7cypEDwaFW4...' \
*   -H 'Content-Type: application/json' \
*   -d '{
*         "name": "Um novo usuário"
*         "username": "novo usuário",
*         "password": "senhaTeste",
*      }'
*
* @apiParam {String} name Nome do cliente
* @apiParam {String} username Nome de usuário para o cliente
* @apiParam {String} password Senha do cliente
* @apiParamExample {json} Request-Example
* {
*    "name": "Um novo usuário"
*    "username": "novo usuário",
*    "password": "senhaTeste",
* }
*
* @apiSuccess {String} _id Identificador único do cliente
* @apiSuccess {String} name Nome do cliente
* @apiSuccess {String} username Nome de usuário do cliente
* @apiSuccess {String} password Senha do cliente
* @apiSuccess {String} token Token de validação do cliente
* @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
* @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
*
* @apiSuccessExample {json} Success-Response
* {
*     "_id": "5c1c5ad37ba5fb5256145df7",
*     "username": "novo usuário",
*     "password": "5083acb4a3c0e6510b00eac9c5ed268cb6638450",
*     "name": "Um novo usuário",
*     "actions": [],
*     "actionsInstalled": []
* }
*/

/**
* @api {delete} /users Exclui Cliente
* @apiDescription Exclui um cliente pelo ID
* @apiName DeleteUsers
* @apiGroup C-Sync Server
* @apiVersion 1.0.0
*
* @apiExample {curl} Example usage:
* curl -X DELETE \
*   'https://localhost:9090/message-api/users/5c1c5ad37ba5fb5256145df7' \
*   -H 'Authorization: Bearer CJstk7cypEDwaFW4...'
*
* @apiParam {String} id Identificador único do cliente
*
* @apiSuccess {String} _id Identificador único do cliente
* @apiSuccess {String} name Nome do cliente
* @apiSuccess {String} username Nome de usuário do cliente
* @apiSuccess {String} password Senha do cliente
* @apiSuccess {String} token Token de validação do cliente
* @apiSuccess {Object[]} actions Fontes disponíveis para o cliente
* @apiSuccess {Object[]} actionsInstalled Fontes instaladas no cliente
*
* @apiSuccessExample {json} Success-Response
* {
*     "_id": "5c1c5ad37ba5fb5256145df7",
*     "username": "novo usuário",
*     "password": "5083acb4a3c0e6510b00eac9c5ed268cb6638450",
*     "name": "Um novo usuário",
*     "actions": [],
*     "actionsInstalled": []
* }
*/