// 从 CSV 文件加载数据并展示
async function fetchCSV() {
    try {
        // 1. 加载 CSV 文件
        const response = await fetch('assets/data.csv'); // 替换为 CSV 文件路径
        const csvText = await response.text(); // 获取文本内容

        // 2. 解析 CSV 数据
        const rows = csvText.split('\n').map(row => row.split(',')); // 按行和逗号分割
        console.log('Parsed Rows:', rows); // 打印解析后的数据

        // 3. 更新表格
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; // 清空旧数据
        rows.forEach((row, index) => {
            if (index === 0) return; // 跳过表头
            const tr = document.createElement('tr');
            row.forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}

// 从后端 API 加载数据并展示
async function fetchAPI() {
    try {
        // 1. 加载 API 数据
        const response = await fetch('http://127.0.0.1:5000/get-updates'); // 替换为你的 API 地址
        const data = await response.json(); // 获取 JSON 数据

        // 2. 更新表格
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; // 清空旧数据
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
        console.error('Error fetching API data:', error);
    }
}

// 切换加载方式：CSV 或 API
function switchDataSource(source) {
    if (source === 'csv') {
        fetchCSV(); // 加载 CSV 数据
    } else if (source === 'api') {
        fetchAPI(); // 加载 API 数据
    }
}

// 默认加载 CSV 数据
switchDataSource('csv');

// 如果需要定时更新，可以解开注释以下代码：
// setInterval(() => switchDataSource('csv'), 5000); // 每 5 秒刷新一次 CSV 数据
// setInterval(() => switchDataSource('api'), 5000); // 每 5 秒刷新一次 API 数据
