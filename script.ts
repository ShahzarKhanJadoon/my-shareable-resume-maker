const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display") as HTMLElement;
const resumeContent = document.getElementById("resume-content") as HTMLElement;
const downloadPdfButton = document.getElementById("pdf-download-btn") as HTMLButtonElement;
const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;

let currentResumeData: { name: string; username: string; email: string; phone: string; education: string; experience: string; skills: string } | null = null;

form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    currentResumeData = { name, username, email, phone, education, experience, skills };

    const resumeHTML = `
        <div class="resume-section" contenteditable="true">
            <h3>Personal Information</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
        </div>
        <div class="resume-section" contenteditable="true">
            <h3>Education Background</h3>
            <p>${education}</p>
        </div>
        <div class="resume-section" contenteditable="true">
            <h3>Professional Experience</h3>
            <p>${experience}</p>
        </div>
        <div class="resume-section" contenteditable="true">
            <h3>Core Skills</h3>
            <p>${skills}</p>
        </div>
    `;

    resumeContent.innerHTML = resumeHTML;

    resumeDisplay.classList.remove("hidden");
    downloadPdfButton.classList.remove("hidden");

    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    shareableLinkContainer.style.display = "block";

    form.reset();
});

downloadPdfButton.addEventListener("click", () => {
    window.print();
});

window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username) {
        resumeContent.innerHTML = `
            <div class="resume-section" contenteditable="true">
                <h3>Personal Information</h3>
                <p><b>Username:</b> ${username}</p>
            </div>
        `;
        resumeDisplay.classList.remove("hidden");
    }
});
