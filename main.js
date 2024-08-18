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

// Mengatur form untuk input username
document
  .getElementById("usernameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman secara default

    const username = document.getElementById("username").value.trim();

    if (username === "") {
      alert("Username harus diisi!");
      return;
    }

    // Simpan username ke sessionStorage (atau kamu bisa gunakan localStorage)
    sessionStorage.setItem("username", username);

    // Sembunyikan form username dan tampilkan form aspirasi
    document.getElementById("usernameSection").style.display = "none";
    document.getElementById("aspirasiSection").style.display = "block";
  });

// Mengatur form aspirasi
document
  .getElementById("aspirasiForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman secara default

    const username = sessionStorage.getItem("username");
    const teksAspirasi = document
      .querySelector('textarea[name="teksAspirasi"]')
      .value.trim();

    if (teksAspirasi === "") {
      alert("Teks aspirasi harus diisi!");
      return;
    }

    const hari = new Date();

    const webhookUrl =
      "https://discord.com/api/webhooks/1116018572666355876/cwt-8scvtSceX4fIyYgxfry0ZtxBJFCCcEcTy-sEAMrvWde2ZK704lNv3CstnZmy0XyW";

    const requestData = {
      embeds: [
        {
          title: "📢 Aspirasi Baru Diterima",
          description: "Berikut adalah detail dari aspirasi yang diterima:",
          color: 3066993,
          fields: [
            {
              name: "👤 Pengirim",
              value: `\`\`\`${username}\`\`\``,
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
      });
  });
