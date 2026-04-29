import React, {useState, useEffect} from 'react';
import CardPreview from '../components/CardPreview'; // import the CardPreview function

const DashboardPage = () => {
    // create a state variable with a empty array 
    // fetch the cards relative path with useEffect with the token in the header
    // store response in card state variable 
    // temp: display the cards with only the superhero name 

    // start state variable with an empty array 
    const [cards, setCards] = useState([]);
    const [refresh, SetRefresh] = useState(0); // help the dashboard refetch cards after deleting a card

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cards', {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` // get the token from the header 
            }
        });
        const result = await response.json();
        setCards(result); // store/save in state
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [refresh]); // refresh the page after any changes to the cards on dashboard

  return (
    <div>
        <h1>Dashboard Page</h1>
        {cards.map(card => (
            <CardPreview key={card._id} card={card} onDelete={() => SetRefresh(prev => prev + 1)}/> // passes functions and card object as prop
        ))}
    </div>
  );

};

export default DashboardPage;