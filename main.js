const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document
  .getElementById("aspirasiForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman secara default

    const teksAspirasi = document.querySelector(
      'textarea[name="teksAspirasi"]'
    ).value;
    const pengirim = "Tidak Diketahui";
    const hari = new Date();

    // Ganti URL ini dengan URL webhook Discord kamu
    const webhookUrl =
      "https://discord.com/api/webhooks/1116018572666355876/cwt-8scvtSceX4fIyYgxfry0ZtxBJFCCcEcTy-sEAMrvWde2ZK704lNv3CstnZmy0XyW";

    // Data yang akan dikirim ke Discord dengan Embed
    const requestData = {
      embeds: [
        {
          title: "📢 Aspirasi Baru Diterima",
          description: "Berikut adalah detail dari aspirasi yang diterima:",
          color: 3066993, // Warna hijau
          fields: [
            {
              name: "👤 Pengirim",
              value: `**${pengirim}**`,
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
            // icon_url: "URL_ICON_IMAGE", // Hapus atau perbarui dengan URL yang valid
          },
        },
      ],
    };

    // Kirim data ke webhook Discord
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
          document.getElementById("aspirasiForm").reset(); // Mengosongkan form setelah submit
        } else {
          alert("Gagal mengirim aspirasi.");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal mengirim aspirasi.");
      });
  });
