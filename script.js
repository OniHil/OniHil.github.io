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