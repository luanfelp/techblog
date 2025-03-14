// Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close nav when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !event.target.closest('nav') && event.target !== menuToggle) {
            nav.classList.remove('active');
        }
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Function to open modal
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    };

    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado por se inscrever na nossa newsletter!');
                this.reset();
            }
        });
    }

    // Search form
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('search-input').value;
            if (query) {
                window.location.href = `pesquisa.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Like functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn()) {
                openModal('login-modal');
                return;
            }
            
            const postId = this.getAttribute('data-id');
            toggleLike(postId, this);
        });
    });

    // Share functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            const postTitle = this.getAttribute('data-title');
            const postUrl = window.location.origin + '/post.html?id=' + postId;
            
            // Open share modal
            openShareModal(postTitle, postUrl);
        });
    });
});

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Function to toggle like
function toggleLike(postId, button) {
    // Get current likes
    let likes = parseInt(button.querySelector('.like-count').textContent);
    
    // Check if already liked
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const index = likedPosts.indexOf(postId);
    
    if (index === -1) {
        // Add like
        likedPosts.push(postId);
        likes++;
        button.classList.add('liked');
    } else {
        // Remove like
        likedPosts.splice(index, 1);
        likes--;
        button.classList.remove('liked');
    }
    
    // Save to local storage
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    
    // Update UI
    button.querySelector('.like-count').textContent = likes;
}

// Function to open share modal
function openShareModal(title, url) {
    const shareModal = document.getElementById('share-modal');
    if (!shareModal) return;
    
    const modalContent = shareModal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <h2>Compartilhar</h2>
        <p>Compartilhe este artigo:</p>
        <div class="share-links">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="btn facebook">
                <i class="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}" target="_blank" class="btn twitter">
                <i class="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}" target="_blank" class="btn linkedin">
                <i class="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}" target="_blank" class="btn whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
        </div>
        <div class="copy-url">
            <input type="text" id="copy-link" value="${url}" readonly>
            <button onclick="copyToClipboard()" class="btn">Copiar Link</button>
        </div>
    `;
    
    // Add close button event listener
    modalContent.querySelector('.close-modal').addEventListener('click', function() {
        shareModal.style.display = 'none';
    });
    
    // Show modal
    shareModal.style.display = 'block';
}

// Function to copy URL to clipboard
function copyToClipboard() {
    const copyText = document.getElementById('copy-link');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    const copyBtn = copyText.nextElementSibling;
    copyBtn.textContent = 'Copiado!';
    setTimeout(() => {
        copyBtn.textContent = 'Copiar Link';
    }, 2000);
}