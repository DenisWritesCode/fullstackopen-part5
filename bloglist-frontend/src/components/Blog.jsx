import { useState } from 'react';

const Blog = ({ blog }) => {
    const [showBlogDetails, setShowBlogDetails] = useState(false);

    const handleLikeClick = (blog) => {
        console.log('like clicked', blog);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };
    return (
        <div style={blogStyle}>
            <span>
                {blog.title} {blog.author}&nbsp;
                <button onClick={() => setShowBlogDetails(!showBlogDetails)}>
                    {showBlogDetails ? 'hide' : 'view'}
                </button>
            </span>
            {showBlogDetails && (
                <div>
                    <a href={blog.url}>{blog.url}</a>
                    <p>
                        likes {blog.likes}{' '}
                        <button onClick={(blog) => handleLikeClick(blog)}>
                            like
                        </button>
                    </p>
                    <p>{blog.user.username}</p>
                </div>
            )}
        </div>
    );
};

export default Blog;
