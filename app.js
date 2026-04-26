async function generate() {

  let product = document.getElementById('product').value;
  let details = document.getElementById('details').value;
  let type = document.getElementById('type').value;

  document.getElementById('result').innerText = "Loading...";

  let res = await fetch('http://localhost:3000/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product,
      details,
      type
    })
  });

  let data = await res.json();

  document.getElementById('result').innerText = data.result;
}
