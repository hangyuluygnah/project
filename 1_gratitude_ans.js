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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const writeJournalBtn = document.getElementById("write-journal-btn");
const journalModal = document.getElementById("journal-modal");
const emotionModal = document.getElementById("emotion-modal");
const viewJournalModal = document.getElementById("view-journal-modal");
const submitBtn = document.getElementById("submit-btn");
const exitBtn = document.getElementById("exit-btn");
const emotionSubmitBtn = document.getElementById("emotion-submit-btn");
const emotionSkipBtn = document.getElementById("emotion-skip-btn");
const closeViewBtn = document.getElementById("close-view-btn");
const journalContent = document.getElementById("journal-content");
const emotionContent = document.getElementById("emotion-content");
const pastJournals = document.getElementById("past-journals");
const viewJournalTitle = document.getElementById("view-journal-title");
const journalDate = document.getElementById("journal-date");
const viewJournalContent = document.getElementById("view-journal-content");
const viewEmotion = document.getElementById("view-emotion");
const viewEmotionContent = document.getElementById("view-emotion-content");

// Modal related variables
let currentJournalContent = "";
let isPositive = false;

// Show journal writing modal
writeJournalBtn.addEventListener("click", () => {
  journalModal.classList.add("show");
  journalContent.value = "";
});

// Close journal writing modal
exitBtn.addEventListener("click", () => {
  journalModal.classList.remove("show");
});

// Close emotion modal (Skip)
emotionSkipBtn.addEventListener("click", () => {
  emotionModal.classList.remove("show");
  saveJournal(currentJournalContent);
});

// Close journal viewing modal
closeViewBtn.addEventListener("click", () => {
  viewJournalModal.classList.remove("show");
});

// Submit journal
submitBtn.addEventListener("click", () => {
  const content = journalContent.value.trim();

  if (!content) {
    alert("일기 내용을 작성해주세요.");
    return;
  }

  // Save the content to use later
  currentJournalContent = content;

  // Check if content is positive
  isPositive = checkIfPositive(content);

  if (isPositive) {
    // If positive, show emotion modal
    journalModal.classList.remove("show");
    emotionModal.classList.add("show");
    emotionContent.value = "";
  } else {
    // If not positive, save directly without emotion
    journalModal.classList.remove("show");
    saveJournal(content);
  }
});

// Submit emotion
emotionSubmitBtn.addEventListener("click", () => {
  const emotion = emotionContent.value.trim();

  if (!emotion) {
    alert("감정을 작성해주세요.");
    return;
  }

  emotionModal.classList.remove("show");
  saveJournal(currentJournalContent, emotion);
});

// Function to check if content is positive
function checkIfPositive(content) {
  const positiveWords = [
    "happy",
    "grateful",
    "glad",
    "thankful",
    "blessed",
    "joy",
    "love",
    "appreciated",
    "good",
    "wonderful",
    "행복",
    "감사",
    "기쁨",
    "사랑",
    "좋은",
    "멋진",
    "감사해",
    "좋았",
    "행복했",
    "기뻤",
  ];

  const contentLower = content.toLowerCase();

  for (const word of positiveWords) {
    if (contentLower.includes(word)) {
      return true;
    }
  }

  return false;
}

// Function to save journal to Firebase
async function saveJournal(content, emotion = null) {
  try {
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}`;

    // Data to save
    const journalData = {
      content: content,
      timestamp: serverTimestamp(),
      date: formattedDate,
      isPositive: emotion !== null,
    };

    // Add emotion if provided
    if (emotion) {
      journalData.emotion = emotion;
    }

    // Save to Firestore
    await addDoc(collection(db, "gratitudeJournals"), journalData);

    // Reset and reload
    currentJournalContent = "";
    loadPastJournals();
  } catch (error) {
    console.error("Error saving journal:", error);
    alert("일기 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}

// Load past journals
async function loadPastJournals() {
  try {
    // Clear previous content
    pastJournals.innerHTML = "";

    // Query the latest 3 journals
    const q = query(
      collection(db, "gratitudeJournals"),
      orderBy("timestamp", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      pastJournals.innerHTML =
        "<p>아직 작성된 일기가 없습니다. 지금 시작해보세요!</p>";
      return;
    }

    // Create journal elements
    querySnapshot.forEach((doc) => {
      const journal = doc.data();
      const journalItem = document.createElement("div");
      journalItem.classList.add("journal-item");

      // Format date
      const date = journal.date || "알 수 없는 날짜";

      journalItem.innerHTML = `
        <h3>Journal of ${date}</h3>
        <p class="journal-preview">${journal.content.substring(0, 100)}${
        journal.content.length > 100 ? "..." : ""
      }</p>
      `;

      // Add click event to view journal
      journalItem.addEventListener("click", () => {
        // Set content in view modal
        journalDate.textContent = date;
        viewJournalContent.textContent = journal.content;

        // Handle emotion display
        if (journal.emotion) {
          viewEmotion.classList.remove("hidden");
          viewEmotionContent.textContent = journal.emotion;
        } else {
          viewEmotion.classList.add("hidden");
        }

        // Show modal
        viewJournalModal.classList.add("show");
      });

      pastJournals.appendChild(journalItem);
    });
  } catch (error) {
    console.error("Error loading journals:", error);
    pastJournals.innerHTML = "<p>Error loading journals.</p>";
  }
}

// Load journals on page load
window.addEventListener("DOMContentLoaded", loadPastJournals);
