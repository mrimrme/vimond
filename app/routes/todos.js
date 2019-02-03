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
            let todos = JSON.parse(mCache.get("todos")) || [];
            todos.push(JSON.parse(todo));
            mCache.put("todos", JSON.stringify(todos));
        });
        
        let params = {
            host: 'jsonplaceholder.typicode.com',
            method: 'POST',
            path: '/todos'
        };
        httpRequest(params, todo).then((data) => {
            res.send(data);
        }).catch(e => {
            console.log(e);
        });
    },
}