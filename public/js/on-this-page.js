document.addEventListener("DOMContentLoaded", () => {
        const blogBody = document.getElementById("blogBody");
        const tocList = document.querySelector("#onThisPage ul");

        if (!blogBody || !tocList) return; // Safety check

        // Find all h3 headings in the blog body
        const allHeadings = blogBody.querySelectorAll("h3");

        allHeadings.forEach((heading, index) => {
            // Create a slug from heading text
            const slug = heading.textContent
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");

            // Add ID to heading so we can link to it
            heading.id = slug;

            // Create list item for TOC
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${slug}`;
            a.textContent = heading.textContent;

            // Optional: smooth scroll
            a.addEventListener("click", (e) => {
                e.preventDefault();
                document.getElementById(slug).scrollIntoView({ behavior: "smooth" });
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });

        if (allHeadings.length === 0) {
            tocList.innerHTML = "<li>No subheadings found.</li>";
        }
    });