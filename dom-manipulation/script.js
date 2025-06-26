// Step 1: Initial quotes array
let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Do or do not. There is no try.", category: "Inspiration" },
    { text: "Simplicity is the soul of efficiency.", category: "Work" },
  ];
  
  // Step 2: Declare reference to quote display container
  let quoteDisplay;
  
  // Step 3: Show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available. Add some!";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — (${quote.category})`;
  }
  
  // Step 4: Add a new quote
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    const quoteText = textInput.value.trim();
    const quoteCategory = categoryInput.value.trim();
  
    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
  
    textInput.value = "";
    categoryInput.value = "";
    alert("Quote added successfully!");
  }
  
  // Step 5: Setup event listeners on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    quoteDisplay = document.getElementById('quoteDisplay'); // ✅ Fixes the undefined reference
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  });
  