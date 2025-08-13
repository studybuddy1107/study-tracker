const form = document.getElementById('trackerForm');
const tableBody = document.querySelector('#logTable tbody');

function getStatus(e, m, t, target) {
  const total = e + m + t;
  if (total === 0 && target > 0) return "To Do";
  if (total < target) return "In Progress";
  return "Done";
}

function addEntryToTable(data) {
  const row = document.createElement('tr');

  const status = getStatus(data.easy, data.moderate, data.tough, data.target);
  row.classList.add(status.toLowerCase().replace(' ', ''));

  row.innerHTML = `
    <td>${data.date}</td>
    <td>${data.physics}</td>
    <td>${data.easy}</td>
    <td>${data.moderate}</td>
    <td>${data.tough}</td>
    <td>${data.math}</td>
    <td>${data.mathQs}</td>
    <td>${data.target}</td>
    <td>${status}</td>
  `;

  tableBody.appendChild(row);
}

function saveEntry(data) {
  const entries = JSON.parse(localStorage.getItem('studyLog')) || [];
  entries.push(data);
  localStorage.setItem('studyLog', JSON.stringify(entries));
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('studyLog')) || [];
  entries.forEach(addEntryToTable);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    date: document.getElementById('date').value,
    physics: document.getElementById('physics').value,
    easy: parseInt(document.getElementById('easy').value || 0),
    moderate: parseInt(document.getElementById('moderate').value || 0),
    tough: parseInt(document.getElementById('tough').value || 0),
    math: document.getElementById('math').value,
    mathQs: parseInt(document.getElementById('mathQs').value || 0),
    target: parseInt(document.getElementById('target').value || 0)
  };

  addEntryToTable(data);
  saveEntry(data);
  form.reset();
});

loadEntries();
