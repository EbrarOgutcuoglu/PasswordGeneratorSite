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
    
    // 3. Loop and pick random characters 
    for (let i = 0; i < len; i++) {
        let index = Math.floor(Math.random() * pool.length);
        password += pool[index];
    }
    
    // 4. Show the password on screen
    document.getElementById("result").innerText = password;
}

// Function to copy text
function copyPass() {
    let text = document.getElementById("result").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

// Run once automatically when page opens
makePass();