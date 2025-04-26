// Client-side routing
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

function router() {
    const hash = window.location.hash || '#home';
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelector(hash).classList.add('active');
}

// Form validation + POST to server
const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Frontend Validation
    if (username.length < 3) {
        formMessage.textContent = 'Username must be at least 3 characters.';
        formMessage.style.color = 'red';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.textContent = 'Invalid email address.';
        formMessage.style.color = 'red';
        return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
        formMessage.textContent = 'Password too weak.';
        formMessage.style.color = 'red';
        return;
    }

    // Submit to server
    try {
        const res = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.text();

        if (res.ok) {
            formMessage.textContent = data;
            formMessage.style.color = 'green';
            form.reset();
        } else {
            formMessage.textContent = data;
            formMessage.style.color = 'red';
        }
    } catch (err) {
        formMessage.textContent = 'Server Error!';
        formMessage.style.color = 'red';
    }
});
