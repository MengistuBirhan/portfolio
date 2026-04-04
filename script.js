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

   // --- 2. CONTACT FORM (TELEGRAM FIXED) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // የእርስዎ ትክክለኛ መረጃ
            const token = "8796895419:AAFCS7cDBP2P6ut7osmi71_e7KCZKkXQoMU";
            const chat_id = "7814962463"; // ቁጥሩን ብቻ!
            
            const nameInput = document.getElementById('from_name');
            const emailInput = document.getElementById('user_email');
            const messageInput = document.getElementById('message');

            if (!nameInput || !emailInput || !messageInput) {
                alert("ስህተት፡ በ HTML ውስጥ 'from_name' ወይም 'user_email' የሚሉ IDs አልተገኙም!");
                return;
            }

            const full_message = `🔔 አዲስ መልዕክት:\n\n👤 ስም: ${nameInput.value}\n📧 ኢሜል: ${emailInput.value}\n📝 መልዕክት: ${messageInput.value}`;
            const url = https;//api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(full_message)};

            const btn = contactForm.querySelector('button');
            btn.innerText = 'በመላክ ላይ...';
            btn.disabled = true;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        alert('መልዕክቱ በትክክል ተልኳል!');
                        contactForm.reset();
                    } else {
                        alert('ስህተት፡ ቦቱን ቴሌግራም ላይ "Start" ማለታችሁን አረጋግጡ!');
                    }
                })
                .catch(() => alert('የኢንተርኔት ግንኙነት የለም!'))
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