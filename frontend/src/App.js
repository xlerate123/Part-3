import { useState, useEffect } from 'react'
import './App.css';
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons1'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  useEffect(() => {
     personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [same, setSame] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
 
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    
    
      if(persons.some(person => person.name===newName)){
        const existing =persons.find((person) => person.name === newName)
        if(window.confirm(`${newName} is already to the phonebook, replace the old number with a new one?`)){
        const updated = {...existing, number:newNumber}

        personService
        .update(existing.id,updated)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existing.id ? returnedPerson : person
            )
          )
         
          setNewName(''); 
          setNewNumber('');
          setMessage(`Added ${newNumber} for ${existing.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

        .catch((error) => {
          setErrorMessage(
            `'${existing.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== existing.id))
        })

        
      }}
      else if(newName===''){
        alert("enter name")
      }
      else{
      personService
      .create(nameObject)
      .then((returnedName) => {
        setPersons(persons.concat(returnedName))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const filterName = (event) => {
    setSame(event.target.value)
  }
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMsg={errorMessage}/>
      <Filter same={same} filterName={filterName}/>
      
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} handleChange={handleChange} handleNumber={handleNumber} newName={newName} newNumber={newNumber} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} same={same} setPersons={setPersons}  />
   
      
    </div>
  )

  
}



export default App;
