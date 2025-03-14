// Posts JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load posts
    loadPosts();
    
    // Load categories
    loadCategories();
    
    // Load popular posts
    loadPopularPosts();
    
    // Handle comment submission
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitComment();
        });
    }
});

// Function to load posts
function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;
    
    // Get posts from localStorage or use sample data
    let posts = JSON.parse(localStorage.getItem('posts'));
    
    if (!posts) {
        // Sample data
        posts = [
            {
                id: '1',
                title: 'Como a IA está transformando o mercado de trabalho',
                excerpt: 'Descubra como a inteligência artificial está mudando diversas profissões e quais habilidades serão mais valorizadas no futuro próximo.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
                image: 'img/post1.jpg',
                category: 'Inteligência Artificial',
                author: {
                    id: '1',
                    name: 'João Silva',
                    avatar: 'img/avatar1.jpg'
                },
                date: '2025-03-12T10:30:00',
                likes: 42,
                comments: 18,
                views: 1250
            },
            {
                id: '2',
                title: 'Análise dos novos smartphones lançados em 2025',
                excerpt: 'Uma comparação detalhada entre os principais smartphones do mercado, destacando suas especificações, recursos e custo-benefício.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vest