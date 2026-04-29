async function loadComponent(selector, filePath) {
  const res = await fetch(filePath);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}