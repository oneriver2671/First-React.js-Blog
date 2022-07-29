
import React, { useState } from 'react';
import './App.css';

function App() {

  let posts = ['우리집에 왜 왔니', '손민수 교수님 최고...', '스벨트도 해보고 싶다', '조성진도 좋고 임윤찬도 좋다'];
  let _likeNums = [0, 0, 0, 0];

  // ES6 destructuring 문법을 사용한 state 저장
  let [글제목1, 글제목변경] = useState('임윤찬이 최고의 연주자인 이유');   // [a,b]: b에 state 데이터를 변경할 수 있는 함수가 들어감
  let [titles, setTitles] = useState(posts);  
  let [inputText, setInputText] = useState('');

  // state를 변경하려면, 함께 만들어진 setLikeNum() 함수를 써야만 변경 가능
  let [likeNum, setLikeNum] = useState(0);

  // modal창 
  let [modal, setModal] = useState(false);   
  let [titleIndex, setTitleIndex] = useState(0);    // 이걸 또 따로 만들어줘야 되는게 불편하네.

  // 좋아요 상태관리
  let [likeNums, setLikeNums] = useState(_likeNums);

  return (
   
    <div className="App">
      <div className='black-nav'>
        <div>한강 Blog</div>
      </div>

      <button onClick={() => {
        // copy 변수 생성 이유: array/object 등을 다룰 땐, 원본은 보존하는 게 좋음 (영구적으로 수정x)
        // state변경함수의 동작원리: 기존 state와 신규 state를 비교 후, 같으면 변경 안해줌 (일종의 에너지 절약)
        let copy = [...titles];	        // js의 배열 복사 문법 (참조가 바뀜. 새로운 배열.)
        copy[0] = '배열1 제목 변경';
        setTitles(copy);

        /* 안되는 코드 (js array 특징) */
        // let arrReference = titles;      // MDN문서: 이렇게 쓰면 배열 복사 안됨. 원본 배열을 가리키는 '참조'만 할당됨.
        // arrReference[0] = '배열1 제목 변경';    // 그래서 이렇게 값을 변경 후 state변경함수를 적용하는 게 불가능. arrReference의 화살표는 변하지 않았기 때문.
        // setTitles(arrReference);

      }}>제목 수정 버튼</button>

      {/**문자열 정렬 (오름차순) */}
      <button onClick={() => {
        let ascArr = [...posts];   // titles도 되고, posts도 되네?
        ascArr.sort();
        setTitles(ascArr);
      }}>글제목 오름차순 정렬</button>

      {/**문자열 정렬 (내림차순) */}
      <button onClick={() => {
        let descArr = [...titles]; 
        descArr.sort();
        descArr.reverse();
        setTitles(descArr);
      }}>글제목 내림차순 정렬</button>

      <div>
        <input onChange={(e)=>{ 
          setInputText(e.target.value);   // (참고) state변경함수는 늦게 처리됨 => 비동기처리
          }}></input> 
        <button onClick={()=>{
          // inputText state가 titles 배열 state에 추가
          let newTitles = [...titles];
          newTitles.push(inputText);
          setTitles(newTitles);

          // 좋아요 state에 추가
          let newLikeNums = [...likeNums];
          newLikeNums.push(0);
          setLikeNums(newLikeNums);
        }}>글 추가</button>
      </div>
      
      {/**글 목록 */}
      <div className='list'>
        <h3> { 글제목1 } <span>👍</span> { likeNum } </h3>
        <p>7월 25일 발행</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { titles[0] } <span onClick={ ()=>{ setLikeNum(likeNum+1) } }>👍</span> { likeNum } </h3>
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
        {/**모달 컴포넌트 열고/닫기 */}
        <h3 onClick={ ()=>{ 
          let isModalOpened = modal == false ? true : false;
          setModal(isModalOpened); 
          } }> { titles[3] } </h3>
        <p>modal창 열고 닫기</p>
        <hr/>
      </div>

      {
        // React에서 반복문
        titles.map(function(title, i) {
          return (
            <div className='list' key={i}>
              <h3 onClick={ ()=>{ 
                let isModalOpened = modal == false ? true : false;
                setModal(isModalOpened);
                setTitleIndex(i);
               } }>
                { title } 

                {/**좋아요 기능 */}
                <span onClick={ (e)=>{ 
                  e.stopPropagation();  // 이벤트 버블링 막는 코드 (모달창 안열리게)

                  let newLikeNums = [...likeNums];
                  newLikeNums[i] = newLikeNums[i] + 1;
                  setLikeNums(newLikeNums);  
                  } }>👍
                </span> 
                { likeNums[i] } 
              </h3>  
              <p>{ i+1 }번</p>
              <hr/>
            </div>
          )
        })
      }

      {
        // 모달 컴포넌트 (props 전송)
        modal == true ? <Modal color={'skyblue'} titles={titles} setTitles={setTitles} titleIndex={titleIndex}></Modal> : null      // html 중간에 조건문 쓰려면, 삼항연산자 사용 추천 (다른 깔끔한 방법도 있나? v-if 같은.)
      }
    </div> 
  );
}

// 다른 함수 바깥에 만들어야 함, 컴포넌트 함수는 대문자.
// (참고1) 의미없는 <div>로 한번 감싸줘야 할 땐, 그냥 <> 이렇게 쓰면 됨. (fragment 문법)

// 모달 컴포넌트
function Modal(props){

  // html
  return (
    <div className='modal' style={ {background: props.color} }>
      <h4> { props.titles[props.titleIndex] } </h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={ modifyTitle }>글 수정</button>
    </div>
  )

  // 글 수정 함수
  function modifyTitle(){
    let newTitles = [...props.titles];
    newTitles[0] = '수정된 글1';
    props.setTitles(newTitles);
  }
} 

export default App;
