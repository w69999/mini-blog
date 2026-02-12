const postsContainer = document.getElementById("posts");
const postForm = document.getElementById("postForm");

let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];


if (postsContainer) {
    postsContainer.innerHTML = posts.map((post, index) => `
        <article class="post-card">
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?id=${index}" class="read-more">Read more →</a>
        </article>
    `).join("");
}


if (postForm) {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id");


    if (editId !== null && posts[editId]) {
        document.getElementById("title").value = posts[editId].title;
        document.getElementById("content").value = posts[editId].content;
    }

    postForm.addEventListener("submit", e => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        if (editId !== null && posts[editId]) {
          
            posts[editId].title = title;
            posts[editId].content = content;
        } else {
           
            posts.push({
                title,
                content,
                date: new Date().toLocaleDateString()
            });
        }

        localStorage.setItem("blogPosts", JSON.stringify(posts));
        window.location.href = "index.html";
    });
}


const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (postId !== null && posts[postId]) {
    const post = posts[postId];

    const titleEl = document.getElementById("post-title");
    const contentEl = document.getElementById("post-content");

    if (titleEl && contentEl) {
        titleEl.textContent = post.title;
        contentEl.textContent = post.content;
    }

    document.getElementById("delete-post").onclick = () => {
        posts.splice(postId, 1);
        localStorage.setItem("blogPosts", JSON.stringify(posts));
        window.location.href = "index.html";
    };

    document.getElementById("edit-post").href = `add.html?id=${postId}`;
}
