<<<<<<< HEAD
import React, { useRef } from 'react';
=======
import React from 'react';
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142

// Wrapper for a standard row in the form table
export const FormRow = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col md:flex-row border-b border-black ${className}`}>
    {children}
  </div>
);

<<<<<<< HEAD
// Box Input Component
interface BoxInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  uppercase?: boolean;
  className?: string;
  placeholder?: string;
}

export const BoxInput: React.FC<BoxInputProps> = ({ 
  value, 
  onChange, 
  length = 26, 
  uppercase = true,
  className = '',
  placeholder = ''
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (uppercase) val = val.toUpperCase();
    // Allow typing only up to length
    if (val.length <= length) {
      onChange(val);
    }
  };

  // Create array for boxes
  const boxes = Array.from({ length }, (_, i) => value[i] || '');

  return (
    <div className={`relative cursor-text inline-block ${className}`} onClick={handleClick}>
      <input
        ref={inputRef}
        type="text"
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text font-mono text-[1px]" 
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode={uppercase ? "text" : "email"}
        autoComplete="off"
      />
      <div className="flex flex-wrap content-start">
        {boxes.map((char, i) => (
          <div 
            key={i}
            className={`
              w-6 h-8 md:w-7 md:h-9 
              border border-black bg-white
              flex items-center justify-center
              text-lg md:text-xl font-handwriting text-blue-700 font-bold leading-none
              -ml-[1px]
              relative z-0
            `}
          >
            {char}
          </div>
        ))}
      </div>
=======
// A cell with a label and an input
interface FormCellProps {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  labelWidth?: string;
  uppercase?: boolean;
  placeholder?: string;
}

export const FormCell: React.FC<FormCellProps> = ({ 
  label, 
  subLabel, 
  value, 
  onChange, 
  className = 'flex-1',
  labelWidth = 'w-1/3',
  uppercase = true,
  placeholder = ''
}) => {
  return (
    <div className={`flex flex-col border-r border-black last:border-r-0 p-1 ${className}`}>
      <div className="text-xs font-bold text-gray-800 leading-tight">
        {label}
        {subLabel && <span className="block font-bengali font-normal text-[10px]">{subLabel}</span>}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b border-dotted border-gray-400 focus:border-blue-500 focus:outline-none font-handwriting text-blue-700 text-lg md:text-xl px-1 mt-1 ${uppercase ? 'uppercase' : ''}`}
      />
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142
    </div>
  );
};

<<<<<<< HEAD
// --- NEW TABLE LAYOUT COMPONENTS ---

export const TableRow = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col md:flex-row print:flex-row border-b border-black last:border-b-0 ${className}`}>
    {children}
  </div>
);

export const TableLabel = ({ label, subLabel, className = '' }: { label: React.ReactNode; subLabel?: React.ReactNode; className?: string }) => (
  <div className={`w-full md:w-[40%] print:w-[40%] bg-white border-b md:border-b-0 md:border-r print:border-b-0 print:border-r border-black p-2 flex flex-col justify-center ${className}`}>
    <span className="font-bold text-sm leading-tight">{label}</span>
    {subLabel && <span className="font-bengali font-normal text-xs leading-tight">{subLabel}</span>}
  </div>
);

export const TableInput = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`flex-1 p-2 flex items-center bg-white ${className}`}>
    {children}
  </div>
);

=======
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142
// Checkbox group
interface CheckboxOption {
  label: string;
  bengaliLabel: string;
  value: string;
}

interface CheckboxGroupProps {
  label: string;
  bengaliLabel?: string;
  options: CheckboxOption[];
  selectedValue: string;
  onChange: (val: any) => void;
  className?: string;
<<<<<<< HEAD
  horizontal?: boolean;
=======
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  bengaliLabel,
  options,
  selectedValue,
  onChange,
<<<<<<< HEAD
  className = '',
  horizontal = false
}) => {
  return (
    <div className={`p-1 ${className}`}>
      {!horizontal && (
        <div className="text-xs font-bold text-gray-800 mb-1">
          {label} {bengaliLabel && <span className="font-bengali font-normal">({bengaliLabel})</span>}
        </div>
      )}
      <div className="flex flex-wrap gap-4 items-center h-full">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center cursor-pointer gap-1">
            <div className="relative w-5 h-5 border border-black flex items-center justify-center bg-white transition-colors hover:bg-gray-50">
              {selectedValue === opt.value && (
                <span className="font-handwriting text-blue-700 text-2xl absolute -top-1 font-bold">✓</span>
              )}
            </div>
            <span className="text-xs font-semibold select-none whitespace-nowrap">{opt.label} <span className="font-bengali font-normal">({opt.bengaliLabel})</span></span>
=======
  className = ''
}) => {
  return (
    <div className={`p-1 border-r border-black last:border-r-0 ${className}`}>
      <div className="text-xs font-bold text-gray-800 mb-1">
        {label} {bengaliLabel && <span className="font-bengali font-normal">({bengaliLabel})</span>}
      </div>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center cursor-pointer gap-1">
            <div className="relative w-5 h-5 border border-black flex items-center justify-center bg-white">
              {selectedValue === opt.value && (
                <span className="font-handwriting text-blue-700 text-2xl absolute -top-1">✓</span>
              )}
            </div>
            <span className="text-xs font-semibold">{opt.label} <span className="font-bengali font-normal">({opt.bengaliLabel})</span></span>
            {/* Hidden actual radio for accessibility */}
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142
            <input 
              type="radio" 
              name={label} 
              value={opt.value} 
              checked={selectedValue === opt.value} 
              onChange={() => onChange(opt.value)}
              className="hidden"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

// Section Header
export const SectionHeader = ({ title, bengaliTitle }: { title: string; bengaliTitle: string }) => (
  <div className="bg-gray-200 border-y border-black px-2 py-1 text-center">
    <span className="font-bold text-sm uppercase underline">{title}</span>
    <span className="font-bengali text-sm ml-2">({bengaliTitle})</span>
  </div>
);

// Boolean Checkbox
export const BooleanCheckbox = ({ label, checked, onChange }: { label: React.ReactNode; checked: boolean; onChange: (c: boolean) => void }) => (
  <label className="flex items-start gap-2 cursor-pointer p-1">
<<<<<<< HEAD
    <div className="relative w-5 h-5 border border-black flex-shrink-0 bg-white mt-1 hover:bg-gray-50">
      {checked && (
         <span className="font-handwriting text-blue-700 text-2xl absolute -top-2 left-0 font-bold">✓</span>
=======
    <div className="relative w-5 h-5 border border-black flex-shrink-0 bg-white mt-1">
      {checked && (
         <span className="font-handwriting text-blue-700 text-2xl absolute -top-2 left-0">✓</span>
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142
      )}
    </div>
    <div className="text-xs leading-tight select-none">
      {label}
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
    </div>
  </label>
<<<<<<< HEAD
);

// A cell with a label and an input (Legacy for lower sections if needed, or updated to use TableRow internally if refactored completely)
interface FormCellProps {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  uppercase?: boolean;
  boxCount?: number;
}

export const FormCell: React.FC<FormCellProps> = ({ 
  label, 
  subLabel, 
  value, 
  onChange, 
  className = 'flex-1',
  uppercase = true,
  boxCount
}) => {
  return (
    <div className={`flex flex-col border-r border-black last:border-r-0 p-1 ${className}`}>
      <div className="text-xs font-bold text-gray-800 leading-tight mb-1">
        {label}
        {subLabel && <span className="block font-bengali font-normal text-[10px]">{subLabel}</span>}
      </div>
      <BoxInput value={value} onChange={onChange} length={boxCount} uppercase={uppercase} />
    </div>
  );
};
=======
);
>>>>>>> 6aa55518bb9a1ee6a205ce49eb842dc2e0b0f142
