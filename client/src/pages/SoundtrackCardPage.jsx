// needed imports
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SoundtrackCardPage() {
    // displays the soundctrack card page to the user 
    
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const {id}= useParams(); // 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/cards/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}` // get the token from the header 
                }
            });
            const result = await response.json();
            setCard(result.card); // store/save in state
          } catch (err) {
            console.error("Error fetching data:", err);
          }
        };
    
        fetchData();
      }, [id]);

    if (!card) return <div>Loading...</div>;

    return (
        <div>
            <img src={card.characterImage} alt={card.superheroName} />
            <h1>{card.superheroName} </h1>
            <h2>{card.characterRealName}</h2>
            <iframe
                src={card.spotifyPlaylist.replace(
                    'open.spotify.com/playlist',
                    'open.spotify.com/embed/playlist'
                )}
                width="100%"
                height="380"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
            <img src={card.moodBoard} alt="moodboard pictures"/>
            <p>{card.characterQuote}</p>
            <p>{card.fanficNotes}</p>
            <p>{card.vibeTags}</p>
            <p>{card.personalReview}</p>
            <img src={card.mediaPoster} alt="media poster"/>

            <button onClick={() => navigate(`/edit/${card._id}`)}>Edit Card</button>
        </div>
    );
};

export default SoundtrackCardPage;