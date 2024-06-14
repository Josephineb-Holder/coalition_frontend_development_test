const user_name = "coalition";
const passWord = "skills-test";

const auth = btoa(`${user_name}:${passWord}`);

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  headers: {
    Authorization: `Basic ${auth}`,
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data[3]);
    let pati = data[3];

    const markup = `
    <img src="${pati.profile_picture}"></img>
     <p>${pati.name}</p>
    `;
    const markUp = `
    <small>📅 Date of birth</small>
    <li>${pati.date_of_birth}</li>
    <small> ₽ Gender</small>
    <li>${pati.gender}</li>
    <small> 📞 Contact Info</small>
    <li>${pati.phone_number}</li>
    <small> 📞 Emergency Contact</small>
    <li>${pati.emergency_contact}</li>
    <small>  Insurence Provider</small>
    <li>${pati.insurance_type}</li>

    `;
    document.getElementById("user_img").insertAdjacentHTML("beforeend", markup);
    document.getElementById("user").insertAdjacentHTML("beforeend", markUp);
  })
  .catch((err) => {
    console.log("rejected", err);
  });

const ctx = document.getElementById("myChart");
fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  headers: {
    Authorization: `Basic ${auth}`,
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data[3]);
    let patient = data[3];

    const labels = Object.keys(patient.diagnosis_history);
    const bloodPressureData = patient.diagnosis_history.blood_pressure;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Blood Pressure",
            data: bloodPressureData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
