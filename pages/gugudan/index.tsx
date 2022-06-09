import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState, useRef} from "react";
import {Navigation} from "../../components/Navigation";
import { DefaultContainer } from "../styled";

type ValueType = {
    first: number;
    second: number;
};

const GugudanComponent: NextPage<ValueType> = values => {
    const {first, second} = values;
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputRef.current;

        if (parseInt(inputValue) === first * second) {
            setResult('정답!');
            setInputValue('')
            router.replace(router.asPath);
        } else {
            setResult('땡!');
            setInputValue('');
            if (input) {
                input.focus();
            }
        }
    };

    return (
        <>
            <Navigation/>
            <DefaultContainer>
                <h2>
                    {values.first} 곱하기 {values.second}는?
                </h2>

                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        ref={inputRef}
                        type={"text"}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button type={"submit"}>입력</button>
                </form>
                <div>{result}</div>
            </DefaultContainer>
        </>
    );
};

export function getServerSideProps() {
    const first = Math.ceil(Math.random() * 9);
    const second = Math.ceil(Math.random() * 9);

    return {
        props: {
            first,
            second
        }
    };
}

export default GugudanComponent;
