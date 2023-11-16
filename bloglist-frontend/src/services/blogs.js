import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

/**
 * Lists all blog posts
 */
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

/**
 * Create a new blog post
 */
const createBlog = async (newBlog) => {
    const authorization = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, authorization);
    return response.data;
};

export default { getAll, createBlog, setToken };
