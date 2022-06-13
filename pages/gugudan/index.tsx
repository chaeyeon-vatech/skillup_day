import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useState, useRef} from "react";
import {Navigation} from "../../components/Navigation";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import IMask from "imask";
import {DefaultContainer, ErrorComponent} from "../../components/styled";

type ValueType = {
    first: number;
    second: number;
};

// form validation rules
const validationSchema = Yup.object().shape({
    ifNotNumberError: Yup.number()
        .required('Register Sample is required')
        .typeError('Number 형식으로 입력해야 합니다!'),
    hookformValue: Yup.number().nullable()

});

const GugudanComponent: NextPage<ValueType> = values => {
    const {first, second} = values;
    const [result, setResult] = useState('');

    const numberFilter = /^[0-9]*$/;


    const numberPipe = IMask.createPipe({
        mask: numberFilter
    })

    // useForm의 return 값인 methods로 form 데이터를 관리할 수 있다.
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState
    } = useForm({resolver: yupResolver(validationSchema)});

    const {errors} = formState;

    const router = useRouter();

    const handleonSubmit = (e: any) => {
        if (e.ifNotNumberError === first * second) {
            setResult('정답!');
            router.replace(router.asPath);
        } else {
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
                    <h4>위 질문에 대한 답을 입력하는 INPUT FIELD 입니다. : </h4>
                    {/*숫자만 입력 가능*/}
                    <input
                        {...register('ifNotNumberError')}
                    />
                    <button type={"submit"}>입력</button>

                    <div>{result}</div>

                    <h4>숫자만 입력되는 INPUT FIELD 입니다 : </h4>
                    <Controller
                        name={"hookformValue"}
                        control={control}
                        defaultValue={""}
                        render={props => {
                            const {onBlur, onChange, ref, value} = props.field
                            return (
                                <input
                                    ref={ref}
                                    type={"text"}
                                    value={value}
                                    onChange={e => onChange(numberPipe(e.target.value))}
                                    onBlur={onBlur}

                                />
                            )
                        }}
                    />

                    <ErrorComponent>{errors.ifNotNumberError?.message}</ErrorComponent>
                </form>

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
