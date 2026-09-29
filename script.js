/* =========================================================
   RISAR GROUP WEBSITE
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                menuToggle.innerHTML = "✕";
                menuToggle.setAttribute("aria-label", "Close Menu");
            } else {
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-label", "Open Menu");
            }

        });

    }


    /* =====================================================
       2. MOBILE SERVICES DROPDOWN
       ===================================================== */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(function (dropdown) {

        const dropdownToggle =
            dropdown.querySelector(".dropdown-toggle");

        if (!dropdownToggle) {
            return;
        }

        dropdownToggle.addEventListener("click", function (event) {

            if (window.innerWidth <= 768) {

                event.preventDefault();

                dropdown.classList.toggle("active");

            }

        });

    });


    /* =====================================================
       3. CLOSE MOBILE MENU AFTER CLICKING LINK
       ===================================================== */

    const navLinks = document.querySelectorAll(
        ".nav-menu a:not(.quote-btn)"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 768) {

                if (navMenu) {
                    navMenu.classList.remove("active");
                }

                if (menuToggle) {
                    menuToggle.innerHTML = "☰";
                    menuToggle.setAttribute(
                        "aria-label",
                        "Open Menu"
                    );
                }

            }

        });

    });


    /* =====================================================
       4. CLOSE MENU WHEN RESIZING TO DESKTOP
       ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );
            }

            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove("active");
            });

        }

    });


    /* =====================================================
       5. PROJECT FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    if (filterButtons.length > 0 && projectCards.length > 0) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filter =
                    button.getAttribute("data-filter");


                /* Remove active from all buttons */

                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });


                /* Add active to clicked button */

                button.classList.add("active");


                /* Filter cards */

                projectCards.forEach(function (card) {

                    const category =
                        card.getAttribute("data-category");


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            });

        });

    }


    /* =====================================================
       6. CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.querySelectorAll(".current-year");

    currentYear.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       7. SCROLL TO TOP
       ===================================================== */

    const scrollTopButton =
        document.querySelector(".scroll-top");


    if (scrollTopButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                scrollTopButton.classList.add("show");

            } else {

                scrollTopButton.classList.remove("show");

            }

        });


        scrollTopButton.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       8. SMOOTH ANCHOR LINKS
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       9. EMAIL VALIDATION
       ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       10. SHOW FORM MESSAGE
       ===================================================== */

    function showFormMessage(
        element,
        message,
        type
    ) {

        if (!element) {
            return;
        }

        element.textContent = message;

        element.classList.remove(
            "success",
            "error"
        );

        element.classList.add(type);

    }


    /* =====================================================
       11. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const contactMessage =
        document.getElementById("contactMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contactName"
                    );

                const email =
                    document.getElementById(
                        "contactEmail"
                    );

                const phone =
                    document.getElementById(
                        "contactPhone"
                    );

                const subject =
                    document.getElementById(
                        "contactSubject"
                    );

                const message =
                    document.getElementById(
                        "contactMessageText"
                    );


                /* Required fields */

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !subject ||
                    !message
                ) {

                    showFormMessage(
                        contactMessage,
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                /* Empty validation */

                if (
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    phone.value.trim() === "" ||
                    subject.value.trim() === "" ||
                    message.value.trim() === ""
                ) {

                    showFormMessage(
                        contactMessage,
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                /* Email validation */

                if (
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    showFormMessage(
                        contactMessage,
                        "Please enter a valid email address.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                /* Success */

                showFormMessage(
                    contactMessage,
                    "Thank you! Your enquiry has been submitted successfully. Our team will contact you.",
                    "success"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       12. CAREER FORM
       ===================================================== */

    const careerForm =
        document.getElementById("careerForm");

    const careerMessageBox =
        document.getElementById(
            "careerMessageBox"
        );


    if (careerForm) {

        careerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "careerName"
                    );

                const email =
                    document.getElementById(
                        "careerEmail"
                    );

                const phone =
                    document.getElementById(
                        "careerPhone"
                    );

                const position =
                    document.getElementById(
                        "careerPosition"
                    );

                const cv =
                    document.getElementById(
                        "careerCV"
                    );


                /* Required fields */

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !position ||
                    !cv
                ) {

                    showFormMessage(
                        careerMessageBox,
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                if (
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    phone.value.trim() === "" ||
                    position.value === ""
                ) {

                    showFormMessage(
                        careerMessageBox,
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                /* Email */

                if (
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    showFormMessage(
                        careerMessageBox,
                        "Please enter a valid email address.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                /* CV */

                if (
                    !cv.files ||
                    cv.files.length === 0
                ) {

                    showFormMessage(
                        careerMessageBox,
                        "Please upload your CV.",
                        "error"
                    );

                    return;

                }


                const selectedFile =
                    cv.files[0];


                /* 5 MB */

                const maxSize =
                    5 * 1024 * 1024;


                if (
                    selectedFile.size > maxSize
                ) {

                    showFormMessage(
                        careerMessageBox,
                        "CV size must be 5 MB or less.",
                        "error"
                    );

                    return;

                }


                /* Extension */

                const fileName =
                    selectedFile.name.toLowerCase();

                const allowedExtensions = [
                    ".pdf",
                    ".doc",
                    ".docx"
                ];


                const validExtension =
                    allowedExtensions.some(
                        function (extension) {
                            return fileName.endsWith(
                                extension
                            );
                        }
                    );


                if (!validExtension) {

                    showFormMessage(
                        careerMessageBox,
                        "Please upload a PDF, DOC or DOCX file.",
                        "error"
                    );

                    return;

                }


                /* Success */

                showFormMessage(
                    careerMessageBox,
                    "Thank you! Your application has been submitted successfully.",
                    "success"
                );


                careerForm.reset();

            }
        );

    }


    /* =====================================================
       13. QUOTE FORM
       ===================================================== */

    const quoteForm =
        document.getElementById("quoteForm");

    const quoteMessageBox =
        document.getElementById(
            "quoteMessageBox"
        );


    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "quoteName"
                    );

                const email =
                    document.getElementById(
                        "quoteEmail"
                    );

                const phone =
                    document.getElementById(
                        "quotePhone"
                    );

                const service =
                    document.getElementById(
                        "quoteService"
                    );

                const location =
                    document.getElementById(
                        "quoteLocation"
                    );

                const message =
                    document.getElementById(
                        "quoteMessage"
                    );


                /* Required fields */

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !service ||
                    !location ||
                    !message
                ) {

                    showFormMessage(
                        quoteMessageBox,
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                if (
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    phone.value.trim() === "" ||
                    service.value === "" ||
                    location.value.trim() === "" ||
                    message.value.trim() === ""
                ) {

                    showFormMessage(
                        quoteMessageBox,
                        "Please fill all required fields.",
                        "error"
                    );

                    return;

                }


                /* Email */

                if (
                    !isValidEmail(
                        email.value.trim()
                    )
                ) {

                    showFormMessage(
                        quoteMessageBox,
                        "Please enter a valid email address.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                /* Success */

                showFormMessage(
                    quoteMessageBox,
                    "Thank you! Your quote request has been submitted successfully. Our team will contact you.",
                    "success"
                );


                quoteForm.reset();

            }
        );

    }


    /* =====================================================
       14. PHONE INPUT
       Allow numbers, +, spaces, hyphen and brackets
       ===================================================== */

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                input.value =
                    input.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    });


    /* =====================================================
       15. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const pageName =
        currentPage === ""
            ? "index.html"
            : currentPage;


    const allNavLinks =
        document.querySelectorAll(
            ".nav-menu > a"
        );


    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");


        if (
            linkPage &&
            linkPage === pageName &&
            !link.classList.contains("quote-btn")
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       16. ESC KEY CLOSES MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (navMenu) {
                    navMenu.classList.remove("active");
                }

                if (menuToggle) {
                    menuToggle.innerHTML = "☰";
                    menuToggle.setAttribute(
                        "aria-label",
                        "Open Menu"
                    );
                }

                dropdowns.forEach(
                    function (dropdown) {
                        dropdown.classList.remove(
                            "active"
                        );
                    }
                );

            }

        }
    );


});