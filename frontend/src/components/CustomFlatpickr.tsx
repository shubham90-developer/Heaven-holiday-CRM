"use client";
import Flatpickr from "react-flatpickr";

type FlatpickrProps = {
  className?: string;
  value?: Date | [Date, Date];
  options?: {};
  placeholder?: string;
  style?: {};
};

const CustomFlatpickr = ({
  className,
  value,
  options,
  placeholder,
  style,
}: FlatpickrProps) => {
  return (
    <>
      <Flatpickr
        style={style}
        className={className}
        data-enable-time
        value={value}
        options={options}
        placeholder={placeholder}
      />
    </>
  );
};

export default CustomFlatpickr;
