import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import { bind } from 'decko'; // eslint-disable-line no-unused-vars
import linkState from 'linkstate';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ImagePreview from '../../components/image-preview';

class NewPolish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      images: [],
      imageToUpload: '',
      imagePreviewUrl: '',
      error: null
    };
  }

  @bind
  upload(e) {
    e.preventDefault();
    this.props
      .gqlUploadImage({
        variables: {
          upload: this.state.imageToUpload,
          size: this.state.imageToUpload.size
        }
      })
      .then(response => {
        const url = response.data.uploadImage.url;
        this.setState(prevState => ({
          images: [...prevState.images, url],
          imageToUpload: '',
          imagePreviewUrl: ''
        }));
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  imagePreview(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageToUpload: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  @bind
  imageClear(e) {
    e.preventDefault();
    this.setState({
      imageToUpload: '',
      imagePreviewUrl: ''
    });
  }
  createPolish(e) {
    e.preventDefault();
    this.props
      .gqlCreatePolish({
        variables: {
          name: this.state.name,
          images: this.state.images
        }
      })
      .then(response => {
        const id = response.data.createPolish.id;
        this.props.history.push(`/polish/${id}`);
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render(props, { imagePreviewUrl, name, images }) {
    const imageUploder = imagePreviewUrl ? (
      <ImagePreview
        submit={this.upload}
        remove={this.imageClear}
        image={imagePreviewUrl}
      />
    ) : (
        <div class={style.newpolish__upload}>
          <input
            type="file"
            id="image"
            accept="image/*"
            capture="camera"
            class={style.newpolish__upload__input}
            onChange={e => this.imagePreview(e)}
          />
        </div>
      );
    const gallery = this.state.images.map((url, i) => (
      <img
        class={style.newpolish__thumbnail}
        src={url}
        key={`image-${i}`}
        alt={`New polish pic ${i}`}
      />
    ));
    const createPolish =
      name.length >= 1 && images.length >= 1 ? (
        <button
          class={`button button--primary ${style.newpolish__input}`}
          onClick={e => this.createPolish(e)}
        >
          Upload the polish!
        </button>
      ) : (
          ''
        );
    return (
      <div class={style.newpolish}>
        <h4 class={style.newpolish__heading}>Add that new color</h4>
        <form class="clearfix">
          <label class={style.newpolish__label} for="name">
            name
          </label>
          <p>
            Name this cutie! There are usually suggestions on the bottom of the
            bottle.
          </p>
          <input
            id="name"
            type="text"
            class={style.newpolish__input}
            placeholder="ex. Dusty Unicorn at Dawn"
            onChange={linkState(this, 'name')}
          />
          <div class={style.newpolish__gallery}>
            <label for="image" class={style.newpolish__upload__label}>
              <i class="twa twa--camera" />
              <br />Add an<br />image
            </label>
            {gallery}
          </div>
          {createPolish}
          {imageUploder}
        </form>
      </div>
    );
  }
}

NewPolish.propTypes = {
  gqlUploadImage: PropTypes.object.isRequired,
  gqlCreatePolish: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const CREATE_POLISH_MUTATION = gql`
  mutation gqlCreatePolish($images: [String]!, $name: String!) {
    createPolish(images: $images, name: $name) {
      id
    }
  }
`;

const UPLOAD_IMAGE_MUTATION = gql`
  mutation gqlUploadImage($upload: Upload!, $size: String!) {
    uploadImage(upload: $upload, size: $size) {
      url
    }
  }
`;

export default compose(
  graphql(CREATE_POLISH_MUTATION, { name: 'gqlCreatePolish' }),
  graphql(UPLOAD_IMAGE_MUTATION, { name: 'gqlUploadImage' })
)(NewPolish);
