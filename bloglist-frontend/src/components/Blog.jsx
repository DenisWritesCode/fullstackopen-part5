import { useState } from 'react';

const Blog = ({ blog, handleLikeClick, handleDelete, loggedInUser }) => {
    const [showBlogDetails, setShowBlogDetails] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    // check if the blog.user.id matches the currently logged in user and then show the delete button.
    const showDeleteButton =
        blog.user.username === loggedInUser.username ? true : false;

    const handleDeleteClick = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            handleDelete();
        }
    };
    return (
        <div style={blogStyle}>
            <span>
                Title: {blog.title} Author: {blog.author}&nbsp;
                <button onClick={() => setShowBlogDetails(!showBlogDetails)}>
                    {showBlogDetails ? 'hide' : 'view'}
                </button>
            </span>
            {showBlogDetails && (
                <div>
                    <p>
                        link: <a href={blog.url}>{blog.url}</a>
                    </p>
                    <p>
                        likes: {blog.likes}{' '}
                        <button onClick={handleLikeClick}>like</button>
                    </p>
                    <p>user created: {blog.user.name}</p>
                    {showDeleteButton && (
                        <button onClick={handleDeleteClick}>remove</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
