let history = [];
function makePass() {
    let pool = "";
    
    // 1. Check what is selected and add to the character pool
    if (document.getElementById("upper").checked) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("lower").checked) pool += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("nums").checked)  pool += "0123456789";
    if (document.getElementById("syms").checked)  pool += "!@#$%^&*()";

    // If nothing is selected, stop here
    if (pool === "") {
        document.getElementById("result").innerText = "Select an option!";
        return;
    }

    // 2. Get length from slider
    let len = document.getElementById("len").value;
    let password = "";

    document.getElementById("lenVal").innerText = len;
    
    // 3. Loop and pick random characters 
    for (let i = 0; i < len; i++) {
        let index = Math.floor(Math.random() * pool.length);
        password += pool[index];
    }
    
    // 4. Show the password on screen
    document.getElementById("result").innerText = password;
    checkStrength(password);
    addToHistory(password);
}

// Function to copy text
function copyPass() {
    let text = document.getElementById("result").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

// Run once automatically when page opens
makePass();
function checkStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let bar = document.getElementById("strengthBar");
    let text = document.getElementById("strengthText");

    if (score <= 2) {
        bar.style.width = "30%";
        bar.style.background = "red";
        text.innerText = "Strength: Weak";
    }
    else if (score <= 4) {
        bar.style.width = "60%";
        bar.style.background = "orange";
        text.innerText = "Strength: Medium";
    }
    else {
        bar.style.width = "100%";
        bar.style.background = "green";
        text.innerText = "Strength: Strong";
    }
}
function addToHistory(pass) {
    history.unshift(pass);

    if (history.length > 5) {
        history.pop();
    }

    renderHistory();
}

function renderHistory() {
    let container = document.getElementById("history");
    container.innerHTML = "";

    history.forEach(p => {
        container.innerHTML += `
            <div style="
                display:flex;
                justify-content:space-between;
                background:#f5f5f5;
                padding:8px;
                margin:5px 0;
                border-radius:5px;
                font-family:monospace;
            ">
                <span>${p}</span>
                <button onclick="copyFromHistory('${p}')">Copy</button>
            </div>
        `;
    });
}

function copyFromHistory(pass) {
    navigator.clipboard.writeText(pass);
    alert("Copied!");
}