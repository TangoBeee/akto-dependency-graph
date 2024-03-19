import styled from "styled-components";

export const TextAreaBoxContainer = styled.textarea`
    border: 1px solid #383d3f;
    border-radius: 8px;
    background-color: transparent;
    color: inherit;
    padding: 15px;
    font-size: 16px;
    min-width: 40%;
    min-height: 500px;
    resize: none;

    &::-webkit-scrollbar {
        width: 0px;
    }
`