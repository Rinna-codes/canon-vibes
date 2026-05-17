// a component will recieve a card object as a prop 
// props are how data is passed from the parent component to the child component

// <CardPreview card={card} /> // Each card data will pass through this code
import { useNavigate } from 'react-router-dom';

const CardPreview = ({card, onDelete}) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            });

            if (!response.ok) {
                throw new Error('Failed to create card');
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