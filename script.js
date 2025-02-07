// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth' // Smooth scrolling behavior
            });
        }
    });
});

// Carousel functionality

let currentIndex = 1; // Start with the first real item
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].clientWidth;
const lastValidIndex = 8; // Qatar's index (considering zero-based index and excluding cloned items)

// Initialize the position
carouselInner.style.transform = `translateX(${-itemWidth}px)`; // Start at the first real item

function showSlide(index) {
    if (index >= lastValidIndex + 1) {
        // Smooth transition back to the first real item
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(${-itemWidth}px)`;
        setTimeout(() => {
            carouselInner.style.transition = ''; // Re-enable transition
            currentIndex = 1; // Update currentIndex
        }, 500);
    } else if (index <= 0) {
        index = items.length - 2; // Skip the cloned last item
        carouselInner.style.transition = 'none'; // Disable transition for seamless jump
        carouselInner.style.transform = `translateX(${-index * itemWidth}px)`;
        setTimeout(() => {
            carouselInner.style.transition = ''; // Re-enable transition
            showSlide(index);
        }, 0);
    } else {
        currentIndex = index; // Update currentIndex
        carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        carouselInner.style.transform = `translateX(${-index * itemWidth}px)`;
    }
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    if (currentIndex === 1) {
        // Smooth transition to the last valid item
        currentIndex = lastValidIndex + 1;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
        setTimeout(() => {
            currentIndex = lastValidIndex; // Update currentIndex to the last valid item
            carouselInner.style.transition = ''; // Re-enable transition
        }, 500);
    } else {
        showSlide(currentIndex - 1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('languageSwitcher');

    // Load the current language from localStorage or default to Russian
    const currentLang = localStorage.getItem('language') || 'ru';
    loadLanguage(currentLang);

    languageSwitcher.value = currentLang; // Set the current selection in the dropdown

    languageSwitcher.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        localStorage.setItem('language', selectedLang); // Save the selected language
        loadLanguage(selectedLang); // Load the selected language
    });
});

function loadLanguage(lang) {
    const baseUrl = `https://s3.ap-southeast-1.amazonaws.com/select-sun.ru`;
    const jsonUrl = `${baseUrl}/${lang}.json`; // Construct the full URL for the selected language

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                console.log(`Translating ${key} to: ${translations[key]}`); // Debugging log
                el.textContent = translations[key] || key;
            });
        })
        .catch(error => console.error('Error loading language:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll('#telegramPosts .post');
    const maxLength = 150; // Maximum number of characters to show initially

    posts.forEach(post => {
        const content = post.querySelector('p');
        const fullText = content.textContent;

        if (fullText.length > maxLength) {
            const truncated = fullText.slice(0, maxLength) + '...';
            content.textContent = truncated;

            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more';
            readMoreBtn.textContent = 'Read More';

            readMoreBtn.addEventListener('click', function() {
                if (content.textContent === truncated) {
                    content.textContent = fullText;
                    readMoreBtn.textContent = 'Read Less';
                } else {
                    content.textContent = truncated;
                    readMoreBtn.textContent = 'Read More';
                }
            });

            post.appendChild(readMoreBtn);
        }
    });
});

