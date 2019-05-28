import React from 'react'
import styled, {css} from "styled-components";



const HomePage = styled.div`
    background-image: url('imgs/homeimg.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    /* overflow-y: scroll; */
    height: 100vh;
`

const Home = ()=>{
    return (
        <HomePage/>
    )
}

export default Home;