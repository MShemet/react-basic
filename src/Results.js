import Pet from './Pet';

const Results = ({ pets }) => {
  const petsList = pets.map((pet) => (
    <Pet
      name={pet.name}
      animal={pet.animal}
      breed={pet.breed}
      key={pet.id}
      images={pet.images}
      location={`${pet.city}, ${pet.state}`}
      id={pet.id}
    />
  ));

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {pets.length ? petsList : <h1>No pets found</h1>}
    </div>
  );
};

export default Results;
