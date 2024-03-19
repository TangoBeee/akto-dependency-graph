import styled from "styled-components";

export const ParserFormContainer = styled.div`
    form {
        width: 100%;
        border: 2px solid #383d3f;
        border-radius: 8px;
        padding: 30px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: white;

        .error-wrapper {
            width: 50%;
            display: flex;
            justify-content: center;
        }
    }
`