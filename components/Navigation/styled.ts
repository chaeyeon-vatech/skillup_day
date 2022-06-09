import styled from "@emotion/styled";

export const NavigateContainer = styled("div", {
    label: "NavigateContainer"
})<{}>(() => {
    return {
        overflow: "hidden",
        backgroundColor: "#333"

    };
});


export const NavigateLink = styled("a", {
    label: "NavigateLink"
})<{}>(() => {
    return {
        float: "left",
        color: "#f2f2f2",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        fontSize: 17
    };
});
