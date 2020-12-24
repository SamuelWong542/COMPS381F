const express = require('express')
const app = express()

app.get('/api/restaurant/:name', (req,res) => {
    if (req.parma.name){
        let criteria={};
        criteria['name'] = req.params.name;
        const client = new MongoClient(mongourl);
        client.connect((err) => {
            assert.equal(null,err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);

            findDocument(db, criteria, (docs)=>{
                client.close();
                console.log("Close DB connection");
                res.status(200).json(docs);
            })
        })


    }else{
        res.status(500).json({"error": "missing name"})
    }
})

app.listen(process.env.PORT || 8099)