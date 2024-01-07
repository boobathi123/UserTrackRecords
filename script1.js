// Replace this URL with your actual backend URL
const backendUrl = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', () => {
  fetch(`${backendUrl}/user_track_recs`)
    .then(response => response.json())
    .then(data => {
      const userData = document.getElementById('userData');
      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td><td>${user.ts}</td>`;
        userData.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
