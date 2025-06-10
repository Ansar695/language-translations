import React from 'react';

interface TranslationTextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  label: string;
  readOnly?: boolean;
  loading?: boolean;
  maxLength?: number;
}

const TranslationTextArea: React.FC<TranslationTextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  readOnly = false,
  loading = false,
  maxLength = 5000,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange && !readOnly) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {!readOnly && (
          <span className="text-xs text-gray-500">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          className={`w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
            readOnly ? 'bg-gray-50 cursor-default' : ''
          } ${loading ? 'opacity-50' : ''}`}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-sm text-gray-600">Translating...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationTextArea;