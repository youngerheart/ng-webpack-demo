var express = require('express');

var app = express();

// 静态资源
app.use('/static/', express.static(__dirname));

// 主站的 layout
app.use(/^(?!\/static\/)/,function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(2333);

console.log('请访问localhost:2333');
