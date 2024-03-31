import styled from "styled-components";

export const DownloadButtonContainer = styled.div`
    .download-btn {
        all: unset;
        background-color: #222;
        color: white;
        cursor: pointer;
        padding: 5px 8px 1px 8px;
        border-radius: 12px;
        scale: 0.90;
        transition: ease-in-out 0.2s;
        opacity: 0.3;

        img {
            width: 24px;
            height: 24px;
        }
        
        &:hover {
            scale: 1;
            opacity: 1;
        }
    }
`