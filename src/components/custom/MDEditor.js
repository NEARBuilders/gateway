import React, { useMemo, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import styled from "styled-components";
import "easymde/dist/easymde.min.css";

const StyledMDEditor = styled.div`
    .editor-toolbar {
        background-color: ${((props) => props.variant === "transparent" ? "transparent" : "#0b0c14")};
        border: 1px solid #4f5055;
        border-bottom: 0;

        button {
            color: #cdd0d5;
            background-color: ${((props) => props.variant === "transparent" ? "transparent" : "#0b0c14")};

            &:hover, &.active {
                transition: all 300ms;
                background-color: #20223a;
                color: #ced4da;
            }

            &.preview, &.side-by-side, &.fullscreen {
                display: none;
            }
        }

        i.separator {
            display: none;
        }
    }

    .CodeMirror {
        color: #cdd0d5;
        background-color: ${((props) => props.variant === "transparent" ? "transparent" : "#0b0c14")};
        border: 1px solid #4f5055;
        border-top: 0;

        .cm-header-1, .cm-header-2, .cm-header-3, .cm-header-4, .cm-header-5, .cm-header-6 {
            font-size: 16px;
            margin-bottom: 0;
        }

        .CodeMirror-cursor {
            border-left: 1px solid #fff;
        }

        .CodeMirror-selectedtext {
            color: #000;
        }
    }
`

export default function MDEditor(props) {
  const options = useMemo(() => {
    return {
      status: false,
      spellChecker: false,
      ...props.options
    }
  }, [])

  const { value, onChange } = props;

  return (
    <StyledMDEditor variant={props.variant}>
      <SimpleMDE options={options} value={value} onChange={onChange} />
    </StyledMDEditor>
  );
}