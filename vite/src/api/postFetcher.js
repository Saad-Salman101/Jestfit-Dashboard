
const fetcher = (url, options) =>
    fetch(url, options).then((res) => res.json());

const postFetcher = (url, body) =>
    fetcher(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

export default postFetcher