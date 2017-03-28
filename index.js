
var fs = require('fs');

function appendObject(obj){
    var config;
    var apifilePath = "./api-postman.json";
    try {
        console.log("********************* TRY *********************");
        var configFile = fs.readFileSync(apifilePath);
        config = JSON.parse(configFile);

        var copy =  Object.assign(config, obj);
        var configJSON = JSON.stringify(config, null, 4);
        fs.writeFileSync(apifilePath, configJSON);
    } catch(e){

        console.log("********************* CATCH *********************");

        var copy =  Object.assign({}, obj);

        var configJSON = JSON.stringify(copy , null, 4);

        fs.writeFileSync(apifilePath, configJSON);
    }


}

function constructPostmanObj (data){
    var options = {
        url: data.uri,
        method: data.method
    };

    if(data.method == 'POST') {
        options.body = {
            mode: "raw",
            raw: data.body
        };
    }

    var uniqueKey = `${data.uri}_${data.method}`;

    var optionsObj = {};

    optionsObj[uniqueKey] =  options;

    appendObject(optionsObj);
}

//Uncomment below code to make it work with actual code install request and request-debug
/*

var request = require('request');
require('request-debug')(request, function(type, data, r) {
        // put your request or response handling logic here
        if(type === 'request') {
          constructPostmanObj(data);
        }
});
*/


//Dummy array to simular request-debug
var requestArr = [{
    debugId: 25,
    uri: 'https://localhost/api/one',
    method: 'GET',
    headers: {
        Authorization: 'Basic 123456',
        'Content-Type': 'application/json; charset=utf-8',
        host: 'localhost',
        accept: 'application/json'
    }
},{
    debugId: 11,
    uri: 'https://localhost/api/two',
    method: 'POST',
    headers: {
        Authorization: 'Basic 123456',
        'Content-Type': 'application/json; charset=utf-8',
        host: 'localhost',
        accept: 'application/json',
        'content-length': 25
    },
    body: '{"page":"0","size":"500"}'
},{
    debugId: 25,
    uri: 'https://localhost/api/one',
    method: 'GET',
    headers: {
        Authorization: 'Basic 123456',
        'Content-Type': 'application/json; charset=utf-8',
        host: 'localhost',
        accept: 'application/json'
    }
},{
    debugId: 11,
    uri: 'https://localhost/api/two',
    method: 'POST',
    headers: {
        Authorization: 'Basic 123456',
        'Content-Type': 'application/json; charset=utf-8',
        host: 'localhost',
        accept: 'application/json',
        'content-length': 25
    },
    body: '{"page":"0","size":"500"}'
}];



requestArr.forEach(function(data, index){

    constructPostmanObj(data);

});

