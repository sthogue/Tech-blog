const postID = document.querySelector('input[name="post-id"]').value;

const eventHandler = async (event) => {
    event.preventDefault();
    // Collect values from the comment form
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
   
    await fetch (`/api/posts/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body}),
        headers: { 'Content-Type': 'application/json'},
    });

    document.location.replace('/dashboard');
}

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', eventHandler);
