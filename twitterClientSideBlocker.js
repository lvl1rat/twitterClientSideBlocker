
////////////////////////////////////////////////////////////////////////
const blockedUsers = []; // Add any other usernames you wish to block

// Function to block tweets from specified users
function blockUserTweets() {
    // Iterate over each blocked username
    blockedUsers.forEach(username => {
        // Select all span elements that could contain the usernames
        const userElements = document.querySelectorAll('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');

        userElements.forEach(userElement => {
            // Check if the text of the span matches the blocked username
            if (userElement.innerText === username) {
                // Navigate up to the article parent node
                const article = userElement.closest('article');
                if (article) {
                    // Hide or remove the article
                    article.style.display = 'none'; // or use article.remove();
                }
            }
        });
    });
}

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', blockUserTweets);

// Optional: Use MutationObserver if tweets are loaded dynamically
const observer = new MutationObserver(blockUserTweets);
observer.observe(document.body, { childList: true, subtree: true });