import express from "express";
import data from "./data.json" with {type: "json"};
import methodOverride from "method-override";

const app = express();
const port = 3000;

const thisLogin = {}
const userAccounts = [];
const allBlogs = data.allBlogs;
const loginData = [];
const categories = [
    {
        "catName": "The Human Lens",
        "catSlug": "the-human-lens",
        "catImage":"https://images.unsplash.com/photo-1505243542579-da5adfe8338f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670",
        "catFocus":"Humanity",
        "catExplore":"Who we are inside — our nature, cultures, struggles, beliefs, and shared human condition. How we see and experience ourselves and each other."
    },
    {
        "catName": "The World We Build",
        "catSlug": "the-world-we-build",
        "catImage":"https://images.unsplash.com/36/yJl7OB3sSpOdEIpHhZhd_DSC_1929_1.jpg?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1167",
        "catFocus":"Civilization & Power",
        "catExplore":"Our institutions, the systems we build, the borders we create, and the battles we fight. How we organize, govern, and shape the physical world — both justly and unjustly."
    },
    {
        "catName": "Tomorrow's Mind",
        "catSlug": "tomorrows-mind",
        "catImage":"https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1121",
        "catFocus":"Science, Technology & the Future",
        "catExplore":"How human curiosity builds the future. Where discovery and innovation lead us — and the tools that may save or destroy us."
    },
    {
        "catName": "Becoming You",
        "catSlug": "becoming-you",
        "catImage":"https://images.unsplash.com/photo-1484972759836-b93f9ef2b293?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        "catFocus":"Growth & Creativity",
        "catExplore":"Our journey toward wholeness, beauty, purpose, and growth - how individuals evolve, heal, create, and contribute meaningfully to the world."
    }
];

function slugGen(text) {
return text.toString().toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const subCategories = [
    {
        "subCatName": "Emotion & Psychology",
        "subCatSlug": slugGen("Emotion & Psychology")
    },
    {
        "subCatName": "Faith & Meaning",
        "subCatSlug": slugGen("Faith & Meaning")
    },
    {
        "subCatName": "Culture & Identity",
        "subCatSlug": slugGen("Culture & Identity")
    },
    {
        "subCatName": "Society & Community",
        "subCatSlug": slugGen("Society & Community")
    },
    {
        "subCatName": "Conflict & Peace",
        "subCatSlug": slugGen("Conflict & Peace")
    },
    {
        "subCatName": "History & Memory",
        "subCatSlug": slugGen("History & Memory")
    },
    {
        "subCatName": "Voices from the Margins",
        "subCatSlug": slugGen("Voices from the Margins")
    },
    {
        "subCatName": "Governance & Politics",
        "subCatSlug": slugGen("Governance & Politics")
    },
    {
        "subCatName": "Economy & Work",
        "subCatSlug": slugGen("Economy & Work")
    },
    {
        "subCatName": "Law, Justice & Rights",
        "subCatSlug": slugGen("Law, Justice & Rights")
    },
    {
        "subCatName": "Cities, Nations & Borders",
        "subCatSlug": slugGen("Cities, Nations & Borders")
    },
    {
        "subCatName": "Globalization & Power Structures",
        "subCatSlug": slugGen("Globalization & Power Structures")
    },
    {
        "subCatName": "Scientific Thinking & Discovery",
        "subCatSlug": slugGen("Scientific Thinking & Discovery")
    },
    {
        "subCatName": "Emerging Technologies (AI, BioTech, Quantum)",
        "subCatSlug": slugGen("Emerging Technologies (AI, BioTech, Quantum)")
    },
    {
        "subCatName": "Digital Society & Ethics (Surveillance, Data, Privacy)",
        "subCatSlug": slugGen("Digital Society & Ethics (Surveillance, Data, Privacy)")
    },
    {
        "subCatName": "Environment & Climate Science",
        "subCatSlug": slugGen("Environment & Climate Science")
    },
    {
        "subCatName": "Space & Exploration",
        "subCatSlug": slugGen("Space & Exploration")
    },
    {
        "subCatName": "Futurism & Existential Risks",
        "subCatSlug": slugGen("Futurism & Existential Risks")
    },
    {
        "subCatName": "Self-Development & Life Design",
        "subCatSlug": slugGen("Self-Development & Life Design")
    },
    {
        "subCatName": "Education & Lifelong Learning",
        "subCatSlug": slugGen("Education & Lifelong Learning")
    },
    {
        "subCatName": "Mental Health & Resilience",
        "subCatSlug": slugGen("Mental Health & Resilience")
    },
    {
        "subCatName": "Creativity & the Arts (Writing, Music, Design)",
        "subCatSlug": slugGen("Creativity & the Arts (Writing, Music, Design)")
    },
    {
        "subCatName": "Spiritual & Emotional Growth",
        "subCatSlug": slugGen("Spiritual & Emotional Growth")
    },
    {
        "subCatName": "Purpose, Productivity & Fulfillment",
        "subCatSlug": slugGen("Purpose, Productivity & Fulfillment")
    }
]

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

function passwordGate(req, res, next) {
    const {email, password} = req.body;

    const existingUser = userAccounts.find(user => user.email === email);
    const loggedInUser = loginData.find(user => user.email === email);

    if (existingUser && loggedInUser) {
        res.send(`A user with email ${email} is already logged in.`);

    } else if (existingUser && !loggedInUser) {
        
        thisLogin.id = existingUser.userId;
        thisLogin.firstName = existingUser.firstName;
        thisLogin.lastName = existingUser.lastName;
        thisLogin.email = existingUser.email;
        thisLogin.password = existingUser.password;

        loginData.unshift(thisLogin);
        next();
    
    } else {
        const signupInfo = {"message": "This user does not exist. Please check your email or create an account to continue."};
        res.render("login.ejs", {signupInfo});
    }
}


app.get("/", (req, res) => {
    const featuredBlogs = allBlogs.filter(blog => blog.featured === "yes")
    res.render("index.ejs", {categories, thisLogin, allBlogs: featuredBlogs});
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {thisLogin});
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

// Handle logout
app.get("/logout", (req, res) => {
    const userIndex = loginData.findIndex(user => user.email === thisLogin.email && user.password === thisLogin.password);

    if (userIndex !== -1) {
        loginData.splice(userIndex, 1);
        console.log(`User with email ${thisLogin.email} has successfully logged out.`)

        thisLogin.id = "";
        thisLogin.firstName = "";
        thisLogin.lastName = "";
        thisLogin.email = "";
        thisLogin.password = "";
    }
    
    res.redirect("/");
});

// Handle account creation
app.post("/signup", (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const existingUser = userAccounts.find(user => user.email === email);

    if (existingUser) {
        const alreadyExists = {
            "message": `An account with email ${email} already exists. Please use a different email or login if you already have an account.`
        }
        return res.status(400).render("signup.ejs", {alreadyExists});
    }

    const newUser = {
        userId: slugGen(email),
        firstName, 
        lastName, 
        email, 
        password
    }
    
    userAccounts.unshift(newUser);
    res.redirect("/login");
});

// Get the form for a new blog post
app.get("/new-blog", (req, res) => {
    res.render("new-blog.ejs", {thisLogin, allBlogs});
});


app.post("/new-blog", passwordGate, (req, res) => {
    res.render("new-blog.ejs", {thisLogin, allBlogs});
});

// Show all blogs
app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", {thisLogin, allBlogs, categories});
});

// Show only blogs of the same sub-category
app.get("/blogs/category/:catSlug/:subCatSlug", (req, res) => {
    const catSlug = req.params.catSlug;
    const subCatSlug = req.params.subCatSlug;

    const thisCategory = categories.find(category => category.catSlug === catSlug);
    const thisSubCategory = subCategories.find(subCategory => subCategory.subCatSlug === subCatSlug);

    const thisSubCategoryBlogs = allBlogs.filter(blog => blog.blogCategory === thisCategory.catName && blog.subCategory === thisSubCategory.subCatName);

    res.render("blogs.ejs", { allBlogs: thisSubCategoryBlogs, thisLogin, categories });
});

// Show only blogs of the same category
app.get("/blogs/category/:catSlug", (req, res) => {
    const catSlug = req.params.catSlug;
    const thisCategory = categories.find(category => category.catSlug === catSlug);

    const thisCategoryBlogs = allBlogs.filter(blog => blog.blogCategory === thisCategory.catName);

    res.render("blogs.ejs", { allBlogs: thisCategoryBlogs, thisLogin, categories });
});

// Add a new blog post to all blogs
app.post("/blogs", (req, res) => {
    const {blogTitle, category, subCategory, heroImage, blogBody, tags, writtenBy, contactEmail, createDate} = req.body;

    if (!blogTitle || !blogBody || !category) {
        return res.status(400).send("Title, category, and content are required!");
    }

    function generateBlogCategory(category) {
        if (category == "Humanity") {
            return "The Human Lens";             //Mask Humanity with The Human Lens
        } else if (category == "Civilization & Power") {
            return "The World We Build";        //Mask
        } else if (category == "Science, Technology & the Future") {
            return "Tomorrow's Mind";           //Mask
        } else {
            return "Becoming You";              //Mask
        }
    }
    
    const blogCategory = generateBlogCategory(category);

    const newBlog = {
        slug: Date.now() + "-" + slugGen(blogTitle),
        title: blogTitle,
        blogCategory,
        subCategory,
        heroImage,
        blogBody,
        tags: tags.split(',').map(tag => tag.trim()),
        createDate,
        writtenBy, 
        contactEmail,
        publishedAt: new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
        }),
        featured: null,
        lastEditedDate: null,
        comments: [],
        likes: [],
        dislikes: [],
        favourites: []
    }

    console.log(newBlog.slug);

    const thisPost = allBlogs.findIndex(post => post.slug === newBlog.slug);
    
    if (thisPost !== -1) {
        res.alert("A blog post with this title already exists. Please choose a different title.");
    } else {
        allBlogs.unshift(newBlog);
    }
    
    res.status(200).json({
      message: "Blog created successfully!",
      blog: newBlog
    });
});

// View a specific blog post
app.get("/blogs/:slug", (req, res) => {
    
    const slug = req.params.slug;
    const thisPost = allBlogs.find(post => post.slug === slug);

    if (!thisPost) {
        return res.status(404).send("Blog not found");
    }
    
    res.render("blog-view.ejs", { thisPost, thisLogin });
});

// Comment on a blog post
app.post("/blogs/:slug/comments", async(req, res,) => {
   
    const slug = req.params.slug;
    
    const { comment } = req.body;
    const thisPost = allBlogs.find(post => post.slug === slug);
    
    if (!thisPost) {
        return res.status(404).send("Blog not found");
    }

    if (!thisPost.comments) {
        thisPost.comments = [];
    }

    const newComment = {
        comment,
        commentBy: `${thisLogin.firstName} ${thisLogin.lastName}`,
        commentById: thisLogin.id || null,
        time: new Date().toLocaleDateString(undefined, {
            // weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }),
        likes: [],
        dislikes: [],
        favourites: []
    }

    thisPost.comments.unshift(newComment);
    return res.json(newComment);
});

// Like a blog post
app.post("/blogs/:slug/like", (req, res) => {

    const thisPost = allBlogs.find(post => post.slug === req.params.slug);
    if (!thisPost) return res.status(404).send("Blog post not found");

    if (!thisPost.likes.includes(thisLogin.id)) {
        thisPost.likes.push(thisLogin.id);
        thisPost.dislikes = thisPost.dislikes.filter(user => user !== thisLogin.id); // remove dislike if present
    }
    res.json({ likes: thisPost.likes.length, dislikes: thisPost.dislikes.length });
});

// Dislike a blog post
app.post("/blogs/:slug/dislike", (req, res) => {

    const thisPost = allBlogs.find(post => post.slug === req.params.slug);
    if (!thisPost) return res.status(404).send("Blog post not found");

    if (!thisPost.dislikes.includes(thisLogin.id)) {
        thisPost.dislikes.push(thisLogin.id);
        thisPost.likes = thisPost.likes.filter(user => user !== thisLogin.id); // remove like if present
    }
    res.json({ likes: thisPost.likes.length, dislikes: thisPost.dislikes.length });
});

// Favorite a blog post
app.post("/blogs/:slug/favorite", (req, res) => {
    const thisPost = allBlogs.find(post => post.slug === req.params.slug);
    if (!thisPost) return res.status(404).send("Blog post not found");

    if (!thisPost.favorites.includes(thisLogin)) {
        thisPost.favorites.push(thisLogin);
    } else {
        thisPost.favorites = thisPost.favorites.filter(user => user !== thisLogin); // toggle off
    }
    res.json({ favorites: thisPost.favorites.length });
});

// Delete a specific blog post
app.delete("/blogs/:slug", (req, res) => {
    const { slug } = req.params;

    // Find the blog index
    const index = allBlogs.findIndex(blog => blog.slug === slug);

    if (index === -1) {
        return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Remove blog from array
    allBlogs.splice(index, 1);

    res.json({ success: true, message: "Blog deleted successfully" });
});

// Show the blog post in the edit form
app.get("/blogs/:slug/edit", (req, res) => {
    const slug = req.params.slug;
    const thisPost = allBlogs.find(post => post.slug === slug);

    if (!thisPost) {
        return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.render("edit-blog.ejs", { thisPost, thisLogin, allBlogs });
});

// Handle the blog post update
app.patch("/blogs/:slug/edit", (req, res) => {
    const slug = req.params.slug;

    const thisPost = allBlogs.find(post => post.slug === slug);

    if (!thisPost) {
        return res.status(404).send("Blog not found");
    }

    // Update only editable fields
    thisPost.title = req.body.blogTitle || thisPost.title;
    thisPost.category = req.body.category || thisPost.category;
    thisPost.subCategory = req.body.subCategory || thisPost.subCategory;
    thisPost.heroImage = req.body.heroImage || thisPost.heroImage;
    thisPost.blogBody = req.body.blogBody || thisPost.blogBody;
    thisPost.tags = req.body.tags ? req.body.tags.split(",").map(t => t.trim()) : thisPost.tags;
    thisPost.featured = req.body.featured || thisPost.featured;
    thisPost.lastEditedDate = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
        });

    const existingPost = allBlogs.findIndex(post => post.slug === thisPost.slug);
    
    if (existingPost !== -1) {
        allBlogs[existingPost] = thisPost;
    }

    res.status(200).json({ 
      message: "Post updated successfully", 
      redirectUrl: `/blogs/${slug}` 
    });
});








app.listen(port, () => {
    console.log(`Your blog server is running on port ${port}.`);
});