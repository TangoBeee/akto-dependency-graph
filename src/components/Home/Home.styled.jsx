import styled from "styled-components";

export const HomeContainer = styled.div`
    min-width: 95vw;
    margin-top: 50px;

    .form-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;

        .input-container {
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            background-color: white;
            border-radius: 20px;
            overflow: hidden;
            width: 50%;

            .input-container-title {
                background-color: #222;
                font-size: 24px;
                font-weight: 500;
                color: white;
                padding: 25px 40px;
            }

            .input-content {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 20px;
                height: 720px;
            }
        }
    }

    .openapi-inputbox {
        width: 100%;
        height: 100%;
        border: 0px;
        outline: 0px;
        resize: none;
        font-size: 16px;
    }

    .parse-btn {
        all: unset;
        color: white;
        cursor: pointer;

        img {
            width: 84px;
            height: 84px;
            scale: 0.95;
            transition: ease-in-out 0.2s;

            &:hover {
                scale: 1;
                rotate: 180deg;
            }
        }
    }

    .isLoading {
        pointer-events: none !important;
        animation: spin 1s linear infinite;
    }

    .noClick {
        pointer-events: none !important;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }


    @media (max-width: 1100px) {
        width: 100vw;
        margin-bottom: 20px;

        .form-container {
            flex-direction: column;
            
            .input-container {
                width: 90%;
                height: 500px;
            }
        }
    }


    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
        background: #888;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`