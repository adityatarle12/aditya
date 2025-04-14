// Initialize EmailJS
emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS User ID

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Fetch GitHub Repositories
const projectList = document.getElementById("project-list");
const githubUsername = "adityatarle12";

async function fetchRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
        const repos = await response.json();
        projectList.innerHTML = repos.slice(0, 6).map(repo => `
            <div class="project-card">
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            </div>
        `).join("");
    } catch (error) {
        projectList.innerHTML = "<p>Failed to load projects.</p>";
        console.error("Error fetching repos:", error);
    }
}

fetchRepos();

// Contact Form Submission
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        message: message
    }).then(() => {
        formMessage.textContent = "Message sent successfully!";
        formMessage.style.color = "green";
        contactForm.reset();
    }).catch((error) => {
        formMessage.textContent = "Failed to send message. Try again.";
        formMessage.style.color = "red";
        console.error("EmailJS error:", error);
    });
});

// Scroll Animations
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));