const quotes = [
    {
        text: "The computer was born to solve problems that did not exist before.",
        author: "Bill Gates",
        context: "On the recursive nature of computer science problems"
    },
    {
        text: "Sometimes it is the people no one can imagine anything of who do the things no one can imagine.",
        author: "Alan Turing",
        context: "On breaking barriers and defying expectations"
    },
    {
        text: "If you think you understand quantum mechanics, you don't understand quantum mechanics.",
        author: "Richard Feynman",
        context: "On the inherent complexity of quantum physics"
    },
    {
        text: "Stay hungry, stay foolish.",
        author: "Steve Jobs",
        context: "Stanford commencement speech, 2005"
    },
    {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay",
        context: "On innovation and creativity"
    },
    {
        text: "The question of whether computers can think is like the question of whether submarines can swim.",
        author: "Edsger W. Dijkstra",
        context: "On artificial intelligence"
    }
    // Add more quotes as needed
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to update the quote
function updateQuote() {
    const quote = getRandomQuote();
    document.querySelector('.quote-text').textContent = `"${quote.text}"`;
    document.querySelector('.quote-author').textContent = `— ${quote.author}`;
    document.querySelector('.quote-context').textContent = quote.context;
}

// Update quote when page loads
document.addEventListener('DOMContentLoaded', updateQuote);

// Update quote when clicked
document.querySelector('.quotes-container').addEventListener('click', () => {
    updateQuote();
    // Add a subtle fade animation
    const quoteElement = document.querySelector('.quote');
    quoteElement.style.opacity = '0';
    setTimeout(() => {
        quoteElement.style.opacity = '1';
    }, 300);
}); 