var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var Downloader = require('mt-files-downloader');
var downloader = new Downloader();
var ProgressBar = require('progress');
var exec = require('child_process').exec;

var PORT = 8009;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/public'));



app.get('/download/:url/:email', function(req, res, next) {
    var url = Buffer.from(req.params.url.split('*').join('/'), 'base64').toString("ascii");
    console.log('GET:', req.params.email + ' - ' + url);
    var randomName = makeid();
    var name = url.split('/').pop();
    var dl = downloader.download(url, 'public/downloads/' + randomName + '.' + name.split('.').pop());
    dl.start();

    var data = dl.getStats();
    var bar = new ProgressBar(name + ' [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 90,
        current: data.total.downloaded,
        total: ((data.total.size != 0) ? data.total.size : 100)
    });


    var int = setInterval(function() {
        var data = dl.getStats();
        if (data.total.size != 0) {
            bar.total = data.total.size;
            if (data.threadStatus.open == 0) {
                clearInterval(int);
            }
        }
        bar.update(data.total.completed / 100);
    }, 500);


    dl.on('end', function(dl) {
        console.log('FINISHED');
        clearInterval(int);
        exec('echo "Your download ' + name + ' has finished.\n Download at full speed: ' +
            req.headers.host + ':' + PORT + '/downloads/' + randomName + '.' + name.split('.').pop() +
            '" |' + 'sendmail ' + req.params.email,
            function(err, stdout, stderr) {
                console.log('Email sent to ' + req.params.email + ' -> Success');
            });

    });
    dl.on('error', function(dl) {
        console.log('ERROR');
        clearInterval(int);
        exec('echo "Your download ' + name + ' has failed.', function(err, stdout, stderr) {
            console.log('Email sent to ' + req.params.email + ' -> Fail');
            console.log('ERR', dl.error);
        });
    });

    res.send('OK');
});



app.get('/clean', function(req, res, next) {
    rmDir('./public/downloads');
    res.send('OK');
});

app.use(function(err, req, res, next) {
    console.log('ERR', err);
    res.status(err.status || 500);
    res.send('Error ');
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '!');
});



function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function rmDir(dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    } catch (e) {
        console.log('ERR', e);
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
}
