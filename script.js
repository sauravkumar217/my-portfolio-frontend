// script.js

// Add skeleton loading control
document.body.classList.add('loading'); // Start with loading state

function hideSkeleton() {
    const skeleton = document.querySelector('.skeleton');
    if (skeleton) {
        skeleton.classList.add('hidden');
    }
    document.body.classList.remove('loading');
}

// Hide skeleton when page is fully loaded (including images)
window.addEventListener('load', () => {
    hideSkeleton();
});

// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Note: Removed the skills progress bar code since your CSS handles widths directly
// If you want to use data-width attributes instead, let me know!

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    const messageDiv = document.getElementById('form-message');
    
    // Show loading spinner
    messageDiv.innerHTML = '<div class="loader"></div>';
    messageDiv.className = 'form-message'; // Reset classes

    fetch('/api/contact/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        // Success message in green
        messageDiv.textContent = result; // e.g., "Email sent successfully!"
        messageDiv.className = 'form-message success';
        this.reset(); // Reset form
        setTimeout(() => {
            messageDiv.textContent = ''; // Clear message after 3 seconds
        }, 3000);
    })
    .catch(error => {
        // Error message in red
        messageDiv.textContent = 'Failed to send email. Please try again.';
        messageDiv.className = 'form-message error';
        console.error('Error:', error);
        setTimeout(() => {
            messageDiv.textContent = ''; // Clear message after 3 seconds
        }, 3000);
    });
});