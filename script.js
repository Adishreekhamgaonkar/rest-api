document.getElementById('fetch-posts').addEventListener('click', fetchPosts);

function fetchPosts() {
    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
    ])
    .then(([posts, users]) => {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const user = users.find(user => user.id === post.userId);
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p><strong>User:</strong> ${user.name} (${user.email})</p>
            `;
            postElement.addEventListener('click', () => displayPostDetails(post.id));
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}