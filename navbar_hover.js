// Toggle the mobile menu
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

// Close menu when clicking on nav links
document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-links a");
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            document.querySelector(".nav-links").classList.remove("active");
        });
    });
    
    // Close menu when clicking anywhere outside the menu
    document.addEventListener("click", function(event) {
        const navLinks = document.querySelector(".nav-links");
        const hamburger = document.querySelector(".hamburger");
        
        // Check if the click was outside the menu and hamburger button
        if (navLinks.classList.contains("active") && 
            !navLinks.contains(event.target) && 
            !hamburger.contains(event.target)) {
            navLinks.classList.remove("active");
        }
    });
});