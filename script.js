async function fetchUpdates() {
    try {
        const response = await fetch('http://192.168.43.58:5000/get-updates');
        const data = await response.json();

        // 清空旧表格
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        // 插入新数据
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
setInterval(fetchUpdates, 5000);
