import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

class ImagePreview extends Component {
  constructor(props) {
    super(props);
  }
  submit(e) {
    e.preventDefault();
    if (this.state.text.length >= 1) {
      this.props.submit(this.state.text);
      this.setState({ text: '' });
    }
  }
  render({ submit, remove, image }) {
    return (
      <figure class={style.imagepreview}>
        <span onClick={e => remove(e)} class={style.imagepreview__remove}>
          x
        </span>
        <img src={image} class={style.imagepreview__img} />
        <footer class={style.imagepreview__footer}>
          <button
            onClick={e => submit(e)}
            type="submit"
            class={`button button--secondary ${style.imagepreview__button}`}
          >
            I like this pic! Add it.
          </button>
        </footer>
      </figure>
    );
  }
}

ImagePreview.propTypes = {
  submit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired
};

export default ImagePreview;
