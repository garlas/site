// Mengatur tombol hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Subkelas & kelas
const subClassOptions = {
  X: [
    "X-1",
    "X-2",
    "X-3",
    "X-4",
    "X-5",
    "X-6",
    "X-7",
    "X-8",
    "X-9",
    "X-10",
    "X-11",
    "X-12",
  ],
  XI: [
    "XI IPA-1",
    "XI IPA-2",
    "XI IPA-3",
    "XI IPA-4",
    "XI IPA-5",
    "XI IPA-6",
    "XI IPA-7",
    "XI IPA-8",
    "XI IPS-9",
    "XI IPS-10",
    "XI IPS-11",
    "XI IPS-12",
  ],
  XII: [
    "XII IPA-1",
    "XII IPA-2",
    "XII IPA-3",
    "XII IPA-4",
    "XII IPA-5",
    "XII IPA-6",
    "XII IPA-7",
    "XII IPA-8",
    "XII IPS-9",
    "XII IPS-10",
    "XII IPS-11",
    "XII IPS-12",
  ],
};

// Mengatur form pemilihan kelas
document.getElementById("classLevel").addEventListener("change", function () {
  const classLevel = this.value;
  const subclassDropdown = document.getElementById("subclass");

  // Kosongkan pilihan subkelas sebelumnya
  subclassDropdown.innerHTML =
    '<option value="" disabled selected>Pilih subkelas</option>';

  // Tambahkan opsi subkelas sesuai dengan tingkat kelas yang dipilih
  if (subClassOptions[classLevel]) {
    subClassOptions[classLevel].forEach((subclass) => {
      const option = document.createElement("option");
      option.value = subclass;
      option.textContent = subclass;
      subclassDropdown.appendChild(option);
    });

    // Tampilkan dropdown subkelas
    subclassDropdown.style.display = "block";
  } else {
    subclassDropdown.style.display = "none";
  }
});

// Mengatur form pemilihan subkelas
document.getElementById("subclass").addEventListener("change", function () {
  const selectedSubclass = this.value;

  if (!selectedSubclass) {
    alert("Silakan pilih subkelas Anda!");
    return;
  }

  // Simpan subkelas ke sessionStorage
  sessionStorage.setItem("class", selectedSubclass);

  // Sembunyikan form kelas dan tampilkan form aspirasi
  document.getElementById("classSection").style.display = "none";
  document.getElementById("aspirasiSection").style.display = "block";
});

// Mengatur form aspirasi
document
  .getElementById("aspirasiForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman secara default

    const selectedClass = sessionStorage.getItem("class");
    const teksAspirasi = document
      .querySelector('textarea[name="teksAspirasi"]')
      .value.trim();
    const submitButton = document.querySelector(
      "#aspirasiForm input[type='submit']"
    );

    if (teksAspirasi === "") {
      alert("Teks aspirasi harus diisi!");
      return;
    }

    submitButton.disabled = true; // Nonaktifkan tombol kirim untuk mencegah pengiriman ganda

    const hari = new Date();

    const webhookUrl =
      "https://discord.com/api/webhooks/1274643187742281788/949FutOCV7wUpFr5642KasuS6B1D1W2dyKTUWqOzLhF0dYASVQXNK8fqtmVlGorfXeqj";

    const requestData = {
      embeds: [
        {
          title: "📢 Aspirasi Baru Diterima",
          description: "Berikut adalah detail dari aspirasi yang diterima:",
          color: 3066993,
          fields: [
            {
              name: "👤 Pengirim",
              value: `\`\`\`Kelas ${selectedClass}\`\`\``,
              inline: false,
            },
            {
              name: "💬 Pesan Aspirasi",
              value: `\`\`\`${teksAspirasi}\`\`\``,
              inline: false,
            },
            {
              name: "📅 Tanggal",
              value: `**${hari}**`,
              inline: false,
            },
          ],
          footer: {
            text: "Aspirasi ini dikirim melalui form online.",
          },
        },
      ],
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Aspirasi berhasil dikirim!");
          document.getElementById("aspirasiForm").reset();
        } else {
          alert("Gagal mengirim aspirasi.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal mengirim aspirasi.");
      })
      .finally(() => {
        submitButton.disabled = false; // Aktifkan kembali tombol setelah pengiriman selesai
      });
  });
