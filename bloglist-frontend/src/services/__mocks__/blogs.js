const blogs = [
    {
        title: 'blog 1',
        author: 'author 1',
        url: 'url 1',
        likes: 1,
        user: {
            username: 'user 1',
            name: 'User 1',
            _id: '111111'
        },
        _id: '1'
    },
    {
        title: 'blog 2',
        author: 'author 3',
        url: 'url 2',
        likes: 2,
        user: {
            username: 'user 2',
            name: 'User 2',
            _id: '222222'
        },
        _id: '2'
    }
]

const getAll = async () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }