const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Label = styled.label`
  color: var(--label-color, #fff);

  /* Body/16px */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  padding: 12px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  background: var(--bg-1, #000000);
  border-color: var(--stroke-color, rgba(255, 255, 255, 0.2));
  flex: 1 0 0;
  outline: none;
  color: var(--font-muted-color, #cdd0d5);

  /* Body/16px */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
  &.invalid {
    border-color: #ed5a5a;
    :focus-within {
      border: 1px solid #ed5a5a;
    }
  }
`;

const PrefixContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: var(--bg-2, #23242b);
  border: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
  border-radius: 8px 0 0 8px;
  color: var(--font-muted-color, #cdd0d5);
  font-size: 16px;
  font-weight: 400;
  line-height: 170%;
  max-width: fit-content;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 8px;
`;

function InputField({
  type,
  label,
  key,
  placeholder,
  value,
  onChange,
  prefix,
  error,
  maxWidth,
}) {
  return (
    <InputContainer
      key={`input-container-${key}`}
      style={{ maxWidth: maxWidth ?? "390px" }}
    >
      {label && <Label>{label}</Label>}
      <InputWrapper style={{ maxWidth: maxWidth ?? "390px" }}>
        {prefix && <PrefixContainer>{prefix}</PrefixContainer>}
        <Input
          key={`input-field-${key}`}
          value={value}
          className={error ? "invalid" : ""}
          onChange={onChange}
          placeholder={placeholder}
          type={type ?? "text"}
          style={{
            maxWidth: maxWidth ?? "390px",
            borderRadius: prefix ? "0 8px 8px 0" : "",
          }}
        />
      </InputWrapper>
    </InputContainer>
  );
}

return { InputField };
