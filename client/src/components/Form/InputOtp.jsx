// import React, { useState, useRef } from "react";
// import { Input } from "../../components/ui/input";

// const InputOtp = ({
//   length = 6,
//   onChange,
//   className = "",
//   inputClassName = "",
//   disabled = false,
// }) => {
//   const [otp, setOtp] = useState(Array(length).fill(""));
//   const inputRefs = useRef([]);

//   const handleChange = (value, index) => {
//     if (/[^0-9]/.test(value)) return;
//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);
//     onChange && onChange(updatedOtp.join(""));

//     if (value && index < length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       if (otp[index]) {
//         handleChange("", index);
//       } else if (index > 0) {
//         inputRefs.current[index - 1].focus();
//       }
//     }
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//     if (e.key === "ArrowRight" && index < length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pastedValue = e.clipboardData.getData("text").slice(0, length);
//     if (!/^[0-9]*$/.test(pastedValue)) return;
//     const updatedOtp = Array(length)
//       .fill("")
//       .map((_, idx) => pastedValue[idx] || "");
//     setOtp(updatedOtp);
//     onChange && onChange(updatedOtp.join(""));
//     setTimeout(() => {
//       inputRefs.current[pastedValue.length - 1]?.focus();
//     }, 0);
//   };

//   return (
//     <div
//       className={`flex justify-between gap-2 ${className}`}
//       onPaste={handlePaste}>
//       {otp.map((digit, idx) => (
//         <Input
//           key={idx}
//           ref={(el) => (inputRefs.current[idx] = el)}
//           type="text"
//           value={digit}
//           maxLength="1"
//           onChange={(e) => handleChange(e.target.value, idx)}
//           onKeyDown={(e) => handleKeyDown(e, idx)}
//           disabled={disabled}
//           aria-label={`OTP input ${idx + 1}`}
//           className={`w-11 h-11 text-center text-xl ${inputClassName}`}
//           autoFocus={idx === 0}
//         />
//       ))}
//     </div>
//   );
// };

// export default InputOtp;

import React, { useState, useRef } from "react";
import { Input } from "../../components/ui/input";

const InputOtp = ({
  length = 6,
  onChange,
  onSubmit, // Add new prop for submit handler
  className = "",
  inputClassName = "",
  disabled = false,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/[^0-9]/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    onChange && onChange(updatedOtp.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && onSubmit) {
      // Trigger submit when Enter is pressed
      const otpValue = otp.join("");
      if (otpValue.length === length) {
        // Optional: only submit if all fields are filled
        onSubmit(otpValue);
      }
      return;
    }

    if (e.key === "Backspace") {
      if (otp[index]) {
        handleChange("", index);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("text").slice(0, length);
    if (!/^[0-9]*$/.test(pastedValue)) return;
    const updatedOtp = Array(length)
      .fill("")
      .map((_, idx) => pastedValue[idx] || "");
    setOtp(updatedOtp);
    onChange && onChange(updatedOtp.join(""));
    setTimeout(() => {
      inputRefs.current[pastedValue.length - 1]?.focus();
    }, 0);
  };

  return (
    <div
      className={`flex justify-between gap-2 ${className}`}
      onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <Input
          key={idx}
          ref={(el) => (inputRefs.current[idx] = el)}
          type="text"
          value={digit}
          maxLength="1"
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          disabled={disabled}
          aria-label={`OTP input ${idx + 1}`}
          className={`w-11 h-11 text-center text-xl ${inputClassName}`}
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );
};

export default InputOtp;
