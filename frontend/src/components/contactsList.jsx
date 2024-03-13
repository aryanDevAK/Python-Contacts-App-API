import React from "react"
import "../componentCSS/contactsList.css"

const ContactList = ({ contacts, updateContact, updateCallBack }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 2) {
                alert("Contact Deleted")
                updateCallBack()
            } else {
                console.log("Failed to Delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return(
    <div className="contact-list"> 
            <h2>Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.key}>
                            <td>{contact.firstName + " " + contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button onClick={() => updateContact(contact)}>Update</button>
                                <button onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
)}

export default ContactList;