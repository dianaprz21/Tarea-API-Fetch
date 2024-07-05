const baseEndpoint = 'https://reqres.in/api/users?delay=3';
const tableSection = document.getElementById("arreglo-tabla");
const loader = document.getElementById("loader");
const tableHead = document.getElementById("table-head");

const convertirDatos = (data) => data.map(user => ({
    id: user.id, 
    firstName: user.first_name, 
    lastName: user.last_name,
    email: user.email,
    avatar: user.avatar
}));

const createTable = (users) => {
    const filas = users.map(user => `
        <tr>
            <th scope="row">${user.id}</th>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td><img src="${user.avatar}" alt="Avatar de ${user.firstName}" class="img-fluid rounded-circle" style="width: 50px; height: 50px;"></td>
        </tr>
    `);
    return filas.join("");
};

async function getDatos(url) {
    try {
        loader.style.display = 'block'; // Muestra el loader
        tableHead.classList.add('hidden'); // Oculta la primer fila de la tabla
        const response = await fetch(url);
        const data = await response.json();
        const datos = convertirDatos(data.data);
        tableSection.innerHTML = createTable(datos);
    } catch (err) {
        handleError(err);
    } finally {
        loader.style.display = 'none'; // Oculta el loader
        tableHead.classList.remove('hidden'); // Muestra la primer fila de la tabla
    }
}

function handleError(err) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger mt-4';
    errorMessage.textContent = `Algo salió mal: ${err}`;
    document.body.appendChild(errorMessage);
}

getDatos(baseEndpoint);
