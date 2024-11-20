// Menyiapkan angka acak untuk soal matematika dengan rentang 10 hingga 99
let num1 = Math.floor(Math.random() * 90) + 10; // Angka acak antara 10 dan 99
let num2 = Math.floor(Math.random() * 90) + 10; // Angka acak antara 10 dan 99
let correctAnswer = num1 + num2;  // Penjumlahan dua angka
let attempts = 0;
let timeLeft = 30; // Waktu yang tersisa (30 detik)
let timerInterval;

// Fungsi untuk menampilkan soal matematika
function generateQuestion() {
    // Menampilkan soal penjumlahan
    document.getElementById('question').textContent = `Berapa hasil dari ${num1} + ${num2}?`;

    // Reset timer
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;

    // Menghentikan timer sebelumnya, jika ada
    clearInterval(timerInterval);

    // Memulai timer baru
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        // Jika waktu habis
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Berhentikan timer
            document.getElementById('result').textContent = 'Waktu habis! Coba lagi.';
            document.getElementById('result').style.color = 'red';
            nextQuestion(); // Pindah ke soal berikutnya
        }
    }, 1000); // 1 detik per hitungan mundur
}

// Fungsi untuk melanjutkan soal baru setelah waktu habis atau jawaban benar
function nextQuestion() {
    num1 = Math.floor(Math.random() * 90) + 10; // Angka acak antara 10 dan 99
    num2 = Math.floor(Math.random() * 90) + 10; // Angka acak antara 10 dan 99
    correctAnswer = num1 + num2;
    generateQuestion();
}

// Menampilkan soal matematika pertama kali
generateQuestion();

// Menambahkan event listener untuk tombol Enter (input field)
document.getElementById('answerInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {  // Jika tombol Enter ditekan
        event.preventDefault();  // Mencegah form atau input mengirimkan data (prevent default)
        checkAnswer();  // Memeriksa jawaban
    }
});

// Menambahkan event listener untuk tombol submit
document.getElementById('submitButton').addEventListener('click', function() {
    checkAnswer();  // Memeriksa jawaban jika tombol submit diklik
});

// Fungsi untuk memeriksa jawaban
function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim(); // Mengambil jawaban dari input, menghapus spasi
    attempts++;

    const resultElement = document.getElementById('result');
    const attemptsElement = document.getElementById('attempts');

    // Mengecek apakah jawaban benar atau salah
    if (userAnswer === "") {
        resultElement.textContent = 'Masukkan jawaban!';
        resultElement.style.color = 'red';
    } else if (parseInt(userAnswer) === correctAnswer) {
        resultElement.textContent = `Selamat! Jawabanmu benar, hasil dari ${num1} + ${num2} adalah ${correctAnswer}.`;
        resultElement.style.color = 'green';
        clearInterval(timerInterval); // Berhentikan timer jika jawaban benar
        nextQuestion(); // Pindah ke soal berikutnya
    } else {
        resultElement.textContent = `Jawaban salah! Coba lagi.`;
        resultElement.style.color = 'red';
    }

    // Update jumlah percobaan
    attemptsElement.textContent = attempts;

    // Mengosongkan input setelah menebak
    document.getElementById('answerInput').value = '';
}
