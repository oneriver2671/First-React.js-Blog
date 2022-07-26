
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let posts = 'state말고 변수에 저장';


  // ES6 destructuring 문법을 사용한 state 저장
  let [글제목1, 글제목변경] = useState('임윤찬이 최고의 연주자인 이유');   // [a,b]: b에 state 데이터를 변경할 수 있는 함수가 들어감
  let [title, changeTitle] = useState(['배열1 제목', '배열2 제목']);    // array/object 다룰 땐, 원본은 보존하는 게 좋음 (영구적으로 수정x)

  // state를 변경하려면, 함께 만들어진 changeLikeNum() 함수를 써야만 변경 가능
  let [likeNum, changeLikeNum] = useState(0);

  function 제목바꾸기() {
    
  }

  return (
    // JSX문법 사용. js이기 때문에, class라고 쓸 수 없음. 대신 className.
    // html대신 굳이 왜 이렇게 쓰냐? 리앵뷰의 장점 -> 데이터 바인딩이 쉽게 되기 때문 ★
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>

      {/**함수 뒤에 () 붙이면, click 하기 전에 바로 실행되어버림. */}
      <button onClick={ 제목바꾸기 }>글제목 변경 버튼</button>
      <button onClick={() => {
        let copy = [...title];		// 뭐냐 이 그지같은 문법은..? => 동작원리: state변경함수는, 기존 state와 신규 state를 비교 후, 같으면 변경 안해줌
				// array/object 특징: []
        copy[0] = '배열1 제목 변경';
        copy[1] = '배열2 제목 변경';
        changeTitle(copy);
      }}>아아아</button>

      {/**글 목록 */}
      <div className='list'>
        <h3> { posts } </h3>
        <p>7월 25일 발행</p>
        <hr/> 
      </div>
      <div className='list'>
        <h3> { 글제목1 } <span>👍</span> { likeNum } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { title[0] } <span onClick={ ()=>{ changeLikeNum(likeNum+1) } }>👍</span> { likeNum } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { title[1] } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
    </div> 
  );
}

export default App;
