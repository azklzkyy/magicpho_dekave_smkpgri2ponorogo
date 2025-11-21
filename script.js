// ====== CONFIG ======
const API_KEY = "AIzaSyAo80ZVdId9zitFFbNijAPlD_SK107ZsbE";
const MODEL = "imagen-4.0-generate-001";

// ====== GENERATE IMAGE ======
async function generateImage() {
    const prompt = document.getElementById("gen-prompt").value;
    const loader = document.getElementById("gen-loader");
    const img = document.getElementById("gen-result-img");

    loader.classList.remove("hidden-custom");
    img.classList.add("hidden-custom");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: {
                        text: prompt
                    }
                })
            }
        );

        const data = await response.json();

        const base64 = data?.media?.[0]?.base64Data;

        if (!base64) {
            alert("Gagal generate gambar. Coba prompt lain.");
            loader.classList.add("hidden-custom");
            return;
        }

        img.src = "data:image/png;base64," + base64;

        img.classList.remove("hidden-custom");
    } catch (err) {
        console.error(err);
        alert("Terjadi error saat generate gambar.");
    }

    loader.classList.add("hidden-custom");
}

// EVENT LISTENER TOMBOL
document.getElementById("btn-generate").addEventListener("click", generateImage);
