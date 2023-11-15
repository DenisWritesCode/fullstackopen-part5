import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('logging in with: ', username, password);

        try {
            const user = await loginService.login({
                username,
                password,
            });
            setUser(user);
            setUserName('');
            setPassword('');
            console.log(user);
        } catch (exception) {
            console.log(exception);
            // setTimeout(() => {

            // })
        }
    };

    return (
        <div>
            {!user && (
                <div>
                    <h2>Log in to blogList application</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            username
                            <input
                                type="text"
                                value={username}
                                name="Username"
                                onChange={({ target }) =>
                                    setUserName(target.value)
                                }
                            />
                        </div>
                        <div>
                            password
                            <input
                                type="password"
                                value={password}
                                name="Password"
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                            />
                        </div>
                        <button type="submit">login</button>
                    </form>
                </div>
            )}
            {user && (
                <div>
                    <h2>blogs</h2>
                    <p>{user.name} logged in.</p>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
