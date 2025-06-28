//i created a variable called post which will contain an object within an array
let posts = [
    {
        id: 1,
        title: "Getting Started with JavaScript",
        content: "JavaScript is a versatile programming language that runs in web browsers. It allows you to create interactive websites and web applications.",
        author: "Mulwa developer"
    },
    {
        id: 2,
        title: "CSS Fundamentals",
        content: "Cascading Style Sheets (CSS) is used to style HTML elements. Learn how to use selectors, properties, and values to create beautiful web pages.",
        author: "Hamida Designer"
    }
];
// i declared a variable that keeps track of which post is currently being used/interacted
let currentPostId = null;


// i linked the DOM elements with js
const postList = document.getElementById('p-lst');
const postContent = document.getElementById('p-cnt');
const editPostBtn = document.getElementById('edit-post');
const deletePostBtn = document.getElementById('delete-post');
const newPostForm = document.getElementById('new-post-form');

// Initialize the app
function init() {
    renderPostList();//displays all the post on the left side bar
    setupEventListeners();//sets up interactivity like add,edit and delete
    
    
    if (posts.length > 0) {//this shows the first post by default the one i just inputed
        showPostDetails(posts[0].id);
    }
}

// Render the list of posts
function renderPostList() {//i explained earlier
    postList.innerHTML = '<h2>Posts</h2>';//resets the contents
    
    if (posts.length === 0) {//checks if there is no post if post is empty it outputs the paragraph below
        postList.innerHTML += '<p>No posts available</p>';
        return;
    }
    
    posts.forEach(post => {//iterates through each posts array
        const postElement = document.createElement('div');//will store all posts info
        postElement.className = 'post-item';
        postElement.dataset.id = post.id;//stores the post id
        postElement.innerHTML = `//this basically popluates post contents
            <h3>${post.title}</h3>
            <p><em>By ${post.author}</em></p>
        `;
        postElement.addEventListener('click', () => showPostDetails(post.id));//i added a click handler
        postList.appendChild(postElement);//makes the content visible in the browser
    });
}

// Show post details
function showPostDetails(postId) {
    currentPostId = postId;
    const post = posts.find(p => p.id === postId);//uses an array to find matching post with id
    
    if (post) {//rendering through post content
        postContent.innerHTML = `
            <h3>${post.title}</h3> 
            <p><strong>By ${post.author}</strong></p>
            <p>${post.content}</p>
        `;
        
        // Show edit and delete buttons
        editPostBtn.classList.remove('hidden');//makes the button visible,i removed the hidden css class
        deletePostBtn.classList.remove('hidden');
    }
}

// Set up event listeners
function setupEventListeners() {
    // New post form submission
    newPostForm.addEventListener('submit', (e) => {
        e.preventDefault();//stops the website from reloading
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;
        
        const newPost = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            title,
            content,
            author
        };
        
        posts.push(newPost);
        renderPostList();//refreshes sidebar posts
        showPostDetails(newPost.id);//displays sidebar posts
        newPostForm.reset();
    });
    
    // Allows user to edit the post he just inputed that appears on the site
    editPostBtn.addEventListener('click', () => {//ataches to the edit button
        const post = posts.find(p => p.id === currentPostId);//locates posts being viewed
        if (post) {
            const newTitle = prompt("Enter new title:", post.title);
            const newContent = prompt("Enter new content:", post.content);
            const newAuthor = prompt("Enter new author:", post.author);
            //Validation
            //only updates if user did not cancel prompts by doing the null checks
            if (newTitle !== null && newContent !== null && newAuthor !== null) {
                post.title = newTitle;
                post.content = newContent;
                post.author = newAuthor;
                
                renderPostList();
                showPostDetails(post.id);
            }
        }
    });
    
    // Deletes user post once the delete button is clicked
    deletePostBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete this post?")) {
            posts = posts.filter(p => p.id !== currentPostId);
            renderPostList();
            
            postContent.innerHTML = '<p>Select a post to view details</p>';
            editPostBtn.classList.add('hidden');
            deletePostBtn.classList.add('hidden');
            
            if (posts.length > 0) {
                showPostDetails(posts[0].id);
            }
        }
    });
}

// This code launches the app when loaded
document.addEventListener('DOMContentLoaded', init);

