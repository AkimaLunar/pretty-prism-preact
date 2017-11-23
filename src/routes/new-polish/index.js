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
      image: '',
      imagePreviewUrl: '',
      name: '',
      response: null,
      error: null
    };
  }
  componentDidMount() { }

  formatFilename(filename) {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  }

  upload(e) {
    e.preventDefault();
    const { name, image } = this.state;
    const _image = {
      name: this.formatFilename(image.name),
      type: image.type,
      size: image.size
    };
    console.log(this.formatFilename(image.name));
    this.props
      .gqlS3Sign({
        variables: {
          filename: _image.name,
          image: _image
        }
      })
      .then(response => {
        console.log(JSON.stringify(response, '', 2));
        this.setState({ response: response.data.gqlS3Sign });
        return response.data.gqlS3Sign;
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
        image: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  imageClear(e) {
    e.preventDefault();
    this.setState({
      image: '',
      imagePreviewUrl: ''
    });
  }
  render(props, { imagePreviewUrl }) {
    let imageUploder = imagePreviewUrl ? (
      <div class={style.newpolish__upload}>
        <span
          onClick={e => this.imageClear(e)}
          class={style.newpolish__upload__remove}
        >
          x
        </span>
        <img src={imagePreviewUrl} class={style.newpolish__input} />
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
          {imageUploder}
          <button
            type="submit"
            class={`button button--secondary ${style.newpolish__input}`}
          >
            Upload image
          </button>
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

const S3_SIGN_MUTATION = gql`
  mutation gqlS3Sign($image: Image!) {
    signS3(image: $image) {
      url
      signature
    }
  }
`;

export default compose(
  graphql(CREATE_POLISH_MUTATION, { name: 'gqlCreatePolish' }),
  graphql(S3_SIGN_MUTATION, { name: 'gqlS3Sign' })
)(NewPolish);
