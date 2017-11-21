import { h } from 'preact';

const randomNumber = max => Math.random() * max;

export const Circle = styles => {
  const _randomClass = Math.floor(randomNumber(4)) + 1;
  const _randomR = randomNumber(30);
  const _randomPosX = randomNumber(600);
  const _randomPosY = randomNumber(600);
  return (
    <circle
      class={`${styles} cls__${_randomClass}`}
      cx={_randomPosX}
      cy={_randomPosY}
      r={_randomR}
    />
  );
};
