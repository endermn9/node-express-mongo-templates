

const { MongoClient } = require("mongodb");
require('dotenv').config();

class Petservice {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI);
        this.database = this.client.db('animals');

    }

    async getpets() {
        const collection = this.database.collection('pet');
        const result = collection.find().toArray();
        return result
    }
    async getspeciespets() {
        const colletion = this.database.collection('pet');
        const result = await colletion.aggregate([{
            $lookup: {
                from: 'specie',
                localField: 'id_specie',
                foreignField: 'id_specie',
                as: 'specie_details',
            }
        }]).toArray();
        return result;
    }
    async insertpet() {
        const testcounter = await this.counter();
        const collection = this.database.collection('pet');
        const result = collection.insertOne({
            id_pet : testcounter.seq_value,
            name :"Firulais",
            id_specie:13

        })
        return result
    }
    async counter() {
        const collection = this.database.collection('counters');
        const result = await collection.findOneAndUpdate(
            { _id: 'petcount' }, 
            { $inc: { seq_value: 1 }}
            )
        return result.value
    }
}
module.exports = Petservice;