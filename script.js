const saveBtn = document.getElementById("saveBtn");
const leadsContainer = document.getElementById("leads");
const error = document.getElementById("error");

let leads = JSON.parse(localStorage.getItem("leads")) || [];

renderLeads();

saveBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const source = document.getElementById("source").value;
    const manager = document.getElementById("manager").value;
    const stage = document.getElementById("stage").value;
    const requested = document.getElementById("requested").checked;

    if (name === "" || phone === "") {
        error.textContent = "Заполните имя и телефон!";
        return;
    }

    const phoneRegex = /^[+0-9()\-\s]+$/;
    const digits = phone.replace(/\D/g, "");

    if (!phoneRegex.test(phone) || digits.length < 10) {
        error.textContent = "Введите корректный номер телефона.";
        return;
    }

    error.textContent = "";

    const lead = {
        name,
        phone,
        source,
        manager,
        stage,
        requested
    };

    leads.push(lead);

    localStorage.setItem("leads", JSON.stringify(leads));

    renderLeads();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("source").selectedIndex = 0;
    document.getElementById("manager").selectedIndex = 0;
    document.getElementById("stage").selectedIndex = 0;
    document.getElementById("requested").checked = false;
});

function renderLeads() {

    leadsContainer.innerHTML = "";

    leads.forEach((lead) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <b>${lead.name}</b><br>
            Телефон: ${lead.phone}<br>
            Источник: ${lead.source}<br>
            Ответственный: ${lead.manager}<br>
        
            Этап:
            <select class="stageSelect ${getStageClass(lead.stage)}">
                <option ${lead.stage === "Новый лид" ? "selected" : ""}>
                    Новый лид
                </option>
        
                <option ${lead.stage === "Квалифицирован" ? "selected" : ""}>
                    Квалифицирован
                </option>
        
                <option ${lead.stage === "Назначена консультация" ? "selected" : ""}>
                    Назначена консультация
                </option>
        
                <option ${lead.stage === "Отказ" ? "selected" : ""}>
                    Отказ
                </option>
            </select>
        
            <br><br>
        
            ТЗ: ${lead.requested ? "Да" : "Нет"}
        `;

        const stageSelect = card.querySelector(".stageSelect");

        stageSelect.addEventListener("change", () => {

            lead.stage = stageSelect.value;

            stageSelect.className = "stageSelect " + getStageClass(lead.stage);

            localStorage.setItem("leads", JSON.stringify(leads));
        });

        leadsContainer.appendChild(card);
    });
}

function getStageClass(stage) {

    switch (stage) {

        case "Новый лид":
            return "stage-new";

        case "Квалифицирован":
            return "stage-qualified";

        case "Назначена консультация":
            return "stage-consultation";

        case "Отказ":
            return "stage-rejected";

        default:
            return "";
    }

}