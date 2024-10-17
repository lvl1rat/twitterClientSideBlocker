// Initialize blocked users as an empty array

const blockedUsers = [];

// Function to fetch blocked users from Twitter
async function fetchBlockedUsers() {
    const blockedUsersUrl = 'https://x.com/settings/blocked/all';
    
    // Fetch the blocked users page
    const response = await fetch(blockedUsersUrl, {
        method: 'GET',
        credentials: 'include', // Include credentials for logged in session
    });

    if (response.ok) {
        const text = await response.text();

        // Create a temporary DOM element to parse the response
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Select all user elements from the parsed document
        const userElements = doc.querySelectorAll('[data-testid="UserCell"]');

        // Iterate through each user element and extract usernames
        userElements.forEach((element) => {
            const userName = element.querySelector('a[href^="/"]').getAttribute('href'); // Get href attribute
            if (userName && !blockedUsers.includes(userName)) {
                blockedUsers.push(userName); // Append to blockedUsers if not already present
            }
        });

        console.log('Blocked Users:', blockedUsers);
        return blockedUsers; // Return the populated array
    } else {
        console.error('Failed to fetch blocked users:', response.statusText);
        return []; // Return an empty array if fetch fails
    }
}

// Call the function and populate blockedUsers
fetchBlockedUsers().then(users => {
    console.log('Final Blocked Users:', users);
}).catch(error => {
    console.error('Error fetching blocked users:', error);
});
