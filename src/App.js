
import React, { useState } from 'react';
import './App.css';

function App() {

  let posts = ['우리집에 왜 왔니', '컬처닷컴이 최고다', '스벨트도 해보고 싶다', '조성진도 좋고 임윤찬도 좋다'];

  // ES6 destructuring 문법을 사용한 state 저장
  let [글제목1, 글제목변경] = useState('임윤찬이 최고의 연주자인 이유');   // [a,b]: b에 state 데이터를 변경할 수 있는 함수가 들어감
  let [titles, changeTitles] = useState(posts);  

  // state를 변경하려면, 함께 만들어진 changeLikeNum() 함수를 써야만 변경 가능
  let [likeNum, changeLikeNum] = useState(0);

  // 
  let [modal, setModal] = useState(false);

  function 제목바꾸기() {
  }

  return (
    // JSX문법 사용. js이기 때문에, class라고 쓸 수 없음. 대신 className.
    // html대신 굳이 왜 이렇게 쓰냐? 리앵뷰의 장점 -> 데이터 바인딩이 쉽게 되기 때문 ★
    <div className="App">
      <div className='black-nav'>
        <div>한강 Blog</div>
      </div>

      {/**함수 뒤에 () 붙이면, click 하기 전에 바로 실행되어버림. */}
      <button onClick={ 제목바꾸기 }>제목바꾸기 함수 버튼</button>
      <button onClick={() => {
        // copy 변수 생성 이유: array/object 등을 다룰 땐, 원본은 보존하는 게 좋음 (영구적으로 수정x)
        // state변경함수의 동작원리: 기존 state와 신규 state를 비교 후, 같으면 변경 안해줌 (일종의 에너지 절약)
        let copy = [...titles];	        // js의 배열 복사 문법 (참조가 바뀜. 새로운 배열.)
        copy[0] = '배열1 제목 변경';
        changeTitles(copy);

        /* 안되는 코드 (js array 특징) */
        // let arrReference = titles;      // MDN문서: 이렇게 쓰면 배열 복사 안됨. 원본 배열을 가리키는 '참조'만 할당됨.
        // arrReference[0] = '배열1 제목 변경';    // 그래서 이렇게 값을 변경 후 state변경함수를 적용하는 게 불가능. arrReference의 화살표는 변하지 않았기 때문.
        // changeTitles(arrReference);

      }}>제목 수정 버튼</button>

      {/**문자열 정렬 (오름차순) */}
      <button onClick={() => {
        let ascArr = [...posts];   // titles도 되고, posts도 되네?
        ascArr.sort();
        changeTitles(ascArr);
      }}>글제목 오름차순 정렬</button>

      {/**문자열 정렬 (내림차순) */}
      <button onClick={() => {
        let descArr = [...titles]; 
        descArr.sort();
        descArr.reverse();
        changeTitles(descArr);
      }}>글제목 내림차순 정렬</button>


      {/**글 목록 */}
      <div className='list'>
        <h3> { 글제목1 } <span>👍</span> { likeNum } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { titles[0] } <span onClick={ ()=>{ changeLikeNum(likeNum+1) } }>👍</span> { likeNum } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { titles[1] } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { titles[2] } </h3>
        <p>7월 26일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        {/**TODO: true면 false, false면 true 넣기 */}
        <h3 onClick={ ()=>{ setModal(true) } }> { titles[3] } </h3>
        <p>7월 27일 발행</p>
        <hr/>
      </div>

      {/**6강. 모달 컴포넌트 */}
      {
        modal == true ? <Modal/> : null      // html 중간에 조건문 쓰려면, 삼항연산자 사용 추천 (다른 깔끔한 방법도 있나? v-if 같은.)
      }
    </div> 
  );
}

// 다른 함수 바깥에 만들어야 함, 컴포넌트 함수는 대문자.
// (참고1) 의미없는 <div>로 한번 감싸줘야 할 땐, 그냥 <> 이렇게 쓰면 됨. (fragment 문법)
function Modal() {
  return (
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
} 

export default App;
