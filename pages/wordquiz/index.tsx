import type {NextPage} from "next";
import React, {useState, useRef} from "react";
import {Navigation} from "../../components/Navigation";
import {DefaultContainer} from "../styled";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

// form validation rules
const validationSchema = Yup.object().shape({
    ifNotStringError: Yup.string()
        .required('Register Sample is required')
        .matches(/^[aA-zZ\s]+$/, "영어만 입력 가능합니다! ")
});

const WordQuizComponent: NextPage = () => {
    const [given, setGiven] = useState('Zerocho')
    const [result, setResult] = useState('')

    // useForm의 return 값인 methods로 form 데이터를 관리할 수 있다.
    const {
        register,
        handleSubmit,
        reset,
        formState
    } = useForm({resolver: yupResolver(validationSchema)});


    const {errors} = formState;

    const onSubmit = (e: any) => {
        console.log("E >>>", typeof e.ifNotStringError)
        if (e.ifNotStringError) {
            if (given[given.length - 1] === e.ifNotStringError[0]) {
                setResult("딩동댕!");
                setGiven(e.ifNotStringError);
            } else {
                setResult("땡!")
                reset()
            }
        }
        reset();
    };


    return (
        <>
            <Navigation/>
            <DefaultContainer>
                <h2>{given}</h2>
                <form onSubmit={(e) => {
                    handleSubmit(onSubmit)(e)
                        .catch((err) => {
                            console.error(err)
                        });
                }}>
                    <input {...register('ifNotStringError')}/>
                    <div>{errors.ifNotStringError?.message}</div>
                    <button type={"submit"}>입력!</button>
                </form>
                <div>{result}</div>
            </DefaultContainer>
        </>
    );
};

export default WordQuizComponent;
