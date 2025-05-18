import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({
  options,
  selected,
  onChange,
  placeholder = 'Выбрать',
  className = '',
  error = false,
  shake = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeSelect = () => setIsOpen(false);

  const handleOptionClick = (option) => {
    onChange(option);
    closeSelect();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        closeSelect();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`custom-select ${className}`} ref={selectRef}>
      <div
        className={`custom-select__control 
          ${error ? 'input--error' : ''} 
          ${shake ? 'input--shake' : ''}`}
        onClick={toggleOpen}
      >
        <span className="custom-select__value">
          {selected || placeholder}
        </span>
        <img
          src={isOpen ? '/icon/arrow-up.svg' : '/icon/arrow-down.svg'}
          alt="стрелка"
          className={`custom-select__arrow ${isOpen ? 'custom-select__arrow--open' : ''}`}
        />
      </div>

      {isOpen && (
        <ul className="custom-select__options">
          {options.map((option, idx) => (
            <li
              key={idx}
              className="custom-select__option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
