import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import linkState from 'linkstate';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

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
  componentDidMount() {}
  upload(e) {
    console.log(signature);
    // if (this.state.image.length < 1) return;
    // let DOHeadears = new Headers();
    // DOHeadears.append(
    //   'Host',
    //   'https://pretty-prism.nyc3.digitaloceanspaces.com'
    // );
    // DOHeadears.append('Authorization', 'public');
    // DOHeadears.append('Content-Length', this.state.image.size);
    // DOHeadears.append('x-amz-acl', 'public');

    // const DOUploadRequest = new Request(
    //   'https://pretty-prism.nyc3.digitaloceanspaces.com/UN4ZVHUZ7FGM5WNVMNWH',
    //   {
    //     method: 'PUT',
    //     headers: DOHeadears,
    //     mode: 'cors',
    //     body: this.state.image
    //   }
    // );
    // fetch(DOUploadRequest)
    //   .then(response => {
    //     this.setState({ response });
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //   });
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
  mutation gqlS3SignMutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

export default compose(
  graphql(CREATE_POLISH_MUTATION, { name: 'gqlCreatePolish' }),
  graphql(S3_SIGN_MUTATION, { name: 'gqlS3SignMutation' })
)(NewPolish);
