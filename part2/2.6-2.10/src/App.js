import React, {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '123-456-7890'},
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [filterList, setFilterList] = useState(persons)
    const [search, setSearch] = useState('')

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
            <div>
                filter shown with
                <input value={search} onChange={handleSearch}/>
            </div>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNum} onChange={handleNumChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addNewItem}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {filterList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
            </div> 
        </div>
    )
}

export default App