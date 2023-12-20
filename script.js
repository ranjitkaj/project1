function searchDictionary() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    if (input !== '') {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
            .then(response => response.json())
            .then(data => {
                const definitionContainer = document.getElementById('definition');
                if (Array.isArray(data) && data.length > 0) {
                    const meanings = data[0].meanings;
                    let definitionHTML = `<h2>${input.toUpperCase()}</h2>`;
                    meanings.forEach(meaning => {
                        definitionHTML += `<p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>`;
                    });
                    definitionContainer.innerHTML = definitionHTML;
                } else {
                    definitionContainer.innerHTML = `<p>No definition found for "${input}"</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const definitionContainer = document.getElementById('definition');
                definitionContainer.innerHTML = `<p>Sorry, something went wrong. Please try again later.</p>`;
            });
    } else {
        alert('Please enter a word to search.');
    }
}
