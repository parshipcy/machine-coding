import { useEffect, useState, useRef } from "react";

// React passes props as an object.
// {} destructures the object and gives otpLength directly.
export default function OtpComponent({ otpLength = 6 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    // Create a copy of the state array instead of modifying the original.
    // React state should be treated as immutable.
    const copyOtpFields = [...otpFields];

    if (key == "Backspace") {
      copyOtpFields[index] = "";
      setOtpFields(copyOtpFields);
      // moving focus back
      if (index > 0) ref.current[index - 1].focus();
      return;
    }

    if (isNaN(key)) {
      return;
    }

    copyOtpFields[index] = key;

    // Move focus to the next input after entering a digit
    // and the check is to prevent accessing an input beyond the last OTP field.
    if (index + 1 < otpFields.length) ref.current[index + 1].focus();

    setOtpFields(copyOtpFields);
  };

  // useEffect(() => {
  //   ref.current["0"].focus();
  // }, []);

  return (
    <div className="container">
      {otpFields.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(currentInput) => (ref.current[index] = currentInput)}
            // React expects controlled inputs (value) to have an onChange handler, but here we need onKeyDown, so using readOnly
            value={value}
            readOnly
            // When a key is pressed, React gives me the event (e), and I'll pass both e and index to handleKeyDown
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
