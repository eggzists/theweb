document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const blogPosts = document.querySelectorAll('.blog-list li');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        blogPosts.forEach(post => {
            const title = post.querySelector('a').textContent.toLowerCase();
            const description = post.querySelector('p') ? 
                              post.querySelector('p').textContent.toLowerCase() : '';

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
        });
    });

    // Clear search when clicking the 'x' (clear) button
    searchInput.addEventListener('search', () => {
        blogPosts.forEach(post => post.classList.remove('hidden'));
    });
});