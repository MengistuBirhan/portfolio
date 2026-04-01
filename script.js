document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DARK/LIGHT MODE (የተስተካከለ) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if(themeToggle) themeToggle.innerHTML = '☀️ Light Mode'; // innerHTML ተጠቀምን
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '☀️ Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '🌙 Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 2. YEAR UPDATE ---
    const yearElement = document.getElementById("year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // --- 3. CONTACT FORM (Telegram - የተስተካከለ) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const token = "7985126768:AAFxM4CGu6HTESZEMEBBH_MBU3mRMszSWek";
            const chat_id = "1494064754";
            
            const nameInput = document.getElementById('from_name');
            const emailInput = document.getElementById('user_email');
            const messageInput = document.getElementById('message');

            // እዚህ ጋር || (OR) ምልክት ተስተካክሏል
            if(!nameInput || !emailInput || !messageInput) {
                alert("Error: Form IDs not found!");
                return;
            }

            // እዚህ ጋር Backticks () ተስተካክለዋል
            const full_message = `🔔 አዲስ መልዕክት ከፖርትፎሊዮዎ:\n\n👤 ስም: ${nameInput.value}\n📧 ኢሜል: ${emailInput.value}\n📝 መልዕክት: ${messageInput.value}`;
            const url = https;//api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(full_message)}`;

            const btn = contactForm.querySelector('button');
            btn.innerText = 'Sending...';
            btn.disabled = true;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        alert('Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else { alert('Something went wrong.'); }
                })
                .catch(() => alert('Connection error.'))
                .finally(() => {
                    btn.innerText = 'Send Message';
                    btn.disabled = false;
                });
        });
    }

    // --- 4. HIRE ME MODAL LOGIC ---
    const hireBtn = document.getElementById("hireMeBtn");
    const modal = document.getElementById("hireModal");
    const closeBtn = document.querySelector(".close-btn");

    if (hireBtn && modal) {
        hireBtn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
        };

        if(closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = "none";
            };
        }

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }
});