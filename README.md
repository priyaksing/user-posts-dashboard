
User-Posts dashboard using Next.js, TypeScript and Tailwind

## Setup the application

Clone the repository
```bash
git clone https://github.com/priyaksing/user-posts-dashboard.git
```
Install the dependencies
```
npm install
```
Run the application locally
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Overview of the approach
- The default route **/** leads to the main dashboard page which display the list of users fetched from the endpoint https://jsonplaceholder.typicode.com/users
- Dashboard includes search feature to find users by name or email and sort feature to sort users by name or company name  
- When a user is selected, it redirects the route to **/posts/userId** to display the posts by the user selected
- In this component, posts are fetched from the endpoint https://jsonplaceholder.typicode.com/posts and paginated, wherein 4 posts will be displayed per page.
- State management is done using React built-in state, to efficient handle API errors.
