// JS PART

const form = document.getElementById('trackerForm');
const tableBody = document.querySelector('#logTable tbody');
const submitBtn = document.getElementById('submitBtn');

let editIndex = null;

function getStatus(e, m, t, target) {
  const total = e + m + t;
  if (total === 0 && target > 0) return "To Do";
  if (total < target) return "In Progress";
  return "Done";
}

function addEntryToTable(data, index) {
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
    <td>
      <button class="edit-btn" data-index="${index}">Edit</button>
    </td>
  `;

  tableBody.appendChild(row);
}

function renderTable() {
  tableBody.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('studyLog')) || [];
  entries.forEach((entry, index) => addEntryToTable(entry, index));
}

function loadEntries() {
  renderTable();
}

function saveEntries(entries) {
  localStorage.setItem('studyLog', JSON.stringify(entries));
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

  const entries = JSON.parse(localStorage.getItem('studyLog')) || [];

  if (editIndex !== null) {
    entries[editIndex] = data;
    editIndex = null;
    submitBtn.textContent = "Add Entry";
  } else {
    entries.push(data);
  }

  saveEntries(entries);
  renderTable();
  form.reset();
});

tableBody.addEventListener('click', function(e) {
  if (e.target.classList.contains('edit-btn')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const entries = JSON.parse(localStorage.getItem('studyLog')) || [];
    const entry = entries[index];

    // Populate form
    document.getElementById('date').value = entry.date;
    document.getElementById('physics').value = entry.physics;
    document.getElementById('easy').value = entry.easy;
    document.getElementById('moderate').value = entry.moderate;
    document.getElementById('tough').value = entry.tough;
    document.getElementById('math').value = entry.math;
    document.getElementById('mathQs').value = entry.mathQs;
    document.getElementById('target').value = entry.target;

    editIndex = index;
    submitBtn.textContent = "Update Entry";
  }
});

loadEntries();
