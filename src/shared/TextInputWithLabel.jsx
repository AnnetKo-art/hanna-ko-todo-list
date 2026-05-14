
function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  value,
  inputRef,
}) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      <input
        type="text"
        id={elementId}
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;