// Step 2: Create an initial array of quote objects
let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Do or do not. There is no try.", category: "Inspiration" },
    { text: "Simplicity is the soul of efficiency.", category: "Work" },
  ];
  
  // Step 2: Show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available. Add some!";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — (${quote.category})`;
  }
  
  // Step 2: Listen for DOM load and setup events
  document.addEventListener('DOMContentLoaded', () => {
    const newQuoteBtn = document.getElementById('newQuote');
    newQuoteBtn.addEventListener('click', showRandomQuote);
  });
  
  // Step 3: Function to add a new quote from input
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    const quoteText = textInput.value.trim();
    const quoteCategory = categoryInput.value.trim();
  
    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both quote and category.");
      return;
    }
  
    // Create new quote object and add to quotes array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
  
    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
  
    // Provide user feedback
    alert("Quote added successfully!");
  }
  