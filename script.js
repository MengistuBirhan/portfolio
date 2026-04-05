document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DARK/LIGHT MODE (የተስተካከለ) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // መጀመሪያ የተቀመጠ ጭብጥ ካለ መፈተሽ
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if(themeToggle) themeToggle.innerHTML = '☀️ Light Mode';
    } else {
        if(themeToggle) themeToggle.innerHTML = '🌙 Dark Mode';
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


   // --- 3. CONTACT FORM (FORMSPREE FIXED) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const btn = contactForm.querySelector('button');
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // መረጃውን በቀጥታ ከፎርሙ መሰብሰብ
        const formData = new FormData(contactForm);

        fetch(contactForm.getAttribute('action'), { // action-ን እዚህ ጋር ያገኘዋል
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!!');
                contactForm.reset();
            } else {
                alert('Error: Formspree could not receive the message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Network error! Please check your internet connection or try again later.');
        })
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