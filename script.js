window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Adjust speeds here (higher = faster movement)
    const backLayer = document.getElementById('layerBack');
    const midLayer = document.getElementById('layerMid');
    const frontLayer = document.getElementById('layerFront');

    if (backLayer) 
        backLayer.style.transform = `translateY(${scrollY * 0.2}px)`;
    if (midLayer) 
        midLayer.style.transform = `translateY(${scrollY * 0.4}px)`;
    if (frontLayer) 
        frontLayer.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
);

// Function to hide the loader
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('preloader-hidden')) {
        preloader
            .classList
            .add('preloader-hidden');
        console.log("Preloader hidden successfully.");
    }
}

// 1. Hide when everything is finished loading
window.addEventListener('load', function () {
    setTimeout(hidePreloader, 1500); // 0.5s smooth delay
});

// 2. FAIL-SAFE: If 'load' event doesn't fire, hide it anyway after 3 seconds
setTimeout(hidePreloader, 3000);

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry
                .target
                .classList
                .add('visible');
            // Unobserve to keep the text revealed after scrolling past
            textObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.5});

document
    .querySelectorAll('.reveal-text-lr')
    .forEach(el => textObserver.observe(el));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry
                .target
                .classList
                .add('visible');
        }
    });
}, {threshold: 0.1});

document
    .querySelectorAll('.reveal')
    .forEach(el => observer.observe(el));

// Set default date to today
document
    .getElementById('bookDate')
    .valueAsDate = new Date();

function confirmBooking() {
    // Fetch values
    const name = document
        .getElementById('userName')
        .value;
    const phone = document
        .getElementById('userPhone')
        .value;
    const email = document
        .getElementById('userEmail')
        .value;
    const date = document
        .getElementById('bookDate')
        .value;
    const start = document
        .getElementById('startTime')
        .value;
    const end = document
        .getElementById('endTime')
        .value;
    const room = document
        .querySelector('input[name="room"]:checked')
        .value;

    // Simple Validation
    if (!name || !phone || !start || !end) {
        alert("Please fill in all the details to proceed.");
        return;
    }

    // Output Confirmation
    console.log("Booking Details:", {
        name,
        phone,
        email,
        date,
        start,
        end,
        room
    });

    alert(
        `Thank you, ${name}! \nYour booking for the ${room} from ${start} to ${end} on ${date} has been recorded. Our team will contact you at ${phone} shortly.`
    );

    // Optional: Clear form after booking
    // document.querySelectorAll('input').forEach(input => input.value = '');
}

// Auto-close offcanvas when any link inside it is clicked
document
    .querySelectorAll('.offcanvas-body .nav-link')
    .forEach(link => {
        link.addEventListener('click', () => {
            const offcanvasElement = document.getElementById('offcanvasNavbar');
            const box = bootstrap
                .Offcanvas
                .getInstance(offcanvasElement);
            if (box) {
                box.hide();
            }
        });
    });

// Helper function to convert 24h to 12h AM/PM
function formatAMPM(time) {
    if (!time) 
        return "";
    let [hours, minutes] = time.split(':');
    let ampm = hours >= 12
        ? 'PM'
        : 'AM';
    hours = hours % 12;
    hours = hours
        ? hours
        : 12; // the hour '0' should be '12'
    return hours + ':' + minutes + ' ' + ampm;
}

function confirmBooking() {
    // 1. Get Values
    const name = document
        .getElementById('userName')
        .value;
    const date = document
        .getElementById('bookDate')
        .value;
    const rawStart = document
        .getElementById('startTime')
        .value;
    const rawEnd = document
        .getElementById('endTime')
        .value;
    const room = document
        .querySelector('input[name="room"]:checked')
        .value;
    const phone = document
        .getElementById('userPhone')
        .value;
    const email = document
        .getElementById('userEmail')
        .value;

    // 2. Convert to AM/PM
    const startTime = formatAMPM(rawStart);
    const endTime = formatAMPM(rawEnd);

    if (!name || !date || !rawStart || !rawEnd) {
        alert("Please fill all fields");
        return;
    }

    // 3. Create WhatsApp Message
    const message = `Hello RRC HIVE, I would like to book a meeting room:
            - Name: ${name}
            - Room: ${room}
            - Date: ${date}
            - Time: ${startTime} to ${endTime}
            - Phone: ${phone}
            - Email: ${email}`;

    // 4. Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/919751182452?text=${encodeURIComponent(
        message
    )}`;
    window.open(whatsappUrl, '_blank');
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav
            .classList
            .add('scrolled');
    } else {
        nav
            .classList
            .remove('scrolled');
    }
});

document
    .querySelectorAll('img')
    .forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });

function countUp(el, target, suffix = "+") {
    let start = 0;
    let duration = 2000; // 2 seconds
    let step = (timestamp) => {
        if (!start) 
            start = timestamp;
        let progress = Math.min((timestamp - start) / duration, 1);
        el.innerText = Math.floor(progress * target) + suffix;
        if (progress < 1) 
            window.requestAnimationFrame(step);
        };
    window.requestAnimationFrame(step);
}

navLinks.forEach((link) => {
    link
        .classList
        .remove('active'); // Remove from all
    // Add only to the one matching the current section ID
    if (link.getAttribute('href').includes(current)) {
        link
            .classList
            .add('active');
    }
});

// Get all nav links
const navLinks = document.querySelectorAll('.nav-link');

// Function to handle clicking
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove active class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Add active class to the clicked link
        this
            .classList
            .add('active');
    });
});

window.addEventListener('scroll', () => {
    let current = "home";
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Detects the section when it's in the top 30% of the screen
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
});

window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}