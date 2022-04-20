// import { Component, lazy } from 'react';
import { Component } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import Modal from './Modal';
import { PetAPIResponse, Animal } from './APIResponsesTypes';

// const Modal = lazy(() => import('./Modal'));

class Details extends Component<{ params: { id?: string } }> {
  // constructor() {
  //   super();

  //   this.state = { loading: true };
  // }

  state = {
    loading: true,
    showModal: false,
    animal: '' as Animal,
    breed: '',
    city: '',
    state: '',
    description: '',
    name: '',
    images: [] as string[],
  };

  async componentDidMount() {
    if (!this.props.params.id) {
      this.setState({ loading: false });
      return;
    }

    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = (await res.json()) as PetAPIResponse;

    this.setState({ loading: false, ...json.pets[0] });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />

        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>

          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>

          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>

              <div className="buttons">
                <a href="https://bit.ly/pet-adopt">Yes</a>

                <button onClick={this.toggleModal}>No</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();

  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
