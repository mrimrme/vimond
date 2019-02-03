const mCache = require('memory-cache');
const {httpRequest} = require('../actions');

module.exports = {
    all: (req,res) => {
        let todos = mCache.get("todos");
        res.json(JSON.parse(todos));
    },
    storeTodo: (req,res) => {
        let todo = '';
        req.on('data', chunk => {
            todo += chunk.toString();
        });
        req.on('end', () => {
            todo = todo.toString("utf-8");
            let todos = mCache.get("todos") ? JSON.parse(mCache.get("todos")) : [];
            try {
                todo = JSON.parse(todo);
            } catch(err) {
                res.status(400).send("could not parse json");
            }
            todos.push(todo);
            mCache.put("todos", JSON.stringify(todos));
        });
        
        let params = {
            host: 'jsonplaceholder.typicode.com',
            method: 'POST',
            path: '/todos'
        };
        httpRequest(params, todo).then((data) => {
            res.json(data);
        }).catch(e => {
            console.log(e);
        });
    },
}