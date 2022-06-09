import type {NextPage} from "next";
import React, {useState, useRef} from "react";
import {Navigation} from "../../components/Navigation";
import {DefaultContainer} from "../styled";

const WordQuizComponent: NextPage = () => {
    const [given, setGiven] = useState('제로초')
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (given[given.length - 1] === inputValue[0]) {
            setResult("딩동댕!");
            setGiven(inputValue);
            setInputValue('');

        } else {
            setResult("땡!")
            setInputValue('');
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    if (inputRef && inputRef.current) {
        inputRef.current.focus();
    }

    return (
        <>
            <Navigation/>
            <DefaultContainer>
                <h2>{given}</h2>
                <form onSubmit={onSubmit}>
                    <input ref={inputRef} value={inputValue} onChange={onChange}/>
                    <button type={"submit"}>입력!</button>
                </form>
                <div>{result}</div>
            </DefaultContainer>
        </>
    );
};

export default WordQuizComponent;
