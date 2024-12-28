const PersonForm = ({addPerson, newName, handleChange, handleNumber, newNumber}) => {
    return(
    <form onSubmit={addPerson}>
            
            <div>
              name: 
              <input 
              value={newName}
              onChange={handleChange}
              />
            </div>
    
            <div>number: 
              <input 
              value={newNumber} 
              onChange={handleNumber}
              />
            </div>
    
            <div>
              <button type="submit">add</button>
            </div>
          </form>
    )
    }

export default PersonForm