import styled from 'styled-components';

export const ProgressBox = styled.div`
  position: relative;
  display: flex;
  border-radius: 10px;
  background: hsl(92, 88%, 66%, 0);
  transition: background 500ms ease-in-out;

  &.completed {
    background: hsl(92, 88%, 66%, 0.9);
  }
`;

export const ProgressBar = styled.div`
  height: 40px;
  margin: 10px;
  border-radius: 5px;
  background: hsl(0, 88%, 66%, 0);
  min-width: 10px;
  transition: all 500ms ease-out;
`;

export const ButtonBox = styled.div`
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 250ms ease-in-out, transform 150ms ease;

  :hover,
  :focus {
    opacity: 1;
  }
`;

export const ProgressButton = styled.button`
  flex: 1 1 50%;
  font-size: 1.25rem;
  line-height: 1rem;
  color: white;
  text-shadow: 0px 1px 11px black;
  z-index: 1;

  // button reset CSS
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: hsla(0, 0%, 100%, 0.2);
  font-family: sans-serif;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  :hover,
  :focus {
    background: hsla(0, 0%, 100%, 0.4);
  }

  :active {
    :first-child {
      transform: scale(1.05) translateX(-3px);
    }
    :last-child {
      transform: scale(1.05) translateX(3px);
    }
  }
`;

export const ProgressCount = styled.p`
  position: absolute;
  z-index: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 12px black;
`;
