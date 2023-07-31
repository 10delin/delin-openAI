import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

 html{
  box-sizing: border-box;
  height:100%;
  width: 100%;
  overflow: auto;
  background-color: #242424;
}

#root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  height: 100%;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  place-items: center;
  margin: 0;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 24px;
  border: 2px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
}

button:active {
    background-color: #ffac00;
}
button:hover {
  border: 2px solid #ffac00;
}
button:focus,
button:focus-visible {
  outline: 4px #ffac00;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
    height: 100%;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
} 


`;
