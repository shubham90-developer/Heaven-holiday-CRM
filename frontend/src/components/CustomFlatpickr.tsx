"use client";
import Flatpickr from "react-flatpickr";

type FlatpickrProps = {
  className?: string;
  value?: Date | [Date, Date] | string; // add string here
  options?: {};
  placeholder?: string;
  style?: {};
  onChange?: (dates: Date[]) => void; // add onChange here
};

const CustomFlatpickr = ({
  className,
  value,
  options,
  placeholder,
  style,
  onChange,
}: FlatpickrProps) => {
  return (
    <Flatpickr
      style={style}
      className={className}
      data-enable-time
      value={value}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default CustomFlatpickr;
