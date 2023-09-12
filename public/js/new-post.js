const newPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-name').value.trim();
    const content = document.querySelector('#project-desc').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content}),
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPost);