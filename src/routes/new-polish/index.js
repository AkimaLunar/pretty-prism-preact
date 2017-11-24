import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import linkState from 'linkstate';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

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
        console.log(JSON.stringify(error));
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
        console.log(JSON.stringify(error));
      });
  }
  render(props, { imagePreviewUrl }) {
    const imageUploder = imagePreviewUrl ? (
      <div class={style.newpolish__upload}>
        <span
          onClick={e => this.imageClear(e)}
          class={style.newpolish__upload__remove}
        >
          x
        </span>
        <img src={imagePreviewUrl} class={style.newpolish__input} />
        <button
          type="submit"
          class={`button button--secondary ${style.newpolish__input}`}
        >
          Add this pic
        </button>
      </div>
    ) : (
      <div class={style.newpolish__upload}>
        <label for="image" class={style.newpolish__upload__label}>
          <i class="twa twa--nail-care" />&nbsp;Pick an image
        </label>
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
      <img src={url} key={`image-${i}`} alt={`New polish pic ${i}`} />
    ));
    const createPolish = (
      <button
        class={`button button--primary ${style.newpolish__input}`}
        onClick={e => this.createPolish(e)}
      >
        Upload the polish!
      </button>
    );
    return (
      <div class={style.newpolish}>
        <h4 class={style.newpolish__heading}>Add that new color</h4>
        <form onSubmit={e => this.upload(e)}>
          <label class={style.login__label} for="name">
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
            onChange={linkState(this, 'name')}
          />
          {gallery}
          {imageUploder}
          {createPolish}
        </form>
      </div>
    );
  }
}

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
