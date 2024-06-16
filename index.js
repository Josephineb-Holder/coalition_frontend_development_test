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
    <small> <img src="assets/icons/calendar_today_FILL0_wght300_GRAD0_opsz24@2x.png" alt="" srcset="" style="width:12px;"/> Date of birth</small>
    <li>${pati.date_of_birth}</li>
    <small> <img src="assets/icons/gendericon.png" alt="" srcset=""style="width:17px;" /> Gender</small>
    <li>${pati.gender}</li>
    <small><img src="assets/icons/phoneicon.png" alt="" srcset=""style="width:17px;" /> Contact Info</small>
    <li>${pati.phone_number}</li>
    <small> <img src="assets/icons/phoneicon.png" alt="" srcset=""style="width:17px;" /> Emergency Contact</small>
    <li>${pati.emergency_contact}</li>
    <small> <img src="assets/icons/insurance.png" alt="" srcset="" style="width:17px;"/> Insurence Provider</small>
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

    const level = [...patient.diagnosis_history].map(
      (val) => val.blood_pressure.diastolic.levels
    );
    const blood_pressure = [...patient.diagnosis_history].map(
      (val) => val.blood_pressure.diastolic.value
    );
    const heart_rate = [...patient.diagnosis_history].map(
      (val) => val.heart_rate.value
    );
    const temp = [...patient.diagnosis_history].map(
      (val) => val.temperature.value
    );
    const respiratory = [...patient.diagnosis_history].map(
      (val) => val.respiratory_rate.value
    );

    const tem_level = [...patient.diagnosis_history].map(
      (val) => val.temperature.levels
    );
    const res_level = [...patient.diagnosis_history].map(
      (val) => val.respiratory_rate.levels
    );

    const diagnosis_description = [...patient.diagnostic_list].map(
      (val) => val.description
    );
    const diagnosis_name = [...patient.diagnostic_list].map((val) => val.name);
    const diagnosis_status = [...patient.diagnostic_list].map(
      (val) => val.status
    );
    console.log(diagnosis_description, diagnosis_name, diagnosis_status);
    const mark_up = `
    <p><span style="font-size: larger;color:#fdd3f"> • </span>Systolic</p>
    <li>${blood_pressure[3]}</li>
    <li style="font-size: smaller">${level[2]}</li>
    <hr />
    `;
    const mark_Up = `
    <p><span style="font-size: larger;color:#02f2ff"> • </span>Diastonic</p>
    <li >${blood_pressure[3]}</li>
    <li style="font-size: smaller">${level[2]}</li>
    `;

    const resp_Markup = ` <h3 style="font-weight: bold;">${respiratory[2]}</h3>
    <small>${res_level[2]}</small>`;
    const tem_Markup = ` <h3 style="font-weight: bold;">${temp[0]}</h3>
    <small>${tem_level[0]}</small>`;
    const heart_Markup = ` <h3 style="font-weight: bold;">${heart_rate[0]}</h3>
    <small>${level[0]}</small>`;

    console.log(level[2]);
    console.log(blood_pressure[3]);
    document.getElementById("sys").insertAdjacentHTML("beforeend", mark_up);
    document.getElementById("dia").insertAdjacentHTML("beforeend", mark_Up);
    document
      .getElementById("respiratory")
      .insertAdjacentHTML("beforeend", resp_Markup);

    document
      .getElementById("temperature")
      .insertAdjacentHTML("beforeend", tem_Markup);

    document
      .getElementById("heart_rate")
      .insertAdjacentHTML("beforeend", heart_Markup);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: [...patient.diagnosis_history].map(
          (row) => `${row.month} ${row.year}`
        ),
        datasets: [
          {
            label: "Systolic",
            data: [...patient.diagnosis_history].map(
              (val) => val.blood_pressure.systolic.value
            ),
            borderColor: "#f00",
            backgroundColor: "#fdd3f",
          },
          {
            label: "Diastolic",
            data: [...patient.diagnosis_history].map(
              (val) => val.blood_pressure.diastolic.value
            ),
            borderColor: "#00F",
            backgroundColor: "#02f2ff",
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
