import React from 'react';

export default function Modal() {
  return (
    <div
      style={{
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0,0,0,.5)',
        bottom: '0',
        left: '0',
        position: 'absolute',
        right: '0',
        top: '0',
      }}
    >
      <div className='content'>
        <div className='header'></div>
        <div className='body'></div>
      </div>
    </div>
  );
}
