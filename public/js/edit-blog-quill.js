const quill = new Quill('#blogBody', { theme: 'snow' });
  quill.root.innerHTML = `<%- thisPost.blogBody %>`;

  document.getElementById("editBlogForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const blogContent = quill.root.innerHTML;

    document.getElementById("hiddenBlogBody").value = blogContent;
    console.log(blogContent);

    this.submit();
  });