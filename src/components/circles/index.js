import { h } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import classNames from 'classnames';

function Circles(props) {
  let circleClass = classNames({
    [style.cls__login]: !props.on,
    [style.cls__signup]: props.on
  });
  return (
    <svg xmlns="http://www.w3.org/2000/svg" class={style.svg}>
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="-27.08"
        cy="-4.56"
        r="47.1"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="165.16"
        cy="51.46"
        r="47.1"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="426.14"
        cy="28.54"
        r="47.1"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="259.36"
        cy="121.47"
        r="47.1"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="283.83"
        cy="-32.29"
        r="74.56"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="72.99"
        cy="-82.72"
        r="104.12"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="604.37"
        cy="51.46"
        r="47.1"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="683.3"
        cy="-22.38"
        r="47.1"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="-11.82"
        cy="117.02"
        r="27.96"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="176.41"
        cy="172.18"
        r="27.07"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="427.99"
        cy="146.44"
        r="33.77"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="263.33"
        cy="235.47"
        r="37.28"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="605.47"
        cy="172.2"
        r="27.02"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="73.47"
        cy="166.95"
        r="27.02"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="453.97"
        cy="386.08"
        r="27.02"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="674.66"
        cy="92.17"
        r="42.84"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="381.21"
        cy="245.24"
        r="33.06"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="519.36"
        cy="237.98"
        r="33.06"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="540"
        cy="90.64"
        r="18.97"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="655.7"
        cy="582.05"
        r="18.97"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="553.85"
        cy="324.89"
        r="18.97"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="286.51"
        cy="403.82"
        r="18.97"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="91.73"
        cy="338.89"
        r="18.97"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="77.87"
        cy="65.05"
        r="18.97"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="725.9"
        cy="255.99"
        r="30.06"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="251.34"
        cy="471.33"
        r="21.27"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="75.62"
        cy="227.04"
        r="29.28"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="588.37"
        cy="471.35"
        r="21.23"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="79.37"
        cy="525.35"
        r="21.23"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="469.37"
        cy="525.35"
        r="21.23"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="641.21"
        cy="321.72"
        r="25.97"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="366.73"
        cy="451.01"
        r="25.97"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="716.82"
        cy="667.28"
        r="14.9"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="611.82"
        cy="728.28"
        r="14.9"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="547.82"
        cy="591.28"
        r="14.9"
      />
      <circle
        class={`${circleClass} ${style.cls__1}`}
        cx="367.82"
        cy="604.28"
        r="14.9"
      />
      <circle
        class={`${circleClass} ${style.cls__2}`}
        cx="184.82"
        cy="602.28"
        r="14.9"
      />
      <circle
        class={`${circleClass} ${style.cls__3}`}
        cx="152.82"
        cy="758.28"
        r="14.9"
      />
      <circle
        class={`${circleClass} ${style.cls__4}`}
        cx="682.97"
        cy="537.16"
        r="23.62"
      />
    </svg>
  );
}

Circles.propTypes = {
  on: PropTypes.bool.isRequired
};

export default Circles;
