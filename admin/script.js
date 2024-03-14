document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const photo = document.getElementById('photo').value;
    
    const newPost = {
        date: new Date().toISOString(),
        title: title,
        content: content,
        photo: photo
    };

    // Send the new post data to the server
    fetch('/addPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => {
        if (response.ok) {
            alert('Post added successfully!');
            window.location.reload(); // Reload the page to show updated posts
        } else {
            alert('Failed to add post');
        }
    })
    .catch(error => console.error('Error adding post:', error));
});
