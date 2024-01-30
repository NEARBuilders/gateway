const MarkdownContainer = styled.div`
  max-width: 888px;
  margin: 0 39px 39px auto;
  padding: 55px;
  background-color: #fff;
  border-radius: 23px;

  h1, h2, h3, h4, h5, h6, span {
    color: #000 !important;
    font-family: "Inter", sans-serif !important;
  }

  h1 {
    /* H1/large */
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  }

  p, ul, li {
    color: #000;
    /* Body/14px */
    font-family: "Inter", sans-serif !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 170%;
  }

  @media screen and (max-width: 768px) {
    padding: 40px;
    border-radius: 10px;
  }
`;

function MarkdownView(props) {
  const content = fetch(`${props.path}`);
  if (content === null) return "";

  return (
    <MarkdownContainer>
      <Widget
        src="openwebbuild.near/widget/Post.Markdown"
        props={{
          text: content.body,
        }}
      />
    </MarkdownContainer>
  );
}

return { MarkdownView };
