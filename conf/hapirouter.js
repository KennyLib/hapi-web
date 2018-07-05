module.exports = () => {
    return [{
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.file('index.html');
        }
    }]
}