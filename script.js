let customers = [];
let quantumTime = 0;

function addCustomer() {
    const name = document.getElementById('customerName').value;
    const service = parseInt(document.getElementById('serviceTime').value);
    quantumTime = parseInt(document.getElementById('quantumTime').value);

    if (name && !isNaN(service) && !isNaN(quantumTime)) {
        customers.push({ name, service });
        updateTable();
        document.getElementById('customerName').value = '';
        document.getElementById('serviceTime').value = '';
    } else {
        alert("Silakan masukkan semua data dengan benar.");
    }
}

function updateTable() {
    const table = document.getElementById('customerTable');
    table.innerHTML = `
        <tr>
            <th>Nama Pelanggan</th>
            <th>Waktu Layanan</th>
        </tr>
    `;
    customers.forEach(customer => {
        const row = table.insertRow();
        row.insertCell(0).innerText = customer.name;
        row.insertCell(1).innerText = customer.service;
    });
}

function runSimulation() {
    if (customers.length === 0) {
        alert("Tidak ada pelanggan untuk dilayani.");
        return;
    }

    let output = "<h3>Hasil Simulasi:</h3>";
    output += "<table><tr><th>Nama Pelanggan</th><th>Waktu Layanan</th><th>Waktu Tunggu</th><th>Waktu Penyelesaian</th></tr>";

    let queue = [...customers];
    let time = 0;
    let waitTimes = Array(queue.length).fill(0);
    let completionTimes = Array(queue.length).fill(0);

    while (queue.length > 0) {
        const currentCustomer = queue.shift();
        const serviceTime = Math.min(currentCustomer.service, quantumTime);
        time += serviceTime;
        currentCustomer.service -= serviceTime;

        // Hitung waktu tunggu dan waktu penyelesaian
        const index = customers.findIndex(c => c.name === currentCustomer.name);
        waitTimes[index] += time - (currentCustomer.service > 0 ? time - serviceTime : time);
        completionTimes[index] = time;

        if (currentCustomer.service > 0) {
            queue.push(currentCustomer); // Kembali ke antrian jika belum selesai
        }
    }

    customers.forEach((customer, index) => {
        output += `<tr>
            <td>${customer.name}</td>
            <td>${customer.service + waitTimes[index]}</td>
            <td>${waitTimes[index]}</td>
            <td>${completionTimes[index]}</td>
        </tr>`;
    });

    output += "</table>";
    document.getElementById('output').innerHTML = output;
}