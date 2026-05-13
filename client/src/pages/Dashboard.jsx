import React, {useState, useEffect} from 'react';
import CardPreview from '../components/CardPreview'; // import the CardPreview function
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    // create a state variable with a empty array 
    // fetch the cards relative path with useEffect with the token in the header
    // store response in card state variable 
    // temp: display the cards with only the superhero name 

    // start state variable with an empty array 
    const [cards, setCards] = useState([]);
    const [refresh, setRefresh] = useState(0); // help the dashboard refetch cards after deleting a card
    const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
        <h1>Dashboard Page</h1>
        <h2>Welcome back, {localStorage.getItem('username')}</h2>

        <button onClick={() => navigate('/cardCreation')}>Create a Card</button>
        {cards.map(card => (
            <CardPreview key={card._id} card={card} onDelete={() => SetRefresh(prev => prev + 1)}/> // passes functions and card object as prop
        ))}

        <p>You currently have {cards.length} Soundtrack Card(s)</p>
        {cards.length === 0 &&
          <p>You universe is waiting. Create you First Soundtrack Card</p>}

        <button onClick={handleLogout}>Log Out</button>
    </div>
  );

};

export default DashboardPage;