const { MongoClient } = require('mongodb');

const url = 'mongodb+srv: //marckrocha020_db_user:<db_password>@cluster1.vcdbcqp.mongodb.net/'

const client = new MongoClient(url);

     async function conectarDb() {
         await client.connect();
         return client.db('agenda');
     }
module.exports = { conectarDb };