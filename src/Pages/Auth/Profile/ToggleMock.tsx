import React from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

export default function ToggleMock() {
  const [_, setMock] = useLocalStorage('mock', false);
  const mock = useReadLocalStorage<boolean | undefined>('mock');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setMock(true);
    } else {
      setMock(false);
    }
    window.location.reload();
  };

  return (
    <label className="relative grid grid-flow-col gap-2 justify-start items-center border border-slate-400 p-2 rounded-lg">
      Toggle Mock
      <input
        defaultChecked={mock ?? false}
        onChange={handleChange}
        type="checkbox"
        className="peer appearance-none"
      />
      <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
    </label>
  );
}
