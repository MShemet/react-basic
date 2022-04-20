import {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
  ChangeEvent,
  FormEvent,
} from 'react';
import ThemeContext from './ThemeContext';
import useBreedList from './useBreedList';
import Results from './Results';
import { PetAPIResponse, Animal, Pet } from './APIResponsesTypes';

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams: FunctionComponent = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('' as Animal);
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const changeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const changeAnimal = (e: ChangeEvent<HTMLSelectElement>) => {
    setAnimal(e.target.value as Animal);
    setBreed('');
  };

  const changeBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  const changeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const requestPets = async () => {
    const url = `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;

    const res = await fetch(url);
    const json = (await res.json()) as PetAPIResponse;

    setPets(json.pets);
  };

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void requestPets();
  };

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        onSubmit={submitForm}
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            value={location}
            placeholder="Location"
            onChange={changeLocation}
            className="w-60 mb-5 block"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={changeAnimal}
            onBlur={changeAnimal}
            className="w-60 mb-5 block"
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
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={changeBreed}
            onBlur={changeBreed}
            className="w-60 mb-5 block disabled:opacity-50"
          >
            <option></option>

            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={theme}
            onChange={changeTheme}
            onBlur={changeTheme}
            className="w-60 mb-5 block"
          >
            <option value="peru">peru</option>
            <option value="darkBlue">darkBlue</option>
            <option value="chartreuse">chartreuse</option>
            <option value="mediumorchid">mediumorchid</option>
          </select>
        </label>

        <button
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
