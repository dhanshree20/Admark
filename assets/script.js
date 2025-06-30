document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html");

    // Observe changes and initialize features once header/footer loads
    const observer = new MutationObserver(() => {
        setupDropdowns();
        setupMobileMenu(); // ✅ Re-initialize after header loads
        setupScrollToTop();
        setupContactForm();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

// FUNCTION TO LOAD HEADER & FOOTER DYNAMICALLY
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (elementId === "header") setupMobileMenu(); // ✅ Ensure Mobile Menu works after load
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// FUNCTION TO HANDLE MOBILE MENU TOGGLE (HAMBURGER MENU)
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mainMenu = document.querySelector(".main-menu");

    if (!mobileMenuBtn || !mainMenu) return;

    // ✅ Remove previous event listeners before adding new ones
    mobileMenuBtn.removeEventListener("click", toggleMenu);
    mobileMenuBtn.addEventListener("click", toggleMenu);

    document.removeEventListener("click", closeMenuOnOutsideClick);
    document.addEventListener("click", closeMenuOnOutsideClick);

    function toggleMenu(e) {
        e.stopPropagation();
        mainMenu.classList.toggle("show");
    }

    function closeMenuOnOutsideClick(e) {
        if (!mainMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mainMenu.classList.remove("show");
        }
    }
}

// FUNCTION TO HANDLE DROPDOWN MENU
function setupDropdowns() {
    const isMobile = window.innerWidth <= 768;

    document.querySelectorAll(".panel-dropdown").forEach(dropdown => {
        const submenu = dropdown.querySelector(".dropdown-panel");

        if (!submenu) return;

        submenu.style.display = "none";

        if (isMobile) {
            dropdown.addEventListener("click", function (e) {
                e.stopPropagation();
                closeAllDropdowns();
                toggleDropdown(submenu);
            });
        } else {
            dropdown.addEventListener("mouseenter", () => showDropdown(submenu));
            dropdown.addEventListener("mouseleave", () => hideDropdown(submenu));
        }
    });

    document.addEventListener("click", closeAllDropdowns);
}

// SHOW & HIDE DROPDOWNS
function showDropdown(submenu) {
    submenu.style.display = "block";
}

function hideDropdown(submenu) {
    submenu.style.display = "none";
}

// FUNCTION TO CLOSE ALL DROPDOWNS
function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-panel").forEach(submenu => {
        submenu.style.display = "none";
    });
}

// FUNCTION TO TOGGLE DROPDOWN (MOBILE)
function toggleDropdown(submenu) {
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

// FUNCTION TO SHOW/HIDE SCROLL TO TOP BUTTON
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTop");
    if (!scrollToTopBtn) return;

    scrollToTopBtn.style.display = "none";

    window.addEventListener("scroll", function () {
        scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// SLIDESHOW FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.querySelectorAll(".slide");
        const dots = document.querySelectorAll(".dot");

        slides.forEach(slide => (slide.style.display = "none"));
        dots.forEach(dot => dot.classList.remove("active"));

        slideIndex = (slideIndex + 1) % slides.length;

        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("active");

        setTimeout(showSlides, 5000);
    }

    window.currentSlide = function (n) {
        slideIndex = n - 1;
        showSlides();
    };
});

// HANDLE DROPDOWN BEHAVIOR ON RESIZE
window.addEventListener("resize", () => {
    setupDropdowns();
    if (window.innerWidth > 768) {
        document.querySelector(".main-menu")?.classList.remove("show");
    }
});

// FUNCTION TO SET UP CONTACT FORM
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    // Remove any previous event listeners
    contactForm.removeEventListener("submit", handleFormSubmit);
    contactForm.addEventListener("submit", handleFormSubmit);
});

// FUNCTION TO HANDLE FORM SUBMISSION
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // ✅ Google Form Action URL
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfvgBtlywPrt8U2B-tcWF9XJ6KeaGMcVTIskdfVehGPEJv1RA/formResponse";

    // ✅ Google Form Entry IDs
    const formData = new FormData();
    formData.append("entry.856552114", name); // Name Field
    formData.append("entry.416083448", email); // Email Field
    formData.append("entry.533288431", message); // Message Field

    // Submit data using fetch
    fetch(googleFormURL, {
        method: "POST",
        body: formData,
        mode: "no-cors" // Allows cross-origin submission
    }).then(() => {
        alert("Thank you! Your message has been submitted successfully.");
        document.getElementById("contactForm").reset(); // Reset form
    }).catch(error => console.error("Error:", error));
}

// Accordion Functionality
document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
        const accordionItem = button.parentElement;

        // Close all other accordion sections
        document.querySelectorAll(".accordion-item").forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove("active");
                item.querySelector(".accordion-content").style.display = "none";
            }
        });

        // Toggle clicked section
        if (accordionItem.classList.contains("active")) {
            accordionItem.classList.remove("active");
            button.nextElementSibling.style.display = "none";
        } else {
            accordionItem.classList.add("active");
            button.nextElementSibling.style.display = "block";
        }
    });
});
