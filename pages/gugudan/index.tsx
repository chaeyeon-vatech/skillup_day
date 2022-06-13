import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState, useRef} from "react";
import {Navigation} from "../../components/Navigation";
import {DefaultContainer} from "../styled";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type ValueType = {
    first: number;
    second: number;
};

const GugudanComponent: NextPage<ValueType> = values => {
    const {first, second} = values;
    const [result, setResult] = useState('');

    // form validation rules
    const validationSchema = Yup.object().shape({
        ifNotNumberError: Yup.number()
            .required('Register Sample is required')
            .typeError('Number 형식으로 입력해야 합니다!')

    });

    // useForm의 return 값인 methods로 form 데이터를 관리할 수 있다.
    const {
        register,
        handleSubmit,
        reset,
        formState
    } = useForm({resolver: yupResolver(validationSchema)});

    const {errors} = formState;

    const router = useRouter();

    const handleonSubmit = (e: any) => {
        console.log("E >>>", e)
        if (e.ifNotNumberError === first * second) {
            setResult('정답!');
            router.replace(router.asPath);
        }else{
            setResult('땡!')
        }
        reset()
    };

    return (
        <>
            <Navigation/>
            <DefaultContainer>
                <h2>
                    {values.first} 곱하기 {values.second}는?
                </h2>

                <form onSubmit={(e) => {
                    handleSubmit(handleonSubmit)(e)
                        .catch((err) => {
                            console.error(err)
                        });
                }}>
                    {/*숫자만 입력 가능*/}
                    <input
                        {...register('ifNotNumberError')}
                    />

                    <div>{errors.ifNotNumberError?.message}</div>
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
