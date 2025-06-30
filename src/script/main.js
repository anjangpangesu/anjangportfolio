// Portfolio Data in JSON format - These will be loaded from separate JSON files
let portfolioData = {};

// Function to fetch JSON data
async function fetchPortfolioData() {
    try {
        const [
            skillsRes,
            educationRes,
            certificationsRes,
            experienceRes,
            organizationsRes,
            projectsRes,
        ] = await Promise.all([
            fetch("Asset/data/skills.json"),
            fetch("Asset/data/education.json"),
            fetch("Asset/data/certif.json"),
            fetch("Asset/data/works.json"),
            fetch("Asset/data/org.json"),
            fetch("Asset/data/projects.json"),
        ]);

        portfolioData.skills = await skillsRes.json();
        portfolioData.education = await educationRes.json();
        portfolioData.certifications = await certificationsRes.json();
        portfolioData.experience = await experienceRes.json();
        portfolioData.organizations = await organizationsRes.json();
        portfolioData.projects = await projectsRes.json();

        // Populate content after data is fetched
        populateSkills();
        populateEducation();
        populateCertifications();
        populateExperience();
        populateOrganizations();
        populateProjects();

        // Initialize section positions after content is loaded
        setTimeout(() => {
            const sections = getSectionElements();

            // Set initial active section based on scroll position
            updateActiveSection(sections);

            // Set the first nav link as active by default if at the top
            if (window.scrollY < 100) {
                const firstNavLink = document.querySelector(".nav-link");
                if (firstNavLink) {
                    firstNavLink.classList.add("active");
                }
            }

            // Listen for scroll events to update active section
            window.addEventListener("scroll", () => {
                updateActiveSection(sections);
            });

            // Add a resize observer to recalculate section positions when content changes
            const resizeObserver = new ResizeObserver(() => {
                const updatedSections = getSectionElements();
                updateActiveSection(updatedSections);
            });

            // Observe the main sections
            for (const sectionData of Object.values(sections)) {
                sectionData.elements.forEach((element) => {
                    resizeObserver.observe(element);
                });
            }
        }, 300); // Increased timeout to ensure all content is fully rendered
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
    }
}

// Populate Skills
function populateSkills() {
    const skillsContainer = document.getElementById("skills-container");
    skillsContainer.innerHTML = "";

    portfolioData.skills.forEach((skill) => {
        const skillElement = document.createElement("div");
        skillElement.className =
            "skill-pill bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center";
        skillElement.innerHTML = `
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i class="${skill.icon} text-3xl text-primary"></i>
            </div>
            <h3 class="font-bold mb-2">${skill.name}</h3>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div class="bg-primary h-2 rounded-full" style="width: ${skill.proficiency}%"></div>
            </div>
        `;
        skillsContainer.appendChild(skillElement);
    });
}

// Populate Education
function populateEducation() {
    const educationContainer = document.getElementById("education-container");
    educationContainer.innerHTML = "";

    portfolioData.education.forEach((edu, index) => {
        const isLast = index === portfolioData.education.length - 1;
        const educationElement = document.createElement("div");
        educationElement.className = `relative pl-8 ${isLast ? "" : "border-l-2 border-primary pb-8"
            }`;
        educationElement.innerHTML = `
            <div class="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <span class="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm rounded-full mb-2">${edu.period}</span>
                <h4 class="text-xl font-bold mb-1">${edu.degree}</h4>
                <h5 class="text-gray-600 mb-3">${edu.institution}</h5>
                <p class="text-gray-600">
                    ${edu.description}
                </p>
            </div>
        `;
        educationContainer.appendChild(educationElement);
    });
}

// Populate Certifications
function populateCertifications() {
    const certificationsContainer = document.getElementById(
        "certifications-container"
    );
    certificationsContainer.innerHTML = "";

    portfolioData.certifications.forEach((cert) => {
        const certElement = document.createElement("li");
        certElement.className = "flex items-start";
        certElement.innerHTML = `
            <i class="fas fa-check-circle text-primary mt-1 mr-3"></i>
            <div>
                <h4 class="font-bold">${cert.name}</h4>
                <p class="text-gray-600 text-sm">${cert.issuer}, ${cert.year}</p>
            </div>
        `;
        certificationsContainer.appendChild(certElement);
    });
}

// Populate Work Experience
function populateExperience() {
    const experienceContainer = document.getElementById("experience-container");
    experienceContainer.innerHTML = "";

    portfolioData.experience.forEach((exp, index) => {
        const isLast = index === portfolioData.experience.length - 1;
        const expElement = document.createElement("div");
        expElement.className = `relative pl-8 ${isLast ? "" : "border-l-2 border-primary pb-8"
            }`;
        expElement.innerHTML = `
            <div class="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <span class="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm rounded-full mb-2">${exp.period}</span>
                <h4 class="text-xl font-bold mb-1">${exp.title}</h4>
                <h5 class="text-gray-600 mb-3">${exp.company}</h5>
                <p class="text-gray-600">
                    ${exp.description}
                </p>
            </div>
        `;
        experienceContainer.appendChild(expElement);
    });
}

// Populate Organizations
function populateOrganizations() {
    const organizationsContainer = document.getElementById(
        "organizations-container"
    );
    organizationsContainer.innerHTML = "";

    portfolioData.organizations.forEach((org, index) => {
        const isLast = index === portfolioData.organizations.length - 1;
        const orgElement = document.createElement("div");
        orgElement.className = `relative pl-8 ${isLast ? "" : "border-l-2 border-primary pb-8"
            }`;

        let skillsHTML = "";
        org.skills.forEach((skill) => {
            skillsHTML += `<span class="px-3 py-1 bg-blue-100 text-primary text-sm rounded-full">${skill}</span>`;
        });

        orgElement.innerHTML = `
            <div class="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
            <div class="bg-white p-6 rounded-lg shadow-md">
                <span class="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm rounded-full mb-2">${org.period}</span>
                <h4 class="text-xl font-bold mb-1">${org.role}</h4>
                <h5 class="text-gray-600 mb-3">${org.organization}</h5>
                <p class="text-gray-600">
                    ${org.description}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${skillsHTML}
                </div>
            </div>
        `;
        organizationsContainer.appendChild(orgElement);
    });
}

// Populate Projects
function populateProjects() {
    const projectsContainer = document.getElementById("projects-container");
    const galleryModalsContainer = document.getElementById(
        "gallery-modals-container"
    );

    projectsContainer.innerHTML = "";
    galleryModalsContainer.innerHTML = "";

    portfolioData.projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.className =
            "project-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300";

        let technologiesHTML = "";
        project.technologies.forEach((tech) => {
            technologiesHTML += `<span class="px-3 py-1 bg-blue-100 text-primary text-sm rounded-full">${tech}</span>`;
        });

        let linksHTML = "";
        if (project.type === "external") {
            if (project.links.live && project.links.code) {
                linksHTML = `
                    <a href="${project.links.live}" target="_blank" class="px-4 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-external-link-alt mr-1"></i> Visit Site
                    </a>
                    <a href="${project.links.code}" target="_blank" class="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors">
                        <i class="fab fa-github mr-1"></i> Code
                    </a>
                `;
            } else if (project.links.live) {
                linksHTML = `
                    <a href="${project.links.live}" target="_blank" class="px-4 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="fas fa-external-link-alt mr-1"></i> Visit Site
                    </a>
                `;
            } else if (project.links.code) {
                linksHTML = `
                    <a href="${project.links.code}" target="_blank" class="px-4 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="fab fa-github mr-1"></i> Code
                    </a>
                `;
            }
        } else if (project.type === "gallery") {
            linksHTML = `
                <button onclick="openGallery('${project.id}')" class="px-4 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors">
                    <i class="fas fa-images mr-1"></i> View Gallery
                </button>
            `;

            if (project.links.figma) {
                linksHTML += `
                    <a href="${project.links.figma}" target="_blank" class="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors">
                        <i class="fab fa-figma mr-1"></i> Figma
                    </a>
                `;
            }

            // Create gallery modal with improved responsive design
            if (project.gallery && project.gallery.length > 0) {
                const modalElement = document.createElement("div");
                modalElement.id = `${project.id}-modal`;
                modalElement.className = "modal";

                let gallerySlides = "";
                project.gallery.forEach((item) => {
                    // Hanya sisakan tag img, hapus icon, title, dan description
                    const imageHtml = item.image
                        ? `<img src="${item.image}" alt="${item.title || 'Gallery Image'}" class="gallery-slide-image">`
                        : ''; // Kosongkan jika tidak ada gambar

                    gallerySlides += `
                        <div class="swiper-slide">
                            <div class="gallery-image-container">
                                <div class="gallery-image-content">
                                    ${imageHtml}
                                </div>
                            </div>
                        </div>
                    `;
                });

                modalElement.innerHTML = `
                    <span class="close" onclick="closeGallery('${project.id}')">&times;</span>
                    <div class="modal-content">
                        <div class="modal-gallery">
                            <div class="swiper ${project.id}-swiper w-full">
                                <div class="swiper-wrapper">
                                    ${gallerySlides}
                                </div>
                                <div class="gallery-pagination-container">
                                    <div class="gallery-pagination-wrapper">
                                        <div class="swiper-pagination"></div>
                                    </div>
                                </div>
                                <div class="gallery-nav-prev" onclick="slidePrev('${project.id}')">
                                    <i class="fas fa-arrow-left"></i>
                                </div>
                                <div class="gallery-nav-next" onclick="slideNext('${project.id}')">
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                galleryModalsContainer.appendChild(modalElement);
            }
        }

        // Determine if project.icon is an image path/URL or a Font Awesome class
        const projectIconHtml = project.icon.startsWith('http') || project.icon.startsWith('Asset/')
            ? `<img src="${project.icon}" alt="Project Icon" class="project-icon-image">`
            : `<i class="${project.icon} text-5xl text-gray-400"></i>`;

        projectElement.innerHTML = `
            <div class="relative">
                <div class="h-60 bg-gray-200 flex items-center justify-center">
                    ${projectIconHtml}
                </div>
                <div class="project-overlay absolute inset-0 bg-primary bg-opacity-90 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6">
                    <h4 class="text-xl font-bold mb-2">${project.category}</h4>
                    <p class="text-center mb-4">${project.detailedDescription}</p>
                    <div class="flex space-x-3">
                        ${linksHTML}
                    </div>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${technologiesHTML}
                </div>
                <p class="text-gray-600">
                    ${project.description}
                </p>
            </div>
        `;

        projectsContainer.appendChild(projectElement);
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("shadow-md");
    } else {
        navbar.classList.remove("shadow-md");
    }
});

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove("opacity-0", "invisible");
        backToTopButton.classList.add("opacity-100", "visible");
    } else {
        backToTopButton.classList.add("opacity-0", "invisible");
        backToTopButton.classList.remove("opacity-100", "visible");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Set Current Year in Footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Enhanced navigation with active states based on section groups
const navLinks = document.querySelectorAll(".nav-link");
let isManualClick = false;
let clickTimeout;

// Define section groups according to the requirements
const sectionGroups = {
    hero: ["hero"],
    about: [
        "about",
        "skills-container",
        "education-container",
        "experience-container",
        "organizations-container",
    ],
    projects: ["projects", "projects-container"],
    contact: ["contact"],
};

// Function to get all elements for each section group
function getSectionElements() {
    const sections = {};

    // Process each section group
    for (const [navSection, sectionIds] of Object.entries(sectionGroups)) {
        sections[navSection] = {
            elements: [],
            top: Infinity,
            bottom: -Infinity,
        };

        // Find all elements for this section group
        sectionIds.forEach((sectionId) => {
            // Try to find by ID first
            let element = document.getElementById(sectionId);

            // If not found by ID, try to find by class
            if (!element) {
                const elements = document.getElementsByClassName(sectionId);
                if (elements.length > 0) {
                    element = elements[0];
                }
            }

            if (element) {
                sections[navSection].elements.push(element);

                // Update top and bottom boundaries
                const rect = element.getBoundingClientRect();
                const scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
                const top = rect.top + scrollTop - 100; // Offset for navbar
                const bottom = rect.bottom + scrollTop - 100;

                sections[navSection].top = Math.min(sections[navSection].top, top);
                sections[navSection].bottom = Math.max(
                    sections[navSection].bottom,
                    bottom
                );
            }
        });
    }

    return sections;
}

// Handle click on navigation links
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        if (!targetId) return;

        // Set active state on clicked link
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        this.classList.add("active");

        // Close mobile menu if open
        if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
        }

        // Scroll to target
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            isManualClick = true;

            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for navbar height
                behavior: "smooth",
            });

            // Clear any existing timeout
            if (clickTimeout) clearTimeout(clickTimeout);

            // Reset manual click flag after scrolling completes (approx 1 second)
            clickTimeout = setTimeout(() => {
                isManualClick = false;
            }, 1000);
        }
    });
});

// Update active state based on scroll position
function updateActiveSection(sections) {
    // Don't update if user just clicked a navigation link
    if (isManualClick) return;

    const scrollPosition = window.scrollY;
    let activeSection = null;

    // Check each section group to see if we're within its boundaries
    for (const [section, data] of Object.entries(sections)) {
        if (scrollPosition >= data.top && scrollPosition <= data.bottom) {
            activeSection = section;
            break;
        }
    }

    // If we're past all sections, find the closest one
    if (!activeSection && scrollPosition > 0) {
        let closestSection = null;
        let closestDistance = Infinity;

        for (const [section, data] of Object.entries(sections)) {
            // If we're below the section, measure distance from bottom
            if (scrollPosition > data.bottom) {
                const distance = scrollPosition - data.bottom;
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            }
            // If we're above the section, measure distance from top
            else if (scrollPosition < data.top) {
                const distance = data.top - scrollPosition;
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            }
        }

        activeSection = closestSection;
    }

    // Update active class on nav links
    if (activeSection) {
        navLinks.forEach((link) => {
            const linkSection = link.getAttribute("data-section");
            if (linkSection === activeSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }
}

// Initialize all data from JSON and section positions
document.addEventListener("DOMContentLoaded", fetchPortfolioData);

// Update section positions on window resize
window.addEventListener("resize", () => {
    const sections = getSectionElements();
    updateActiveSection(sections);
});

// Gallery functions with improved responsive handling
function openGallery(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open

        // Initialize Swiper for this gallery with enhanced pagination and responsive settings
        new Swiper(`.${projectId}-swiper`, {
            pagination: {
                el: `.${projectId}-swiper .swiper-pagination`,
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            },
            loop: true,
            autoHeight: false, // Fixed height for consistent appearance
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            grabCursor: true,
            keyboard: {
                enabled: true,
            },
            // Responsive breakpoints for different devices
            breakpoints: {
                // Mobile
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                // Tablet
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                // Desktop
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
            },
            // Handle orientation change
            on: {
                resize: function () {
                    // Force update to ensure pagination is positioned correctly
                    this.update();
                },
            },
        });

        // Add keyboard navigation for gallery
        document.addEventListener("keydown", handleGalleryKeydown);

        // Add orientation change listener
        window.addEventListener("orientationchange", handleOrientationChange);
    }
}

function closeGallery(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restore scrolling

        // Remove keyboard event listener
        document.removeEventListener("keydown", handleGalleryKeydown);

        // Remove orientation change listener
        window.removeEventListener("orientationchange", handleOrientationChange);
    }
}

function handleGalleryKeydown(e) {
    // Close on Escape key
    if (e.key === "Escape") {
        const openModal = document.querySelector('.modal[style*="display: block"]');
        if (openModal) {
            const projectId = openModal.id.split("-")[0];
            closeGallery(projectId);
        }
    }

    // Navigate with arrow keys
    const openModal = document.querySelector('.modal[style*="display: block"]');
    if (openModal) {
        const projectId = openModal.id.split("-")[0];
        const swiper = document.querySelector(`.${projectId}-swiper`).swiper;

        if (e.key === "ArrowRight") {
            swiper.slideNext();
        } else if (e.key === "ArrowLeft") {
            swiper.slidePrev();
        }
    }
}

function handleOrientationChange() {
    // Force update all active swipers after orientation change
    setTimeout(() => {
        const openModal = document.querySelector('.modal[style*="display: block"]');
        if (openModal) {
            const projectId = openModal.id.split("-")[0];
            const swiper = document.querySelector(`.${projectId}-swiper`).swiper;
            if (swiper) {
                swiper.update();
            }
        }
    }, 300); // Small delay to allow the browser to complete the orientation change
}

function slideNext(projectId) {
    const swiper = document.querySelector(`.${projectId}-swiper`).swiper;
    if (swiper) {
        swiper.slideNext();
    }
}

function slidePrev(projectId) {
    const swiper = document.querySelector(`.${projectId}-swiper`).swiper;
    if (swiper) {
        swiper.slidePrev();
    }
}

// Handle Contact Form Submission for WhatsApp
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default HTML form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // WhatsApp number (replace with your desired number)
        const whatsappNumber = "6281213699618"; // Make sure to use the international format without '+'

        // Construct the WhatsApp message URL
        // Using a more structured message format for clarity
        const whatsappMessage = encodeURIComponent(
            `Halo Anjang Pangestu Selokaton,\n\nSaya ${name} (${email}) ingin menghubungi Anda mengenai "${subject}".\n\nDetail Pesan:\n${message}`
        );

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        // Open WhatsApp
        window.open(whatsappLink, "_blank");

        // Optional: Clear the form after submission (uncomment if desired)
        // contactForm.reset();
    });
}

// Make these functions globally available
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.slideNext = slideNext;
window.slidePrev = slidePrev;