import React from "react"
import styled from "styled-components"

const Background = styled.div`
  background: linear-gradient(210deg, #012138 0%, #05a1fc 40.13%, #f6ab11 90%);
  color: white;
  padding: 8rem 0;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
  text-align: center;
`

export default ({ title }) => (
  <Background>
    <h1>{title}</h1>
  </Background>
)
