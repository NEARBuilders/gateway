const { Avatar, Button, TextEditor } = VM.require(
  "buildhub.near/widget/components"
);

Avatar = Avatar || (() => <></>);
Button = Button || (() => <></>);
TextEditor = TextEditor || (() => <></>);

const draftKey = useMemo(() => props.feed.name || "draft", [props.feed.name]);
const draft = useMemo(() => Storage.privateGet(draftKey), [draftKey]);

if (draftKey === null) {
  return "";
}

const [view, setView] = useState("editor");
const [postContent, setPostContent] = useState("");

useEffect(() => {
  setPostContent(draft || props.template);
}, [draft, setPostContent, props.template]);

function generateUID() {
  const maxHex = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * maxHex);
  return randomNumber.toString(16).padStart(8, "0");
}

function tagsFromLabels(labels) {
  return labels.reduce(
    (newLabels, label) => ({
      ...newLabels,
      [label]: "",
    }),
    {}
  );
}

const extractMentions = (text) => {
  const mentionRegex =
    /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  mentionRegex.lastIndex = 0;
  const accountIds = new Set();
  for (const match of text.matchAll(mentionRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
      match[1].length >= 2 &&
      match[1].length <= 64
    ) {
      accountIds.add(match[1].toLowerCase());
    }
  }
  return [...accountIds];
};

const extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/gi;
  hashtagRegex.lastIndex = 0;
  const hashtags = new Set();
  for (const match of text.matchAll(hashtagRegex)) {
    if (
      !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
      !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
    ) {
      hashtags.add(match[1].toLowerCase());
    }
  }
  return [...hashtags];
};

const extractMentionNotifications = (text, item) =>
  extractMentions(text || "")
    .filter((accountId) => accountId !== context.accountId)
    .map((accountId) => ({
      key: accountId,
      value: {
        type: "mention",
        item,
      },
    }));

function checkAndAppendHashtag(input, target) {
  if (input.toLowerCase().includes(`#${target.toLowerCase()}`)) {
    return input;
  } else {
    return input + ` #${target}`;
  }
}

const postToCustomFeed = ({ feed, text, labels }) => {
  const postId = generateUID();
  if (!labels) labels = [];

  labels = labels.map((label) => label.toLowerCase());
  labels.push(feed.name.toLowerCase());

  const requiredHashtags = ["build"];
  if (feed.hashtag) requiredHashtags.push(feed.hashtag.toLowerCase());
  requiredHashtags.push(feed.name.toLowerCase());

  text = text + `\n\n`;

  requiredHashtags.forEach((hashtag) => {
    text = checkAndAppendHashtag(text, hashtag);
  });

  const data = {
    // [feed.name]: {
    //   [postId]: {
    //     "": JSON.stringify({
    //       type: "md",
    //       text,
    //       labels,
    //     }),
    //     metadata: {
    //       type: feed.name,
    //       tags: tagsFromLabels(labels),
    //     },
    //   },
    // },
    post: {
      main: JSON.stringify({
        type: "md",
        text,
        // tags: tagsFromLabels(labels),
        // postType: feed.name,
      }),
    },
    index: {
      post: JSON.stringify({ key: "main", value: { type: "md" } }),
      // every: JSON.stringify({ key: feed.name, value: { type: "md" } }),
    },
  };

  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };

  const notifications = extractMentionNotifications(text, item);

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  const hashtags = extractHashtags(text);

  if (hashtags.length) {
    data.index.hashtag = JSON.stringify(
      hashtags.map((hashtag) => ({
        key: hashtag,
        value: item,
      }))
    );
  }

  return Social.set(data, {
    force: true,
    onCommit: () => {
      // console.log(`Commited ${feed}: #${postId}`);
    },
    onCancel: () => {
      // console.log(`Cancelled ${feed}: #${postId}`);
    },
  });
};

const PostCreator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1rem;
  background: #23242b;
  border-radius: 12px;

  margin-bottom: 1rem;
`;

const MarkdownPreview = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px !important;
  }
  @media (max-width: 767px) {
    font-size: 15px !important;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 15px !important;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  b {
    font-weight: 500 !important;
  }
  ol,
  ul,
  dl {
    margin-bottom: 0.5rem;
    white-space: inherit;
  }
  p {
    margin-bottom: 0.5rem;
  }
  hr {
    display: none;
  }
  img {
    border-radius: var(--bs-border-radius-lg);
    max-height: 40em;
  }
  th {
    min-width: 5em;
  }

  .table > :not(caption) > * > * {
    padding: 0.3rem;
  }

  * {
    color: #b6b6b8 !important;
  }

  a {
    color: #0d6efd !important;

    &:hover {
      color: #0a58ca !important;
    }
  }
`;

const avatarComponent = useMemo(() => {
  return (
    <div className="d-flex align-items-start gap-2">
      <Avatar accountId={context.accountId} />
      <div>
        <p className="mb-0 text-white">{context.accountId}</p>
      </div>
    </div>
  );
}, [context.accountId]);

const onPostContentChange = useCallback(
  (e) => {
    setPostContent(e.target.value);
    Storage.privateSet(draftKey, e.target.value || "");
  },
  [draftKey]
);

return (
  <PostCreator>
    {avatarComponent}
    <div style={{ border: "none" }}>
      {view === "editor" ? (
        <TextEditor
          key={props.feed.name}
          name={props.feed.name}
          value={postContent}
          onChange={onPostContentChange}
          maxWidth={"100%"}
          background={"transparent"}
        />
      ) : (
        <MarkdownPreview>
          <Widget
            src="devhub.near/widget/devhub.components.molecule.MarkdownViewer"
            props={{ text: postContent }}
          />
        </MarkdownPreview>
      )}
    </div>

    <div className="d-flex gap-3 align-self-end">
      <Button
        variant="outline"
        onClick={() => setView(view === "editor" ? "preview" : "editor")}
        style={{ fontSize: 14 }}
      >
        {view === "editor" ? (
          <>
            Preview <i className="bi bi-eye"></i>
          </>
        ) : (
          <>
            Edit <i className="bi bi-pencil-square"></i>
          </>
        )}
      </Button>
      <Button
        variant="primary"
        style={{ fontSize: 14 }}
        onClick={() =>
          postToCustomFeed({ feed: props.feed, text: postContent, labels })
        }
      >
        Post {props.feed.name}
      </Button>
    </div>
  </PostCreator>
);
