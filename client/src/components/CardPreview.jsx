// <CardPreview card={card} /> // So that each card data will pass through this code
import { useNavigate } from 'react-router-dom';

const CardPreview = ({card, onDelete}) => {
    // displays a card preview 
    // superhero name, delete button, superhero image

    const navigate = useNavigate();

    const handleDelete = async () => {
        // get card id to delete 
        try {
            const response = await fetch(`/api/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            });

            if (!response.ok) {
                throw new Error('Failed to delete card');
            }

            const data = await response.json();
            onDelete();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div onClick= {() => navigate(`/cards/${card._id}`)} 
        style = {{cursor : 'pointer'}}
        >
            <h1>{card.superheroName}</h1>
            <button onClick={(e) => {
                e.stopPropagation(); // stops from occuring when card is clicked on
                handleDelete();
            }}>Delete Card</button>
            <img src={card.characterImage} alt="Superhero Name"></img>
        </div>
    )
};

export default CardPreview;