let model;

async function loadModel() {
  model = await mobilenet.load();
  console.log("MobileNet model loaded");
}

loadModel();

document.getElementById("imageUpload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const img = document.getElementById("preview");
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const predictions = await model.classify(img);
    document.getElementById("result").innerHTML = predictions.map(p => 
      `${p.className} - ${(p.probability * 100).toFixed(2)}%`
    ).join('<br/>');
  }
});
