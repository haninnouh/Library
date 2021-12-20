let expect = require('chai').expect;
var request = require('request')

it('main page', function(done) {
    request('http://localhost:3001',function(err, response,body) {
        expect(body).to.equal('Hello, world!');
        done();
    })
})

it('error page', function(done) {
    request('http://localhost:3001/about',function(err, response,body) {
        expect(response.statusCode).to.equal(404);
        done();
    })
})