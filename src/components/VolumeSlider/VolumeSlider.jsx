import React from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './slider.css'

const VolumeSlider = ({value, setValue}) => {

  const handleChange = (e) => {
    setValue(e)
  }

  return (
    <>
      <div className='slider__wrp'>
      <Slider
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.5}
        vertical={true}
        value={value}
        onChange={(e)=>handleChange(e)}
      />
      </div>
    </>
  );
};

export default VolumeSlider;

