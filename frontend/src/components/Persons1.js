import personService from '../services/persons'

const Persons = ({persons, same, setPersons}) => {
    return(  
    <div>
          {persons.filter((person)=>{
            return same.toLowerCase() === '' ? person : person.name.toLowerCase().includes(same.toLowerCase())
          }).map(person=>
            <p key={person.id}>{person.name} {person.number}<button onClick={() => {
              if (window.confirm(`Delete ${person.name}`)) {
                personService
                  .remove(person.id)
                  .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                  })     
              }
            }}>Delete</button></p>
          )}   
    </div>
    )
    }

export default Persons    