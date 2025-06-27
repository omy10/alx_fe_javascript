// Initialize quotes from localStorage or default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do one thing every day that scares you.", category: "Courage" }
  ];
  
  // DOM Elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");
  const importInput = document.getElementById("importFile");
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Load last category filter if available
  let selectedCategory = localStorage.getItem("selectedCategory") || "all";
  
  // Show a random quote
  function showRandomQuote() {
    const filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "No quotes available for this category.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.innerHTML = filteredQuotes[randomIndex].text;
  }
  
  // Add a new quote
  function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
  
    if (text && category) {
      const newQuote = { text, category };
      quotes.push(newQuote);
      saveQuotes();
      newQuoteText.value = "";
      newQuoteCategory.value = "";
      populateCategories(); // update categories
      alert("Quote added successfully!");
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Export quotes to JSON
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Import quotes from JSON
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          populateCategories();
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid file format.");
        }
      } catch {
        alert("Could not parse the file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Filter quotes based on category
  function filterQuotes() {
    selectedCategory = categoryFilter.value;
    localStorage.setItem("selectedCategory", selectedCategory);
    showRandomQuote();
  }
  
  // 🟨 Populate categories using map() — this fixes the missing "map" error
  function populateCategories() {
    const uniqueCategories = ["all"];
  
    quotes.forEach(q => {
      if (!uniqueCategories.includes(q.category)) {
        uniqueCategories.push(q.category);
      }
    });
  
    categoryFilter.innerHTML = "";
  
    const options = uniqueCategories.map(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      return option;
    });
  
    options.forEach(opt => categoryFilter.appendChild(opt));
    categoryFilter.value = selectedCategory;
  }
  
  // Initial load
  document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    showRandomQuote();
    newQuoteBtn.addEventListener("click", showRandomQuote);
    if (importInput) importInput.addEventListener("change", importFromJsonFile);
  });
  