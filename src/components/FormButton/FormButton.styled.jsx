import styled from "styled-components";

export const FormButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        all: unset;
        cursor: pointer;
        border: 1px solid #383d3f;
        border-radius: 4px;
        background-color: rgb(98, 0, 234);
        padding: 10px 12px;
        opacity: 0.9;
        display: flex;
        flex-direction: row-reverse;
        gap: 5px;
        justify-content: center;
        align-items: center;

        &:hover {
            opacity: 1;
        }
    }
`