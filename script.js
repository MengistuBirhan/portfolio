document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DARK/LIGHT MODE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if(themeToggle) themeToggle.textContent = '☀️ Light Mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                themeToggle.textContent = '☀️ Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 2. Year Adjustment ---
    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // --- 3. Telegram Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const token = "7985126768:AAFxM4CGu6HTESZEMEBBH_MBU3mRMszSWek";
            const chat_id = "1494064754";
            
            const nameInput = document.getElementById('from_name');
            const emailInput = document.getElementById('user_email');
            const messageInput = document.getElementById('message');

            if(!nameInput || !emailInput || !messageInput) {
                alert("Error: IDs 'from_name', 'user_email' or 'message' not found in HTML!");
                return;
            }

            const name = nameInput.value;
            const email = emailInput.value;
            const message = messageInput.value;

            const full_message = `🔔 አዲስ መልዕክት ከፖርትፎሊዮዎ:\n\n👤 ስም: ${name}\n📧 ኢሜል: ${email}\n📝 መልዕክት: ${message}`;
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(full_message)}`;

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        alert('Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else {
                        alert('Something went wrong. Please try again later.');
                    }
                })
                .catch(() => {
                    alert('Connection error. Please check your internet.');
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
});
