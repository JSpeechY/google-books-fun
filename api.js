export const getBooks = async (searchTerm) => {
    const responsePromise = fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`
    );

    const response = await responsePromise;
    const json = await response.json();
    return json;
};
