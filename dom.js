import { getBooks } from "./api.js";

const pageForm = document.querySelector("#pageForm");

const defaultImage = new Image(128, 190);
defaultImage.src = "./book-na-1.jpg";

const createBookCard = (bookObj) => {
    const bookImage = bookObj.imageLinks?.smallThumbnail
        ? bookObj.imageLinks.smallThumbnail
        : "https://www.doakgolf.com/wp-content/uploads/book-na-1.jpg";

    const bookTitle = bookObj.title ?? `Could not find book title`;
    const bookAuthors = bookObj.authors
        ? bookObj.authors.join(", ")
        : `Author(s) could not be found.`;
    let bookDescription =
        bookObj.description ?? `A description of this book could not be found.`;
    if (bookDescription.length > 200) {
        bookDescription = `${bookDescription.substring(0, 200)}..`;
    }
    console.log(bookDescription);

    return `
        <div class="card">
            <img class="card_image" src="${bookImage}" alt="Book Cover">
            <div class=card_nestedContainer">
            <h2 class="card_title">${bookTitle}</h2>
            <p class="card_authors">${bookAuthors}</p>
            </div>
            <p class="card_description">${bookDescription}</p>
        </div>
    `;
};

pageForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const searchTerm = formData.get("searchTerm");
    const bookResponse = await getBooks(searchTerm);
    const bookItems = bookResponse.items;
    const bookItemsInfo = bookItems.map((book) => book.volumeInfo);
    console.log(bookItemsInfo);
    const bookCards = bookItemsInfo.map(createBookCard);
    const booksOutputElement = document.querySelector("#books");
    booksOutputElement.innerHTML = bookCards.join("");
});
