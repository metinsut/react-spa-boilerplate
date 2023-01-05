import React from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

export default function MockHazardTape() {
  const mock = useReadLocalStorage('mock');

  return mock ? (
    <div
      className="fixed top-0 w-full h-3 z-50"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px)'
      }}></div>
  ) : null;
}
