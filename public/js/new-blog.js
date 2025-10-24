
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("blogForm");

    if (!form) {
        console.error("Form with ID 'blogForm' not found.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const blogContent = quill.root.innerHTML.trim();

        if (!blogContent || blogContent === "<p><br></p>") {
            alert("Blog content is required!");
            return;
        }

        const blog = {
            blogTitle: document.getElementById("blogTitle").value,
            category: document.getElementById("category").value,
            subCategory: document.getElementById("subCategory").value,
            heroImage: document.getElementById("heroImage").value,
            blogBody: blogContent, // Quill content
            tags: document.getElementById("tags").value,
            writtenBy: document.getElementById("writtenBy").value, 
            contactEmail: document.getElementById("contactEmail").value,
            createDate: document.getElementById("createDate").value,
            publishedAt: new Date()
        };

        // Temporary storage (does not persist across reloads or server restarts)
        console.log("Blog data before submission:", blog);

        // Use the Fetch API to send the data to the server
        fetch("/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blog), // Convert the JavaScript object to a JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Or whatever format your server sends back
        })
        .then(data => {
            console.log("Success:", data);
            // You might want to redirect the user or show a success message here
            window.location.href = '/blogs'; // Example redirect
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error submitting your blog.");
        });
    });
});