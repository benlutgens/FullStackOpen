import React from 'react'

const Persons = ({filterList}) => {
    return (
        <div>
            {filterList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div> 
    )
}

export default Persons