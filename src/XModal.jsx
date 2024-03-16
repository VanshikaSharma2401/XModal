import React, { useState } from 'react';

function XModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        // Clear input fields and error message
        setUsername('');
        setEmail('');
        setDob('');
        setPhone('');
        setError('');
    };

    const handleSubmit = () => {
        if (!username || !email || !dob || !phone) {
            setError('Please fill out all fields.');
            return;
        }

        if (!email.includes('@')) {
            setError('Invalid email. Please check your email address.');
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            setError('Invalid phone number. Please enter a 10-digit phone number.');
            return;
        }

        const today = new Date();
        const inputDate = new Date(dob);
        if (inputDate > today) {
            setError('Invalid date of birth. Please enter a past date.');
            return;
        }

        // Submit logic here if validation passes
        // For simplicity, just closing the modal
        closeModal();
    };

    return (
        <div>
            <button onClick={openModal}>Open Form</button>
            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Modal Form</h2>
                        <input type="text" required placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        <input type="text" required id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="date" required id="dob" placeholder="Date of Birth" value={dob} onChange={e => setDob(e.target.value)} />
                        <input type="text" required id="phone" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
                        {error && <div className="error">{error}</div>}
                        <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default XModal;
