import { Component } from "react";
import "./style.css";

export const Button = ({ text, onClick, disable }) => (
    <button
        className="button"
        disabled={disable}
        onClick={onClick}>
        {text}
    </button>
);
