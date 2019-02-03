module.exports = {
    ping: (req,res) => {
        res.send("Pong!");
    },
    version: (req, res) => {
        res.send("Node version is: "+process.version); 
    },
    notFound: (req, res) => {
        res.status(404).send("Page not found");
    }
}