const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const authorText = document.getElementById('author');
const loader = document.getElementById('loader');


let apiQuotes = [];

/// Show Loading

function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// Show new Quotes by the following function:

function newQuote() {
	// Pick a random quote from the apiQuotes array
	loading();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	if (!quote.author) {
		authorText.textContent = 'unknown';
	} else {
		authorText.textContent = quote.author;
	}

	if (quote.text.length > 50) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	// Set Quote, Hide Loader
	// Check quote length to determine the styling
	quoteText.textContent = quote.text;
	complete();
}

// Get Quotes from API

async function getQuotes() {
	loading();
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		console.log(error)
	}

}


// Tweet Quote

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
	// ^ _blank offers to open the windown in a new windown
}

/// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();