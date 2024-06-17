const src = props.src ?? "${alias_mob}/widget/WidgetSource";
const blockHeight = props.blockHeight;
const [accountId, widget, widgetName] = src.split("/");

const code = Social.get(src, blockHeight);

const text = `
\`\`\`jsx
${code}
\`\`\`
`;

return (
  <>
    <Widget
      src="${alias_mob}/widget/WidgetMetadata"
      props={{ accountId, widgetName, expanded: true }}
    />
    <Markdown text={text} />
    <h3>Dependencies</h3>
    <Widget
      src="${config_account}/widget/page.inspect.WidgetDependencies"
      props={{ src, code }}
    />
  </>
);
