import type {NextPage} from "next";
import React, {useState, useRef} from "react";
import {Navigation} from "../../components/Navigation";
import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import IMask from "imask";
import {DefaultContainer, ErrorComponent} from "../../components/styled";


// form validation rules
const validationSchema = Yup.object().shape({
    ifNotStringError: Yup.string()
        .required('Register Sample is required')
        .matches(/^[aA-zZ\s]+$/, "영어만 입력 가능합니다! "),
    hookformValue: Yup.number().nullable()
});

const WordQuizComponent: NextPage = () => {
    const [given, setGiven] = useState('Zerocho')
    const [result, setResult] = useState('')

    // useForm의 return 값인 methods로 form 데이터를 관리할 수 있다.
    const {
        register,
        handleSubmit,
        reset,
        formState,
        control
    } = useForm({resolver: yupResolver(validationSchema)});

    const alphabetFilter = /^[aA-zZ\s]*$/;


    const alphabetPipe = IMask.createPipe({
        mask: alphabetFilter
    })

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
                    <h4>위 질문에 대한 답을 입력하는 INPUT FIELD 입니다. :</h4>
                    <input {...register('ifNotStringError')}/>
                    <ErrorComponent>{errors.ifNotStringError?.message}</ErrorComponent>

                    <button type={"submit"} style={{marginBottom: 20}}>입력!</button>

                    <div>{result}</div>


                    <h4>영어만 입력되는 INPUT FIELD 입니다 : </h4>
                    <Controller
                        name={"hookformValue"}
                        control={control}
                        defaultValue={null}
                        render={props => {
                            const {onBlur, onChange, ref, value} = props.field
                            return (
                                <input
                                    ref={ref}
                                    type={"text"}
                                    value={value || ""}
                                    onChange={e => onChange(alphabetPipe(e.target.value))}
                                    onBlur={onBlur}

                                />
                            )
                        }}
                    />
                    <ErrorComponent>{errors.ifNotStringError?.message}</ErrorComponent>
                </form>
            </DefaultContainer>
        </>
    );
};

export default WordQuizComponent;
