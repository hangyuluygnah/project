// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWnF0it2M6oGqIRdKS-8uUHhqFHwXLrvc",
  authDomain: "happy-30711.firebaseapp.com",
  projectId: "happy-30711",
  storageBucket: "happy-30711.firebasestorage.app",
  messagingSenderId: "1006201530112",
  appId: "1:1006201530112:web:45ce56959bb3f7e504b5e5",
};

// TODO: Firebase 초기화하기
// app과 db 변수 설정하기
const writeJournalBtn = document.querySelector("#write-journal-btn");
const journalModal = document.querySelector("#journal-modal");
const exitBtn = document.querySelector("#exit-btn");
const submitBtn = document.querySelector("#submit-btn");
const journalContent = document.querySelector("#journal-content");
const emotionModal = document.querySelector("#emotion-modal");
const emotionSubmitBtn = document.querySelector("#emotion-submit-btn");
const emotionContent = document.querySelector("#emotion-content");
// TODO: 필요한 DOM 요소 가져오기

// 모달 관련 변수
let currentJournalContent = "";
let isPositive = false;

// 일기 작성 모달 열기
writeJournalBtn.addEventListener("click", () => {
  journalModal.classList.remove("hidden");
  journalModal.classList.add("show");
});

// 일기 작성 모달 닫기
exitBtn.addEventListener("click", () => {
  journalModal.classList.remove("show");
  journalModal.classList.add("hidden");
});

// // 보기 모달 닫기
// closeViewBtn.addEventListener("click", () => {
//   // TODO: 일기 보기 모달 닫기
// });

// 일기 제출 버튼 클릭
submitBtn.addEventListener("click", () => {
  const content = journalContent.value.trim();
  console.log(content);
  if (!content) {
    alert("내용을 입력하세요");
  } else if (checkIfPositive(content)) {
    emotionModal.classList.remove("hidden");
    emotionModal.classList.add("show");
    journalModal.classList.remove("show");
    journalModal.classList.add("hidden");
    journalContent.value = "";
  }
  else {
    journalModal.classList.remove("show");
    journalModal.classList.add("hidden");
    journalContent.value = "";
  }
});

//감정 제출 버튼 클릭
emotionSubmitBtn.addEventListener("click", () => {
  // TODO:
  // 1. 감정 내용 가져오기
  // 2. 내용이 비어있으면 경고 메시지 표시
  // 3. 일기와 감정을 저장하기 위해 saveJournal 함수 호출
  // 감정 제출 버튼 클릭
  const content = emotionContent.value.trim();
  console.log(content);
  if (!content) {
    alert("내용을 입력하세요");
  } else {
    emotionModal.classList.add("hidden");
    emotionModal.classList.remove("show");
    emotionContent.value = "";
  }
});

// 내용이 긍정적인지 확인하는 함수
function checkIfPositive(content) {
  // TODO:
  // 1. 긍정적인 단어 목록 만들기
  // 2. 입력된 내용이 긍정적인 단어를 포함하는지 확인
  // 3. 결과 반환하기 (true/false)
  const positiveWordList = ["happy", "joy"];
  for (const word of positiveWordList) {
    if (content.includes(word)) {
      return true;
    }
  } 
  return false;
}

// // 일기를 Firebase에 저장하는 함수
// async function saveJournal(content, emotion = null) {
//   try {
//     // TODO:
//     // 1. 현재 날짜 가져오기
//     // 2. 저장할 데이터 객체 만들기 (content, timestamp, date, isPositive)
//     // 3. emotion이 제공되면 데이터에 추가하기
//     // 4. Firebase에 데이터 저장하기
//     // 5. 모달 닫기 및 pastJournals 다시 로드하기
//   } catch (error) {
//     console.error("Error saving journal:", error);
//     alert("일기 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
//   }
// }

// // 과거 일기 불러오기
// async function loadPastJournals() {
//   try {
//     // TODO:
//     // 1. pastJournals 내용 초기화하기
//     // 2. Firebase에서 최신 일기 3개 쿼리하기
//     // 3. 쿼리 결과가 비어있는지 확인하기
//     // 4. 각 일기에 대해 HTML 요소 만들기
//     // 5. 클릭 이벤트 추가하여 일기 상세 보기 기능 구현하기
//   } catch (error) {
//     console.error("Error loading journals:", error);
//     pastJournals.innerHTML = "<p>Error loading journals.</p>";
//   }
// }

// // 페이지 로드 시 과거 일기 불러오기
// window.addEventListener("DOMContentLoaded", loadPastJournals);
