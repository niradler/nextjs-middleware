const express = require('express')
const NextMiddleware = require('../index');
const main = async() => {
    try {
        const debug = true;
        const nextMiddleware = await NextMiddleware(debug); // make sure next prepare finish.
        const server = express();
        server.use(nextMiddleware);
        server.get('/', async(req, res) => {
            return res
                .view
                .handle({});
        })
        server.get('/example', async(req, res) => {
            if (!req.parsedUrl.query.page) {
                return res.redirect('/example?page=2');
            }
            return res
                .view
                .render({req,res,path:'/examplePage',query:req.parsedUrl.query});
        })

        server.listen(3000, (err) => {
            if (err) 
                throw err
            console.log('> Ready on http://localhost:3000');
        })
    } catch (error) {
        console.log({error})
    }
}

main();