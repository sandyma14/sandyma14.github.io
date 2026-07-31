
// Function to add a new row of author input fields
function addAuthorRow() {
    // 1. Get the container where the author rows live
    const container = document.getElementById("authorContainer");

    // 2. Create a new div to act as the row
    const newRow = document.createElement("div");
    newRow.className = "author-row";

    // 3. Create the First Name input
    const firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.placeholder = "First name";
    firstNameInput.className = "authorFirst"; // Using class instead of ID since there will be multiple

    // 4. Create the Last Name input
    const lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.placeholder = "Last name";
    lastNameInput.className = "authorLast";

    // 5. Create a Remove button for this specific row
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";
    
    // Function to remove this specific row when clicked
    removeButton.onclick = function() {
        container.removeChild(newRow);
    };

    // 6. Append the new inputs and button to the new row
    newRow.appendChild(document.createElement("label")).textContent = "Author: "; // Optional label
    newRow.appendChild(firstNameInput);
    newRow.appendChild(lastNameInput);
    newRow.appendChild(removeButton);

    // 7. Append the entire new row to the main container
    container.appendChild(newRow);
}

function generateCitation() {
    // 1. Gather dynamically added authors
    const container = document.getElementById("authorContainer");
    const rows = container.getElementsByClassName("author-row");
    const authorsArray = [];

    for (let i = 0; i < rows.length; i++) {
        const firstInput = rows[i].querySelector(".authorFirst");
        const lastInput = rows[i].querySelector(".authorLast");
        
        const firstVal = firstInput ? firstInput.value.trim() : "";
        const lastVal = lastInput ? lastInput.value.trim() : "";

        // Only include this author if at least one name field is filled out
        if (firstVal || lastVal) {
            authorsArray.push(capitalize(firstVal));
            authorsArray.push(capitalize(lastVal));
        }
    }

    const numAuthors = authorsArray.length / 2;
    let formattedAuthors = "";
    if (numAuthors > 0) {
        // Formats and adds a trailing space so the next field doesn't bunch up
        formattedAuthors = formatAuthors(authorsArray, numAuthors) + " "; 
    }

    // 2. Gather Title of Article
    const articleInput = document.getElementById("title");
    const formattedArticle = articleInput && articleInput.value.trim() 
        ? `"${articleInput.value.trim()}." ` 
        : "";

    // 3. Gather Title of Website
    const websiteInput = document.getElementById("websiteName");
    const formattedWebsite = websiteInput && websiteInput.value.trim() 
        ? `<em>${websiteInput.value.trim()}</em>, ` // Added <em> tags here
        : "";

    // 4. Gather URL
    const urlInput = document.getElementById("url");
    const formattedURL = urlInput && urlInput.value.trim() 
        ? `${urlInput.value.trim()}. ` 
        : "";

    // 5. Gather & parse Date Accessed (handles HTML5 date picker "yyyy-mm-dd")
    const dateAccessedInput = document.getElementById("dateAccessed");
    let formattedDate = "";
    if (dateAccessedInput && dateAccessedInput.value) {
        const [year, month, day] = dateAccessedInput.value.split("-").map(Number);
        formattedDate = formatDate(year, month, day);
    }

    // 6. Combine all sections
    const finalCitation = formattedAuthors + formattedArticle + formattedWebsite + formattedURL + formattedDate;

    // 7. Output to your citation preview div
    const previewContainer = document.getElementById("citationPreview");
    if (previewContainer) {
        // Change .textContent to .innerHTML so the <em> tags actually render
        previewContainer.innerHTML = finalCitation.trim(); 
    }
}


// Capitalizes the first letter of a name
function capitalize(word) {
    if (!word) return "";
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
}

// Formats authors based on the count (1, 2, or 3+)
function formatAuthors(authors, nA) {
    if (nA === 1) {
        return authors[1] + ", " + authors[0] + ".";
    } else if (nA === 2) {
        return authors[1] + ", " + authors[0] + " and " + authors[2] + " " + authors[3] + ".";
    } else {
        return authors[1] + ", " + authors[0] + " et al.";
    }
}

// Formats the Accessed Date into standard MLA (e.g., "Accessed 15 July 2026.")
function formatDate(y, m, d) {
    const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July",
                    "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
    const monthStr = months[m - 1];
    return "Accessed " + d + " " + monthStr + " " + y + ".";
}