import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [refreshBlogs, setRefreshBlogs] = useState(false);
    const [notification, setNotification] = useState(null);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // blog
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    /**
     * Fetch all blogs
     */
    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) => {
                blogs.sort((a, b) => b.likes - a.likes);
                return blogs;
            })
            .then((blogs) => setBlogs(blogs));
    }, [refreshBlogs]);

    /**
     * Check if we have a logged in user in the local storage.
     */
    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem('loggedInUser');

        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('logging in with: ', username, password);

        try {
            const user = await loginService.login({
                username,
                password,
            });
            blogService.setToken(user.token);
            setUser(user);
            setUserName('');
            setPassword('');
            console.log(user);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
        } catch (exception) {
            setNotification({
                type: 'error',
                text: 'Wrong credentials. Either the username or password is wrong.',
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        }
    };

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedInUser');
        setUser(null);
    };

    const newBlogFormRef = useRef();
    const blogForm = () => (
        <Togglable buttonLabel="create new blog" ref={newBlogFormRef}>
            <NewBlogForm
                onSubmit={addBlog}
                title={title}
                handleTitleChange={setTitle}
                author={author}
                handleAuthorChange={setAuthor}
                url={url}
                handleUrlChange={setUrl}
            />
        </Togglable>
    );

    const addBlog = async (event) => {
        event.preventDefault();

        if (!title || !url) {
            console.log('no title || url');
            setNotification({
                type: 'error',
                text: 'Blog title and url are required.',
            });
            setTimeout(() => {
                setNotification(null);
            }, 3000);
            return null;
        }

        try {
            // Reach inside newBlogForm and call the toggleVisibility function.
            newBlogFormRef.current.toggleVisiblity();
            const newBlog = await blogService.createBlog({
                title,
                author,
                url,
            });

            console.log('newBlog: ', newBlog);
            setBlogs(blogs.concat(newBlog));
            setRefreshBlogs(!refreshBlogs);
            setNotification({
                text: `a new blog ${title} by ${author} added.`,
                type: 'success',
            });
            setTimeout(() => {
                setNotification(null);
            }, 1000);
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (exception) {
            console.log(exception);
        }
    };

    /**
     * Blog actions
     */
    // Like
    const handleLikeClick = async (blog) => {
        const likedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };

        await blogService.updateBlog(likedBlog);
        setRefreshBlogs(!refreshBlogs);
    };

    // Delete
    const handleDelete = async (blog) => {
        blogService.setToken(user.token);
        await blogService.deleteBlog(blog);
        setRefreshBlogs(!refreshBlogs);
    };

    return (
        <div>
            {!user && (
                <div>
                    <h2>Log in to blogList application</h2>
                    <Notification notification={notification} />
                    <LoginForm
                        handleLogin={handleLogin}
                        username={username}
                        setUserName={setUserName}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
            )}
            {user && (
                <div>
                    <h2>blogs</h2>
                    <Notification notification={notification} />
                    <p>{user.name} logged in.</p>
                    <button onClick={() => handleLogout()}> logout </button>
                    <h2> create new </h2>
                    {blogForm()}
                    <h2>Blogs</h2>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            handleLikeClick={() => handleLikeClick(blog)}
                            handleDelete={() => handleDelete(blog)}
                            loggedInUser={user}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
