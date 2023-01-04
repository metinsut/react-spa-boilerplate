import React from 'react';
import useMock from './useMock';

export default function Mock() {
  const mock = useMock();

  return mock ? (
    <div
      className="fixed top-0 w-full h-3 z-50"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px)'
      }}></div>
  ) : null;
}
