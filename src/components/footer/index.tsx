import React from "react";
import './index.css'

const Footer = () => {
    return(
        <footer className={'footer'}>
            <p>Double-click to edit a todo</p>
            <p>Created by <a href={'https://github.com/hellolilia'}>hellolilia</a></p>
            <p>Part of <a href={'http://todomvc.com/'}>TodoMVC</a></p>
        </footer>
    )
}

export default Footer