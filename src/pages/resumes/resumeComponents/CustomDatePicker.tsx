import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomTextField } from './styles';

interface CustomDatePickerProps {
  selectedDate: Date | null;
  label: string;
  onChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  label,
  onChange,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      customInput={<CustomTextField fullWidth variant="filled" color="secondary" label={label} />}
    />
  );
};

export default CustomDatePicker;
