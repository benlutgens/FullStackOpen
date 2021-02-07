import React, {useEffect, useState} from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import personService from './Services/personService'
import pService from './Services/personService'

const App = () => {
    

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filterList, setFilterList] = useState(persons)
    const [search, setSearch] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState('error')

    useEffect(() => {
        pService.getAll()
        .then(initialList => {
            setPersons(initialList)
            setFilterList(initialList)
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

    const handleDelete = (event) => {
        let deleteId = parseInt(event.target.id)
        if (window.confirm(`Delete ${persons.find(person => person.id === deleteId).name}?`)) {
            personService
            .remove(deleteId)
            .then(status => {
                    let deleteList = persons.filter(item => item.id !== deleteId)
                    setFilterList(deleteList)
                    setPersons(deleteList)
                    setNewName('')
                    setNewNum('')
                    setSearch('')
                    notify('success', `Successfully deleted`)
                })
            .catch(error => {
                notify('error', 'Could not delete')
            })
        } 
    }

    const checkDuplicate = () => {
        let thisMatch = persons.find(person => person.name === newName)
        console.log(thisMatch)
        if (thisMatch !== undefined) {
            return true
        }
        return false
    }

    const notify = (type, message) => {
        setNotification(message)
        setNotificationType(type)
        setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
        }, 5000)
    }

    const addNewItem = (event) => {
        event.preventDefault()
        let update = false
        let thisPerson = {
            name: newName,
            number: newNum
        }
        if (checkDuplicate()) {
            update = window.confirm(`${newName} already exists, replace the old number with a new one?`)
        }
        if (update) {
            thisPerson = persons.find(person => person.name === newName)
            thisPerson.number = newNum
            pService
                .update(thisPerson.id, thisPerson)
                .then(updatedPerson => {
                    let newList = persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson)
                    setPersons(newList)
                    setFilterList(newList)
                    setNewName('')
                    setNewNum('')
                    setSearch('')
                    notify('success', `Updated ${updatedPerson.name} successfully`)
                })
                .catch(error => {
                    notify('error', `Could not update ${thisPerson.name}`)
                })
        } else {
            pService
            .create(thisPerson)
            .then(newPerson => {
                let newList = persons.concat(newPerson)
                setPersons(newList)
                setFilterList(newList)
                setNewName('')
                setNewNum('')
                setSearch('')
                notify('success', `successfully added ${newPerson.name}`)
            }).catch(error => {
                notify('error', `could not add ${thisPerson.name} to database`)
            })
        }  

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} type ={notificationType}/>
            <Filter search={search} handleSearch={handleSearch} />
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} addNewItem={addNewItem}/>
            <h2>Numbers</h2>
            <Persons filterList={filterList} handleDelete={handleDelete}/>
        </div>
    )
}

export default App