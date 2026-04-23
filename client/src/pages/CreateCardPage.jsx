import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';

// TODO: Start working on creating the character search bar feature of the card creation form 

function CreateCardForm() {
    const [formData, setFormData] = useState({
        superheroName: '',
        characterRealName: '',
        comicVineID: '',
        characterImage: '',
        spotifyPlaylist: '',
        vibeTags: [],
        characterQuote: '',
        fanficNotes: '',
        mediaPoster: '',
        personalReview: '',
        characterVersion: '',
        moodBoard: []
    });

    const [searchQuery, setSearchQuery] = useState(''); // saves the users search query for a charater
    const [searchResult, setSearchResult] = useState([]); // saves the array of characters from the users search query

    const handleSearch = async (e) => {
        // fetches the character/search query with the token at the header
        // store the results in the searchResult list 
        e.preventDefault(); // prevents the web page from reloading when called 

        try {
            const response = await fetch(`/api/characters/search?name=${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not OKAY');
            }

            const data = await response.json();
            setSearchResult(data); // saves the several results into the list
        } catch (error) {
            console.error('Error in fetching the search results, sorry! 😔');
        }
    };

    const handleSelectCharacter = (character) => {
        setFormData(prev => ({
            ...prev, // spread the exisiting state, keeping everything already in formData

            // but replace these specific fields will update when user searches for character
            superheroName: character.name,
            characterRealName: character.real_name,
            comicVineID: character.id,
            characterImage: character.image.medium_url,
            // TODO: update in adding the rest of the form fields 
        }));

        setSearchResult([]);
    };

    const handleChange = (e) => { // genaric object handler for all fields
        const {name, value} = e.target; // follows "formData, setFormData"
        setFormData({...formData, [name] : value}); // [name] is dynamic, use whichever field name is updated ONLY
    };

    const navigate = useNavigate()

    return (
        <div>
            <input
            type="text"
            value = {searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search characers..."
            />
            <button onClick={handleSearch}>Search</button>

            {/* Shows the result from query search */}
            <ul>
                {searchResult.map(character => (
                    <li key={character.id} onClick={() => handleSelectCharacter(character)}>{character.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default CreateCardForm;