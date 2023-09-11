const commentFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the comment form
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (comment_text){
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_text}),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok){
            // If successful, redirect the browser to the profile page
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
    