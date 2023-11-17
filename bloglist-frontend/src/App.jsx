import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState(null);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // new blog
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [isNewBlogFormVisible, setIsNewBlogFormVisible] = useState(false);

    /**
     * Fetch all blogs
     */
    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

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

    // Generate login form
    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUserName(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const createNewBlog = async (event) => {
        event.preventDefault();

        setNotification({
            type: 'error',
            text: 'Test Blog title and url are required.',
        });
        setTimeout(() => {
            setNotification(null);
        }, 3000);

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
            const newBlog = await blogService.createBlog({
                title,
                author,
                url,
            });
            setBlogs(blogs.concat(newBlog));
            setNotification({
                text: `a new blog ${title} by ${author} added.`,
                type: 'success',
            });
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (exception) {
            console.log(exception);
        }
    };
    // Generate new blog form
    const newBlogForm = () => (
        <form onSubmit={createNewBlog}>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Title: "
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:{' '}
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url:{' '}
                <input
                    type="text"
                    value={url}
                    name="Url: "
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    );

    return (
        <div>
            {!user && (
                <div>
                    <h2>Log in to blogList application</h2>
                    <Notification notification={notification} />
                    {loginForm()}
                </div>
            )}
            {user && (
                <div>
                    <h2>blogs</h2>
                    <Notification notification={notification} />
                    <p>{user.name} logged in.</p>{' '}
                    <button onClick={() => handleLogout()}> logout </button>
                    <h2> create new </h2>
                    {!isNewBlogFormVisible && (
                        <button onClick={() => setIsNewBlogFormVisible(true)}>
                            create new blog
                        </button>
                    )}
                    {isNewBlogFormVisible && (
                        <div>
                            {newBlogForm()}
                            <button
                                onClick={() => setIsNewBlogFormVisible(false)}
                            >
                                cancel
                            </button>
                        </div>
                    )}
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
