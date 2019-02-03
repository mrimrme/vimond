const {httpRequest} = require('../actions');

module.exports = {
    all: (req,res) => {
        let params = {
            host: 'jsonplaceholder.typicode.com',
            method: 'GET',
            path: '/photos'
        };

        httpRequest(params).then(images => {
            res.json(images);
        }).catch(e => {
            console.error(e);
        });
    },
    paginated: (req, res) => {
        let offset = req.params.offset ? parseInt(req.params.offset) : 0;
        let size = parseInt(req.params.size);
        let params = {
            host: 'jsonplaceholder.typicode.com',
            method: 'GET',
            path: '/photos'
        };

        httpRequest(params).then(images => {
            res.json(images.slice(offset,(size+offset)));
        }).catch(e => {
            console.error(e);
        });
    },
}