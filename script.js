window.addEventListener('DOMContentLoaded', (event) => {
    const body = document.querySelector('body');
    let scrollingToTop = false;  // Add this flag variable

    document.getElementById('logo').addEventListener('click', function(e) {
        e.preventDefault();

        scrollActionInProgress = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Reset the flag after the scroll duration (adjust the duration as needed)
        setTimeout(function(e) {
        scrollActionInProgress = false;
        }, 200);  // Adjust this value based on your scrolling time
    });

    const header = document.querySelector('header');
    const banner = document.querySelector('.banner');

    const updateBannerHeight = () => {
        const headerHeight = header.offsetHeight;
        banner.style.setProperty('--header-height', `${headerHeight}px`);
    };

    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight);

    var navLinks = document.querySelectorAll('nav a');
    var scrollActionInProgress = false;

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
        e.preventDefault();

        navLinks.forEach(function(otherLink) {
            if (otherLink !== this) {
            otherLink.classList.remove('active');
            }
        }, this);

        this.classList.add('active');

        var targetSection = document.querySelector(this.getAttribute('href'));
        var targetOffsetTop = targetSection.offsetTop;
        var scrollOptions = {
            top: targetOffsetTop,
            behavior: 'smooth'
        };

        scrollActionInProgress = true;
        window.scrollTo(scrollOptions);

        // Delay for scroll event listener to start working
        setTimeout(function() {
            scrollActionInProgress = false;
        }, 500);  // Adjust this value based on your scrolling time
        });
    });

    window.addEventListener('scroll', function() {
        if (!scrollActionInProgress) {
        var scrollPosition = window.scrollY || document.documentElement.scrollTop;
        var scrollThreshold = 500;
        var bannerHeight = document.querySelector('.banner').offsetHeight;
        
        if (scrollPosition < bannerHeight) {
            navLinks.forEach(function(link) {
            link.classList.remove('active');
            });
        } else {
            navLinks.forEach(function(link) {
            var currLink = link;
            var val = link.getAttribute('href');
            var refElement = document.querySelector(val);
            var offsetTop = refElement.offsetTop - scrollThreshold;
            var isVisible =
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + refElement.offsetHeight;

            if (isVisible) {
                navLinks.forEach(function(link) {
                if (link !== currLink) {
                    link.classList.remove('active');
                }
                });
                currLink.classList.add('active');
            }
            });
        }
        }
    });
});
document.addEventListener('DOMContentLoaded', (event) => {
    // Select the Events link
    const eventsLink = document.querySelector('nav a[href="events.html"]');

    // Add click event listener if the link exists
    if (eventsLink) {
        eventsLink.addEventListener('click', function(event) {
            // Optional: Any specific logic you want to execute before redirection
            // event.preventDefault(); // Uncomment this line only if you have additional logic to execute before redirection

            // Redirect to the events page
            window.location.href = this.getAttribute('href');
        });
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Scope your functions inside the DOMContentLoaded callback to not pollute the global namespace

    // Initialize slideshows
    let slideshows = document.querySelectorAll('.event-slideshow');
    slideshows.forEach(slideshow => {
        initializeSlideshow(slideshow);
    });

    // Function to initialize a slideshow
    function initializeSlideshow(slideshowContainer) {
        let slideIndex = 1;
        showSlides(slideIndex);

        // Function to show the current slide
        function showSlides(n) {
            let slides = slideshowContainer.getElementsByClassName("mySlides");
            let dots = slideshowContainer.getElementsByClassName("dot");
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            Array.from(slides).forEach(slide => slide.style.display = "none");
            Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }

        // Function to increment/decrement the current slide index
        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        // Function to set the current slide index to a specific dot
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        // Attach event listeners for 'prev' and 'next' buttons
        slideshowContainer.querySelector(".prev").addEventListener('click', () => plusSlides(-1));
        slideshowContainer.querySelector(".next").addEventListener('click', () => plusSlides(1));

        // Attach event listeners for each 'dot'
        Array.from(slideshowContainer.querySelectorAll(".dot")).forEach((dot, index) => {
            dot.addEventListener('click', () => currentSlide(index + 1));
        });
    }
});


