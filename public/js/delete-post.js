const postID = document.querySelector('input[name="post-id"]').value;

const deleteHandler = async (event) => {
    await fetch (`/api/posts/${postID}`, {
        method: 'DELETE',
    });

    if (response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteHandler);