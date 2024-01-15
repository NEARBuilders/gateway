const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Label = styled.label`
  color: var(--White-100, #fff);

  /* Body/16px */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  padding: 16px 12px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 8px;
  border: 1px solid var(--Stroke-color, rgba(255, 255, 255, 0.2));
  background: transparent;

  flex: 1 0 0;

  color: var(--White-50, #cdd0d5);

  /* Body/16px */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
`;

function InputField({
  type,
  label,
  key,
  placeholder,
  value,
  onChange,
}) {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <Input
        key={key}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type ?? "text"}
      />
    </InputContainer>
  );
}

return { InputField };