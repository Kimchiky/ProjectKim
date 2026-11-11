// ===== Data menu: ubah nama, harga, butiran dan gambar di sini =====
// "gambar" ialah laluan fail foto anda (letak dalam folder images).
// Jika fail foto tiada, ikon emoji akan dipaparkan sebagai ganti.
const menu = [
  { nama: "Nasi Lemak Ayam Goreng", harga: 9.5, kat: "makanan", emoji: "🍛", gambar: "images/nasi-lemak-ayam.jpg", butir: "Ayam goreng berempah, sambal tumis, telur rebus, timun." },
  { nama: "Nasi Lemak Rendang", harga: 10, kat: "makanan", emoji: "🍚", gambar: "images/nasi-lemak-rendang.jpg", butir: "Rendang daging masak lemak, kacang goreng, ikan bilis." },
  { nama: "Mee Goreng Mamak", harga: 7.5, kat: "makanan", emoji: "🍜", gambar: "images/mee-goreng.jpg", butir: "Mee kuning digoreng bersama tauhu, telur dan sos cili." },
  { nama: "Nasi Kandar Campur", harga: 12, kat: "makanan", emoji: "🍛", gambar: "images/nasi-kandar.jpg", butir: "Nasi putih dengan tiga lauk pilihan dan kuah campur." },
  { nama: "Roti Canai (2 keping)", harga: 3.5, kat: "makanan", emoji: "🥞", gambar: "images/roti-canai.jpg", butir: "Rangup di luar, lembut di dalam, dengan dal dan kari." },
  { nama: "Teh Tarik", harga: 3, kat: "minuman", emoji: "🧋", gambar: "images/teh-tarik.jpg", butir: "Teh pekat ditarik hingga berbuih." },
  { nama: "Kopi O Ais", harga: 3.5, kat: "minuman", emoji: "☕", gambar: "images/kopi-o-ais.jpg", butir: "Kopi hitam kampung, sejuk dan kuat." },
  { nama: "Sirap Bandung", harga: 3.5, kat: "minuman", emoji: "🥤", gambar: "images/sirap-bandung.jpg", butir: "Sirap ros dengan susu, dihidang dengan ais." },
  { nama: "Air Tebu", harga: 4, kat: "minuman", emoji: "🧃", gambar: "images/air-tebu.jpg", butir: "Diperah segar setiap hari." },
  { nama: "Cendol", harga: 5.5, kat: "pencuci", emoji: "🍧", gambar: "images/cendol.jpg", butir: "Santan, gula Melaka dan cendol pandan." },
  { nama: "Pisang Goreng (5 biji)", harga: 5, kat: "pencuci", emoji: "🍌", gambar: "images/pisang-goreng.jpg", butir: "Digoreng panas, dihidang dengan kopi atau teh." },
  { nama: "Ais Kacang", harga: 6, kat: "pencuci", emoji: "🍨", gambar: "images/ais-kacang.jpg", butir: "Ais carik, kacang merah, jagung dan sirap." }
];

// ===== Papar menu mengikut kategori =====
const senarai = document.getElementById("senarai");
const tabs = document.querySelectorAll(".tab");

function papar(kat) {
  senarai.innerHTML = menu
    .filter(item => kat === "semua" || item.kat === kat)
    .map(item => `
      <li class="hidang">
        <div class="foto ${item.kat}">
          <span aria-hidden="true">${item.emoji}</span>
          <img src="${item.gambar}" alt="${item.nama}" loading="lazy">
        </div>
        <div class="isi">
          <div class="baris">
            <span class="nama">${item.nama}</span>
            <span class="titik"></span>
            <span class="harga">RM ${item.harga.toFixed(2)}</span>
          </div>
          <p>${item.butir}</p>
        </div>
      </li>`)
    .join("");

  // Tunjuk foto hanya jika fail wujud; jika tiada, emoji kekal
  senarai.querySelectorAll(".foto img").forEach(img => {
    if (img.complete && img.naturalWidth > 0) img.classList.add("siap");
    img.addEventListener("load", () => img.classList.add("siap"));
    img.addEventListener("error", () => img.remove());
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.setAttribute("aria-pressed", t === tab));
    papar(tab.dataset.kat);
  });
});

papar("semua");

// ===== Borang tempahan =====
const borang = document.getElementById("borang");
const mesej = document.getElementById("mesej");
const tarikh = document.getElementById("tarikh");

// Tarikh paling awal ialah hari ini (ikut waktu tempatan)
tarikh.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);

borang.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(borang);
  const nama = data.get("nama").trim();
  const telefon = data.get("telefon").trim();

  if (!/^[0-9+\-\s]{9,15}$/.test(telefon)) {
    mesej.textContent = "Nombor telefon tidak sah. Contoh: 012-345 6789.";
    mesej.className = "mesej ralat";
    return;
  }

  mesej.textContent =
    `Terima kasih, ${nama}. Meja untuk ${data.get("orang")} orang pada ` +
    `${data.get("tarikh")}, ${data.get("masa")} telah direkodkan. ` +
    `Kami akan hubungi anda di ${telefon} untuk mengesahkan.`;
  mesej.className = "mesej ok";
  borang.reset();
});