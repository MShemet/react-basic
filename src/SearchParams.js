import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  const changeLocation = (e) => {
    setLocation(e.target.value);
  };

  const changeAnimal = (e) => {
    setAnimal(e.target.value);
    setBreed('');
  };

  const changeBreed = (e) => {
    setBreed(e.target.value);
  };

  const requestPets = async () => {
    const url = `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;

    const res = await fetch(url);
    const json = await res.json();

    setPets(json.pets);
  };

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = (e) => {
    e.preventDefault();
    requestPets();
  };

  return (
    <div className="search-params">
      <form onSubmit={submitForm}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={changeLocation}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={changeAnimal}
            onBlur={changeAnimal}
          >
            <option></option>

            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={changeBreed}
            onBlur={changeBreed}
          >
            <option></option>

            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
