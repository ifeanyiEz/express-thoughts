document.getElementById('commentForm').addEventListener('submit', async function(e) {
        e.preventDefault(); // stop default form submit
        
        const comment = document.getElementById('comment').value.trim();
        
        if (!comment) return;

        const slug = "<%= thisPost.slug %>";

        const url = `/blogs/${slug}/comments`;
        try {

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment })
            });

            if (!res.ok) { 
                alert("Failed to add comment");
                throw new Error(`HTTP error! status: ${res.status}`); 
            }

            // Option 2: Append comment dynamically (better UX)
            const newComment = await res.json();
            const commentsList = document.getElementById('commentsList');
            const newCommentDiv = document.createElement('div');
            newCommentDiv.className = 'blog-view-divs tiny-bm';
            newCommentDiv.innerHTML = `
                <h6 class="xtiny-bm regular-text small-text">${newComment.comment} <span class="vbold-text blue-text smaller-text">By: ${newComment.commentBy}</span></h6>
                <div class="comment-social">
                    <p class="bold-text smaller-text">${newComment.time}</p>
                    <p class="bold-text smaller-text"><i class="bi bi-hand-thumbs-up-fill"></i> ${newComment.likes.length}</p>
                    <p class="bold-text smaller-text"><i class="bi bi-hand-thumbs-down-fill"></i> ${newComment.dislikes.length}</p>
                    <p class="bold-text smaller-text"><i class="bi bi-star-fill"></i> ${newComment.favourites.length}</p>
                </div>
            `;
            commentsList.prepend(newCommentDiv);
            document.getElementById('comment').value = ""; // Clear the textarea

            const noComments = document.getElementById("no-comments");
            if (noComments) {
                noComments.classList.add("hidden"); // Hide the element with id === no-comments
            }


        } catch (e) {
            console.error("Ajax error:", e);
            // return;
        }
    });