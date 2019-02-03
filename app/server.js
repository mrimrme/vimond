const express = require("express");
const helmet = require('helmet');
const mCache = require('memory-cache');

const main = require('./routes/main');
const images = require('./routes/images');
const users = require('./routes/users');
const todos = require('./routes/todos');
const app = express();


var cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mCache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mCache.put(key, body, duration * 1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

app.use(helmet());
app.set('json spaces', 2);


app.get("/ping", cache(10), main.ping);
app.get("/version", cache(10), main.version);
app.get("/images", cache(10), images.all);
app.get("/images/:size/:offset", cache(10), images.paginated);
app.get("/Nicolas", cache(10), users.nicolas);
app.get("/Romaguera", cache(10), users.romaguera);
app.get("/sorted-users", cache(10), users.sorted);
app.get("/new-todos", todos.all);
app.post("/todo", todos.storeTodo);


app.all('*', main.notFound);


var server = app.listen(8040, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});