/*eslint no-console: ['error', { allow: ['log', 'error'] }] */
/**
 * @autor Laisson R. Silveira<laisson.r.silveira@gmail.com>
 *
 * Created on 12/05/2018
 */
'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.config.includeStack = false;
const expect = chai.expect;
const moment = require('moment');
global.__CONFIG = require('../config');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod;

const HOST_SERVER = `http://localhost:${__CONFIG.server.port}`;
describe('message-api tests', function () {
    let UsersModel, MessagesModel;
    const user01 = { name: 'userTest01' };
    const user02 = { name: 'userTest02' };

    before(done => {
        mongod = new MongoMemoryServer({
            instance: {
                port: __CONFIG.database.port,
                ip: __CONFIG.database.host,
                dbName: __CONFIG.database.dbName,
                debug: __CONFIG.database.isDebug
            },
            binary: {
                version: '4.0.4'
            },
            debug: false
        });
        // Aguarda 3 segundos para criação do mongo em memória para começar os testes
        console.log('Aguardando MongoDB iniciar em memória...');
        setTimeout(async () => {
            await require('../lib/db').connect();
            require('../server').fork();
            const mongoose = require('mongoose');
            UsersModel = mongoose.model('Users');
            MessagesModel = mongoose.model('Messages');
            done();
        }, 3000);
    });

    after(() => {
        mongod.stop();
    });

    describe('/users', () => {

        let userSaved;

        beforeEach(async () => userSaved = await new UsersModel(user01).save());
        afterEach(() => UsersModel.collection.drop());

        describe('SUCCESS', () => {

            it('GET /users/:id', async () => {
                const response = await chai.request(HOST_SERVER).get(`/api/users/${userSaved.id}`);
                expect(response).to.have.status(200);
                const userResponse = response.body;
                expect(userResponse).that.is.an('object');
                validateUser(userResponse, userSaved);
            });

            it('POST /users', async () => {
                const response = await chai.request(HOST_SERVER).post('/api/users').send(user02);
                expect(response).to.have.status(200);
            });

        });

        const validateUser = (userFound, userTest) => {
            expect(userFound).that.is.an('object');

            expect(userFound)
                .to.have.property('id')
                .that.is.a('string')
                .that.equals(userTest.id);
            expect(userFound)
                .to.have.property('name')
                .that.is.a('string')
                .that.equals(userTest.name);
            expect(userFound)
                .to.have.property('budget')
                .that.is.a('number')
                .that.equals(10);
            expect(userFound)
                .to.have.property('messageSentCount')
                .that.is.a('number')
                .that.equals(0);
            expect(userFound)
                .to.have.property('createdAt')
                .that.is.a('string');

            expect(moment(userFound.createdAt).format('YYYY-MM-DD'))
                .that.is.equals(moment().format('YYYY-MM-DD'));
        };

    });

    describe('/messages', () => {

        let messageSaved, userTo, userFrom, userError;
        const user03 = { name: 'userTest03', budget: 1 };
        const message01 = { body: 'Message 01' };
        const message02 = { body: 'Message 02 '.repeat(29) };
        const message03 = { body: 'Message 03 ' };

        beforeEach(async () => {
            userTo = await new UsersModel(user01).save();
            userFrom = await new UsersModel(user02).save();
            userError = await new UsersModel(user03).save();
            message01.to = userTo.id;
            message01.from = userFrom.id;
            message02.to = userTo.id;
            message02.from = userFrom.id;
            message03.to = userTo.id;
            message03.from = userError.id;

            messageSaved = await new MessagesModel(message01).save();
        });

        afterEach(() => {
            UsersModel.collection.drop();
            MessagesModel.collection.drop();
        });

        describe('SUCCESS', () => {

            it('GET /messages', async () => {
                const response = await chai.request(HOST_SERVER).get(`/api/messages?to=${userTo.id}`);
                expect(response).to.have.status(200);
                expect(response.body).that.is.an('array').to.have.lengthOf(1);
                const messageResponse = response.body[0];
                validateMessage(messageResponse, messageSaved);
            });

            it('POST /messages', async () => {
                const response01 = await chai.request(HOST_SERVER).post('/api/messages').send(message01);
                expect(response01).to.have.status(200);
                const response02 = await chai.request(HOST_SERVER).post('/api/messages').send(message01);
                expect(response02).to.have.status(200);

                const userFound = await UsersModel.findById(message01.from);
                expect(userFound)
                    .to.have.property('budget')
                    .that.is.a('number')
                    .that.equals(8);
                expect(userFound)
                    .to.have.property('messageSentCount')
                    .that.is.a('number')
                    .that.equals(2);
            });

        });

        describe('ERROR', () => {

            it('Caracteres excedidos', async () => {
                const response = await chai.request(HOST_SERVER).post('/api/messages').send(message02);
                expect(response).to.have.status(500);
                expect(response.body)
                    .that.is.an('object')
                    .to.have.property('message')
                    .that.is.a('string')
                    .that.equals('Quantidade máxima de caracteres permitido excedido. [Máx. 280 caracteres]');
            });

            it('Saldo insuficiente', async () => {
                const response01 = await chai.request(HOST_SERVER).post('/api/messages').send(message03);
                expect(response01).to.have.status(200);
                const response02 = await chai.request(HOST_SERVER).post('/api/messages').send(message03);
                expect(response02).to.have.status(500);
                expect(response02.body)
                    .that.is.an('object')
                    .to.have.property('message')
                    .that.is.a('string')
                    .that.equals(`Usuário '${userError.name}' não possui mais saldos para o envio de mensagens.`);
            });

        });

        const validateMessage = (messageFound, messageTest) => {
            expect(messageFound).that.is.an('object');

            expect(messageFound)
                .to.have.property('id')
                .that.is.a('string')
                .that.equals(messageTest.id);
            expect(messageFound)
                .to.have.property('to')
                .that.is.a('string')
                .that.equals(messageTest.to.toString());
            expect(messageFound)
                .to.have.property('from')
                .that.is.a('string')
                .that.equals(messageTest.from.toString());
            expect(messageFound)
                .to.have.property('sentAt')
                .that.is.a('string');

            expect(moment(messageFound.sentAt).format('YYYY-MM-DD'))
                .that.is.equals(moment().format('YYYY-MM-DD'));
        };

    });

});
