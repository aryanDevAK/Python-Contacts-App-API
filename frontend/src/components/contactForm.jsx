import React from "react";
import { useState } from "react";
import "../componentCSS/form.css"

const CreateContactForm = ({existingContact= {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0

    const submitForm = async (e) => {
        e.preventDefault()

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contacts/${existingContact.id}` : 'create_contacts')
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options);
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message);
        } else {
            //Success
            alert(updating ? "Contact Updated" : "Contact Created")
            updateCallback()
        }
    }

    return (
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="firstName">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            <button type="submit">{updating ? "Update" : "Create Contact"}</button>
            </form>
    )
}

export default CreateContactForm ;