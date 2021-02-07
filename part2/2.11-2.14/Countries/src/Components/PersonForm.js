import React from 'react'

const PersonForm = ({newName, handleNameChange, addNewItem, newNum, handleNumChange}) => {
    return (
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
    )
}

export default PersonForm