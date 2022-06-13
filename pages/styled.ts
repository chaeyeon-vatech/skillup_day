import styled from "@emotion/styled";

export const DefaultContainer = styled("div", {
    label: "DefaultContainer"
})<{}>(() => {
    return {
        position: "fixed",
        top: "30%",
        left: "40%",
        borderRadius: 50,
        padding: 80,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        textAlign: "center"

    };
});

export const ErrorComponent = styled("div", {
    label: "ErrorComponent"
})<{}>(() => {
    return {
        margin: 10,
        color: "red"
    };
});
