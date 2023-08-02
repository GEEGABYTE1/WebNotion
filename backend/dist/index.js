var express = require('express');
var app = express();
var cors = require('cors');
// router import
var notionRouter = require('./routes/notion');
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use('/notion', notionRouter);
var port = 3001;
app.listen(port, function () { return [
    console.log("Express Listening: ", port)
]; });
//# sourceMappingURL=index.js.map