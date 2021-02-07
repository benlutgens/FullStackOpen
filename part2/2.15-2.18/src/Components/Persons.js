import React from 'react'

const Persons = ({filterList, handleDelete}) => {
    return (
        <div>
            {filterList.map(person => 
                <p key={person.id}>
                    {person.name} {person.number}
                    <button id={person.id} onClick={handleDelete}>
                        Delete
                    </button>
                </p>
            )}
        </div> 
    )
}

export default Persons