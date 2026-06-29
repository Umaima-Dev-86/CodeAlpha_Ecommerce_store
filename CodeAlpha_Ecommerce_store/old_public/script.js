document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Default reload ko rokne ke liye

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    // Button status loading karne ke liye
    submitBtn.innerHTML = `<span>Registering...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    try {
        // Hamaare backend route par POST request bhejna
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok || data.success) {
            // Success State
            messageDiv.textContent = "✨ Welcome aboard! Account created successfully.";
            messageDiv.className = "toast-message success";
            document.getElementById('signupForm').reset(); // Form clear karne ke liye
        } else {
            // Server error handle karne ke liye
            messageDiv.textContent = `❌ ${data.message || 'Registration failed.'}`;
            messageDiv.className = "toast-message error";
        }
    } catch (error) {
        // Network error handler
        messageDiv.textContent = "📡 Server is unreachable. Please check connection!";
        messageDiv.className = "toast-message error";
    } finally {
        // Button ko wapas normal state mein lana
        submitBtn.innerHTML = `<span>Get Started</span> <i class="fa-solid fa-arrow-right"></i>`;
        submitBtn.disabled = false;
    }
});