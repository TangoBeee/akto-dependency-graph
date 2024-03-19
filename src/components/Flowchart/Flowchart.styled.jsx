import styled from "styled-components";

export const FlowchartContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 22px;
    min-width: 50%;
    min-height: 500px;

    .excalidraw-toggle-btn {
        all: unset;
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: white;
        color: black;
        padding: 8px 10px;
        border-right: 1px solid #383d3f;
        border-top: 1px solid #383d3f;
        border-radius: 0 0 0 10px;
        text-transform: capitalize;
        cursor: pointer;
        opacity: 0.9;
        z-index: 3;

        &:hover {
            opacity: 1;
        }
    }

    .mermaid-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #383d3f;
        border-radius: 8px;
        padding: 15px;
        overflow: auto;
        width: 100%;
        height: 500px;
        cursor: grab;
        color: black;

        &:active {
            cursor: grabbing;
        }

        .react-transform-wrapper {
            width: 100%;
            height: 100%;

            .react-transform-component {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
        }

        .controls-option-wrapper {
            position: absolute;
            display: flex;
            gap: 10px;
            top: 0;
            left: 0;

            .zoom-control-btn {
                all: unset;
                background-color: white;
                color: black;
                padding: 5px 8px;
                font-size: 20px;
                border-top: 1px solid #383d3f;
                border-radius: 0 0 10px 10px;
                text-transform: capitalize;
                cursor: pointer;
                opacity: 0.9;
                z-index: 2;

                &:hover {
                    opacity: 1;
                }

                &:nth-of-type(1) {
                    border-radius: 0 0 10px 0px;
                }
            }
        }

        .download-flowchart-btn {
            all: unset;
            background-color: white;
            color: black;
            padding: 8px 10px;
            border-radius: 10px;
            text-transform: capitalize;
            cursor: pointer;
            opacity: 0.9;

            &:hover {
                opacity: 1;
            }
        }
    }

    .hidden {
        display: none;
    }
`