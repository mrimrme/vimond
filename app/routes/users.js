const {
    httpRequest,
    getUser,
    getUserPosts} = require('../actions');

module.exports = {
    nicolas: (req,res) => {
        let output = {user:{}, posts:[]};
    
        let userRequest = getUser(8).then(user =>{
            output.user = user;
        }).catch(e => {
            console.error(e);
        });
       
        let postsRequest = getUserPosts(8).then(posts => {
            output.posts = posts;
        }).catch(e => {
            console.error(e);
        });
        Promise.all([userRequest, postsRequest]).then(()=>{
            res.json(output);
        });
    },
    romaguera: (req, res) => {
        let output = {posts:[]};
        let romagueraUsers = [];
        let params = {
            host: 'jsonplaceholder.typicode.com',
            method: 'GET',
            path: '/users'
        };

        let userRequest = httpRequest(params).then(users => {
            romagueraUsers = users.filter(user => {
                return (user.company.name.indexOf("Romaguera") != -1);
            });
            
            let postRequests = [];
            for (let i in romagueraUsers) {
                userId = parseInt(romagueraUsers[i].id);
                let postRequest = getUserPosts(userId).then(posts =>{
                    output.posts = output.posts.concat(posts);
                }).catch(e => {
                    console.error(e);
                });
                postRequests.push(postRequest);
            }
            Promise.all(postRequests).then(()=>{
                res.json(output);
            }).catch(e => {
                console.error(e);
            });
        }).catch(e => {
            console.error(e);
        });
    },
    sorted: (req, res) => {
        let params = {
            host: 'jsonplaceholder.typicode.com',
            method: 'GET',
            path: '/users'
        };
        httpRequest(params).then((users) => {
            let pattern = /\.(com|net|org)$/;
            users = users.filter(user => {
                return !pattern.test(user.website);
            });
            users = users.sort((a,b) => {
                return (a.address.city  > b.address.city) ? 1 : -1;
            });
            res.send(users);
        }).catch(e => {
            console.error(e);
        });
    }
}