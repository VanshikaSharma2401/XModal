import React, { useState,useEffect,useRef } from 'react';

function XModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const modalRef = useRef();
    useEffect(() => {
        // Add event listener to close modal when clicking outside
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        // Clear input fields and error message
        setUsername('');
        setEmail('');
        setDob('');
        setPhone('');
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!username || !email || !dob || !phone) {
            setError('Please fill out all fields.');
            return;
        }

        if (!email.includes('@')) {
            setError(`Please include an '@' in the email address ${email} is missing an '@'.`);
            alert("Invalid email. Please check your email address.");
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            alert('Invalid phone number. Please enter a 10-digit phone number.');
            return;
        }

        const today = new Date();
        const inputDate = new Date(dob);
        if (inputDate > today) {
            setError('Invalid date of birth. Date of birth can not be in the future');
            return;
        }

        // Submit logic here if validation passes
        // For simplicity, just closing the modal
        closeModal();
    };

    return (
        <div className='modal'>
            <button onClick={openModal}>Open Form</button>
            {isOpen && (
                <div ref={modalRef} className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Modal Form</h2>
                        <form onSubmit={handleSubmit} data-testid="modal-form">
                            <input type="text" required placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                            <input type="email" required id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="date" required id="dob" placeholder="Date of Birth" value={dob} onChange={e => setDob(e.target.value)} />
                            <input type="tel" required id="phone" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
                            {error && <div className="error">{error}</div>}
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default XModal;
