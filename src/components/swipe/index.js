// Based on preact-scroll-container
// by wulunyi
// https://github.com/wulunyi/preact-swipe-container

import { h, Component } from 'preact';

// Scrolling speed reference value
const SPEED = 1000;

export default class SwipeContainer extends Component {
  constructor(props) {
    super(props);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    // X point
    this.startX = 0;
    this.endX = 0;
    this.diffX = 0;

    // Time Stamp
    this.startTimer = 0;
    this.endTimer = 0;
    this.diffTimer = 0;

    // "Soft" effect option
    this.soft = this.props.soft || false;

    // Movement option
    this.moving = true;

    // Container element
    this.DOM = null;

    // How many page numbers are currently displayed starting at 0
    this.currentPage = +this.props.currentPage || 0;
    this.totalPage = +this.props.totalPage || 0;

    this.currentTransform = this.currentPage * document.body.clientWidth * -1; // Current offset
  }

  componentDidMount() {
    this.updateTransform();
  }

  updateTransform() {
    let dom = this.DOM.children[0];
    this.setTransition(dom, 0).setTransform(dom, this.currentTransform);
  }

  componentWillReceiveProps(props) {
    let { currentPage, totalPage } = props;
    let isChange = false;

    if (currentPage != this.props.currentPage) {
      isChange = true;

      this.currentPage = currentPage;
      this.currentTransform = this.currentPage * document.body.clientWidth * -1; // 当前偏移量
    }

    if (totalPage != this.props.totalPage) {
      isChange = true;

      this.totalPage = totalPage;
    }

    if (isChange) {
      this.updateTransform();
    }
  }

  handleTouchStart(ev) {
    let dom = ev.currentTarget.children[0];

    this.startX = ev.changedTouches[0].pageX;
    this.diffX = 0;

    this.startTimer = Date.now();
    this.diffTimer = 0;

    // Turn off the animation
    this.setTransition(dom, 0);
  }

  handleTouchMove(ev) {
    // Identify the first element of the container as a rolling element
    let dom = ev.currentTarget.children[0];

    this.endX = ev.changedTouches[0].pageX;
    this.diffX = this.endX - this.startX;

    // When sliding on the first page to the right or sliding the last page to the left
    if (
      (this.currentPage == 0 && this.diffX > 0) ||
      (this.currentPage == this.totalPage - 1 && this.diffX < 0)
    ) {
      this.diffX = this.diffX / 2;
      this.moving = false;
    } else {
      this.moving = true;
      ev.stopPropagation();
    }

    if (this.moving || this.soft) {
      this.setTransform(dom, this.diffX + this.currentTransform);
    }

    ev.preventDefault();
    return false;
  }

  handleTouchEnd(ev) {
    if (this.moving) {
      ev.stopPropagation();
    }

    if (this.moving || this.soft) {
      let dom = ev.currentTarget.children[0];
      let halfScreen = document.body.clientWidth / 2;

      this.endX = ev.changedTouches[0].pageX;
      this.diffX = this.endX - this.startX;

      this.endTimer = Date.now();
      this.diffTimer = this.endTimer - this.startTimer;

      // Offset is greater than 10 to switch
      if (Math.abs(this.diffX) > 10) {
        if (this.diffTimer > 5000) {
          if (this.diffX < -1 * halfScreen) {
            this.currentPage =
              this.currentPage - 1 < 0 ? 0 : this.currentPage - 1;
          } else if (this.diffX > halfScreen) {
            this.currentPage =
              this.currentPage + 1 >= this.totalPage
                ? this.totalPage - 1
                : this.currentPage + 1;
          }
        } else {
          if (this.diffX / this.diffTimer > 0.1) {
            this.currentPage =
              this.currentPage - 1 < 0 ? 0 : this.currentPage - 1;
          } else if (this.diffX / this.diffTimer < -0.1) {
            this.currentPage =
              this.currentPage + 1 >= this.totalPage
                ? this.totalPage - 1
                : this.currentPage + 1;
          }
        }

        this.slider(this.currentPage, this.diffX / this.diffTimer, dom);
      }
    }
  }

  slider(num, diff, dom) {
    // Speed calculation
    let tempSpeed = Math.abs(Math.abs(parseInt(SPEED * diff)) - 0.5);

    tempSpeed = tempSpeed > 300 ? 300 : tempSpeed;

    // Position calculation
    let finalX = num * document.body.clientWidth * -1;

    if (finalX !== this.currentTransform) {
      this.props.onChange && this.props.onChange(this.currentPage);
    }

    this.setTransition(dom, tempSpeed) // Scroll animation control
      .setTransform(dom, finalX); // Scroll offset control

    // Cache offset
    this.currentTransform = finalX;
  }

  setTransition(dom, speed) {
    dom.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in';
    dom.style.transition = 'transform ' + speed + 'ms ease-in';

    return this;
  }

  setTransform(dom, distance) {
    dom.style.webkitTransform = 'translate3D(' + distance + 'px,0,0)';
    dom.style.transform = 'translate3D(' + distance + 'px,0,0)';

    return this;
  }

  render({ children, ...props }, state) {
    return (
      <div
        {...props}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        ref={ref => {
          this.DOM = ref;
        }}
      >
        {children}
      </div>
    );
  }
}
