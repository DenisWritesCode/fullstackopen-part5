const NewBlogForm = ({
    onSubmit,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Title:
                <input
                    type="text"
                    value={title}
                    name="Title: "
                    onChange={({ target }) => handleTitleChange(target.value)}
                />
            </div>
            <div>
                Author:{' '}
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => handleAuthorChange(target.value)}
                />
            </div>
            <div>
                Url:{' '}
                <input
                    type="text"
                    value={url}
                    name="Url: "
                    onChange={({ target }) => handleUrlChange(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    );
};

export default NewBlogForm;
