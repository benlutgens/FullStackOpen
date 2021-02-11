const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Pass only pw for full phoneList, otherwise "node mongo.js <password> <name> <number> to add a person')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Ben:${password}@fsocluster.wkqfy.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


const addNew = (name, num) => {

    console.log('inside add new')

    const newPerson = new Person({
        name: name,
        number: num
    })

    newPerson.save()
    .then(result => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
    .catch(error => {
        console.log(`${error}`)
})

}

const displayAll = () => {
    console.log('inside displayAll')

    Person.find({})
    .then(result => {
        console.log('phonebook: ')
        result.forEach(person => {
            console.log(person)
        })
    mongoose.connection.close()
    })
    .catch(error => {
        console.log(`${error}`)
    })
}


if (process.argv.length === 3) {
    //display all database objects
    displayAll()
} else if (process.argv.length === 5) {
    // add a new object to database
    const name = process.argv[3]
    const num = process.argv[4]
    addNew(name, num)
} else {
    console.log('did not understand request')
}







