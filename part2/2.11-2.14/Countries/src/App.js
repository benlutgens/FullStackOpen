import React, {useEffect, useState} from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
    

    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '123-456-7890'},
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
    ])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filterList, setFilterList] = useState(persons)
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
        .then(response => {
        setPersons(response.data)
        setFilterList(response.data)
        })
    }, [])
    

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }

    const handleSearch = (event) => {
        let thisSearch = event.target.value
        if (thisSearch.length === 0) {
            setFilterList(persons)
        } else {
            let list = persons.filter(person => person.name.toLowerCase().includes(thisSearch.toLowerCase()))
            setFilterList(list)
        }
        setSearch(thisSearch)
    }

    const addNewItem = (event) => {
        event.preventDefault()
        if (checkUnique() && newName.length !== 0 && newNum.length !== 0) {
            let newList = persons.concat({name: newName, number: newNum})
            setPersons(newList)
            setFilterList(newList)
            setNewName('')
            setNewNum('')
            setSearch('')
        } else {
            alert(`${newName} is already added to the phonebook`)
        }
        
    }

    const checkUnique = () => {
        const matchName = persons.filter(person => person.name === newName)
        const matchNum = persons.filter(person => person.number === newNum)
        if (matchName.length !== 0 || matchNum.length !== 0) {
            return false
        }
        return true
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearch={handleSearch} />
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} addNewItem={addNewItem}/>
            <h2>Numbers</h2>
            <Persons filterList={filterList}/>
        </div>
    )
}

export default App