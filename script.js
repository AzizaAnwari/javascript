// Get quotes from API
let apiQuotes = [];
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let newQuoteBtn = document.getElementById('new-quote');
let twitterBtn = document.getElementById('twitter');
let quoteContainer = document.getElementById('quote-container');
let loader = document.getElementById('loader');

function newQuote(){
    showLoadingSpinner();
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Author text, when empty replace with unkown.
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else{
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
        // Catch error here
    }
}

// Function tweetQuote
function tweetQuote() {
    const twiterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twiterUrl,'_blank');
}

// Event Listners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// On load
getQuotes();

