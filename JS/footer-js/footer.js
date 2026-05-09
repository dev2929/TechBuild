document.addEventListener('DOMContentLoaded', () => {
    // Select the form
    const form = document.getElementById('emailForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const email = document.getElementById('eid').value;

        if(email) {
            alert(`Thank you! Your email (${email}) has been sent.`);
            form.reset(); // Optional: clears the input field
        } else {
            alert("Please enter a valid email.");
        }
    });
});
