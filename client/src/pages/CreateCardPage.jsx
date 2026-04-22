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

    const handleChange = (e) => { // genaric object handler for all fields
        const {name, value} = e.target; // follows "formData, setFormData"
        setFormData({...formData, [name] : value}); // [name] is dynamic, use whichever field name is updated ONLY
    };

    const navigate = useNavigate()

    return (
        <diiv>
            <h1>Card Creation Completed!</h1>
        </diiv>
    );
}

export default CreateCardForm;