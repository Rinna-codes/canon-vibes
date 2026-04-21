// a component will recieve a card object as a prop 
// props are how data is passed from the parent component to the child component

// <CardPreview card={card} /> // Each card data will pass through this code

const CardPreview = ({card}) => {
    return (
        <div>
            <h1>{card.superheroName}</h1>
            <img src={card.characterImage} alt="Superhero Name"></img>
        </div>
    )
};

export default CardPreview;