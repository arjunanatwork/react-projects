import styled, {css} from "styled-components";

const Heading = styled.h1`
    ${(props) => props.type === 'h1' &&
            css`font-size: 30px;
                font-weight: 600;
            `
    }

    line-height: 1.4

`;

export default Heading;