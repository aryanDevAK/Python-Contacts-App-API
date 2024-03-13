import { useState, useEffect } from 'react'
import './App.css'
import ContactList from './components/contactsList'
import CreateContactForm from './components/contactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [openCreateNewContactForm, setOpenCreateNewContactForm] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts")
      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }
      const data = await response.json()
      setContacts(data.contacts)
      console.log(data.contacts)
    } catch (error) {
      console.error('Error fetching contacts:', error.message)
    }
  }

  const openForm = () => {
    if (!openCreateNewContactForm)
      setOpenCreateNewContactForm(true)
  }

  const closeForm = () => {
    setOpenCreateNewContactForm(false)
    setCurrentContact({})
  }

  const openUpdateModal = (contact) => {
    if (openCreateNewContactForm) return
    setCurrentContact(contact)
    setOpenCreateNewContactForm(true)
  }

  const onUpdate = () => {
    closeForm()
    fetchContacts()
  }

  return <>
    <ContactList contacts={contacts} updateContact={openUpdateModal} updateCallBack={onUpdate} />
    <div className="button-container">
        <button onClick={openForm}>Create New Contact</button>
    </div>
    {openCreateNewContactForm && <>
          <div className="backdrop" onClick={closeForm}></div>
          <div className="form-container">
            <span className="close" onClick={closeForm}>&times;</span>
            <CreateContactForm existingContact={currentContact} updateCallBack={onUpdate}/>
          </div>
        </>
    }
  </>
}
export default App
