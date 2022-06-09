## 문제 1

문제가 있습니다.
Empty Tag 추가해 주어야 함.

```
const App = () => {
  return (
  <>
    <div>리액트</div>
    <div>어느 정도 공부한거 같은데</div>
    <div>v18은 언제 또 공부하지</div>
  </>
  )
}
```

## 문제 2

useState 의 setState는 비동기로 동작한다.

    setState를 동기적으로 실행시키는 방법
    1. 콜백함수 이용 <비동기 함수 많아지면 끝도 없는 depths>
    2. previous state 이용 <더 추천>

## 문제 3

1. 렌더링 횟수 : 1회
2. Console

```
count 0
```

3. 수정 코드

```
const App = () => {
    let [count, setCount] = useState(0);

    const onChangeCount = () => {
        setCount(prevState => prevState + 1)
    };

    console.log("count", count);

    return <button onClick={onChangeCount}>버튼</button>;
};

```

### 문제 4

1. Console

```
count 1 0
count 2 -1
```

2. 렌더링 횟수 : 2번


### 문제 5

1. Console
```
count 1 0
count 2 0
count 3 0
count 4 0
count 5 3
```
