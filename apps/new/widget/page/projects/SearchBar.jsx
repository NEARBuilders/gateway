const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const Row = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  flex: 1;
  border-radius: 6px;
  border: 0.5px solid #7b7b7b;
  padding: 0.5rem;
  padding-left: 2.5rem;
  font-size: 14px;
`;

const SearchIcon = styled.div`
  display: flex;
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  pointer-events: none;
  svg {
    height: 100%;
  }
`;

const SearchBarInput = styled.input`
  color: white;
  background: none;
  width: 100%;
  outline: none;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const { numItems, itemName, onSearch, term } = props;
const [searchTerm, setSearchTerm] = useState(term);

const onSearchChange = (value) => {
  setSearchTerm(value);
};

const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    onSearch(searchTerm);
  }
};

return (
  <div className="d-flex gap-3 align-items-center">
    <Row>
      <SearchIcon>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.7549 11.2559H11.9649L11.6849 10.9859C12.6649 9.8459 13.2549 8.3659 13.2549 6.75586C13.2549 3.16586 10.3449 0.255859 6.75488 0.255859C3.16488 0.255859 0.254883 3.16586 0.254883 6.75586C0.254883 10.3459 3.16488 13.2559 6.75488 13.2559C8.3649 13.2559 9.8449 12.6659 10.9849 11.6859L11.2549 11.9659V12.7559L16.2549 17.7459L17.7449 16.2559L12.7549 11.2559ZM6.75488 11.2559C4.26488 11.2559 2.25488 9.2459 2.25488 6.75586C2.25488 4.26586 4.26488 2.25586 6.75488 2.25586C9.2449 2.25586 11.2549 4.26586 11.2549 6.75586C11.2549 9.2459 9.2449 11.2559 6.75488 11.2559Z"
            fill="#7B7B7B"
          />
        </svg>
      </SearchIcon>
      <SearchBarInput
        value={searchTerm}
        placeholder={`Search projects`}
        onChange={(e) => onSearchChange(e.target.value)}
        type="text"
        autocomplete="search"
        onKeyDown={handleKeyDown}
      />
    </Row>
    <Button variant="primary" onClick={() => onSearch(searchTerm)}>
      Search
    </Button>
  </div>
);
