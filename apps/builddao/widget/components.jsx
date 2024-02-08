const { Button } = VM.require("buildhub.near/widget/components.Button");
const { ProgressState } = VM.require(
  "buildhub.near/widget/components.ProgressState"
);
const { Step } = VM.require("buildhub.near/widget/components.Step");
const { InputField } = VM.require("buildhub.near/widget/components.InputField");
const { UploadField } = VM.require(
  "buildhub.near/widget/components.UploadField"
);
const { TextBox } = VM.require("buildhub.near/widget/components.TextBox");
const { TextEditor } = VM.require("buildhub.near/widget/components.TextEditor");
const { Checkbox } = VM.require("buildhub.near/widget/components.Checkbox");
const { Avatar } = VM.require("buildhub.near/widget/components.Avatar");
const { Modal } = VM.require("buildhub.near/widget/components.Modal");

const { Modal } = VM.require("buildhub.near/widget/components.Modals.Modal");

const { H1 } = VM.require("buildhub.near/widget/components.Text.H1");
const { H2 } = VM.require("buildhub.near/widget/components.Text.H2");
const { H3 } = VM.require("buildhub.near/widget/components.Text.H3");
const { H4 } = VM.require("buildhub.near/widget/components.Text.H4");
const { P } = VM.require("buildhub.near/widget/components.Text.P");

function Pagination({
  totalPages,
  maxVisiblePages,
  onPageClick,
  selectedPage,
  ThemeContainer,
}) {
  return (
    <Widget
      src="buildhub.near/widget/components.Pagination"
      props={{
        totalPages,
        maxVisiblePages,
        onPageClick,
        selectedPage,
        ThemeContainer,
      }}
    />
  );
}

function Post(props) {
  return (
    <Widget
      loading={<div className="w-100" style={{ height: "200px" }} />}
      src={"buildhub.near/widget/components.Post"}
      props={{ ...props }}
    />
  );
}

function User(props) {
  return (
    <Widget
      loading={<div style={{ widget: "3rem", height: "3rem" }} />}
      src="buildhub.near/widget/components.User"
      props={{ ...props }}
    />
  );
}

return {
  Button,
  Pagination,
  Post,
  ProgressState,
  Modal,
  Step,
  InputField,
  UploadField,
  TextBox,
  TextEditor,
  Checkbox,
  Avatar,
  User,
  H1,
  H2,
  H3,
  H4,
  P,
  Modal,
};
