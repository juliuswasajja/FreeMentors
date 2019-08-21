import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'


chai.should();
chai.use(chaiHttp);

describe('All routes checker', () =>{
    it('Should check the landing url', (done) =>{
        chai
            .request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Welcome to FreeMentor');
                done();
            });
    });
    it('Should check the landing url', (done) =>{
        chai
            .request(app)
            .get('/api/v1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Welcome to FreeMentor');
                done();
            });
    });
    it('should signup a new user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                "firstName": "Davies",
                "lastName": "Wabuluka",
                "email": "two@test.com",
                "password": "test123",
                "address": "nalumunye",
                "bio": "a good man",
                "occupation": "teacher",
                "expertise": "cooking"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
    it('A user can not create two accounts with same email', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                "firstName": "Davies",
                "lastName": "Wabuluka",
                "email": "two@test.com",
                "password": "test123",
                "address": "nalumunye",
                "bio": "a good man",
                "occupation": "teacher",
                "expertise": "cooking"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('should login a user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "two@test.com",
                "password": "test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('login user not found', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "twothree@test.com",
                "password": "test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
    it('login is denied', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "two@test.com",
                "password": "test1231"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('should signup a new admin', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":"test@admin.com",
	            "password":"test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('User already created', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":"test@admin.com",
	            "password":"test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
})

