const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://sergiinebolsin:bQheGDwKjDkq778d@clustersn.ym812zl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSN';
const client = new MongoClient(url);
const dbName = 'sn-fs-db';


let instanceDb = null

async function getDb() {

    if (instanceDb) {
        return instanceDb
    }

    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    instanceDb = client.db(dbName);

    return instanceDb
    // const collection = db.collection('users');

    // const user = await collection.findOne({})

    // return user

    // the following code examples can be pasted here...
}

module.exports = {
    getDb
}