function buscarCep() {
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('resultadoNome').textContent = data.logradouro;
                document.getElementById('resultadoBairro').textContent = data.bairro;
                document.getElementById('resultadoUf').textContent = data.localidade + '/' + data.uf;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.');
        });
}

function buscarTemperatura(latitude, longitude) {
    // Captured values from the form
    const latitudeValue = document.getElementById("latitude").value;
    const longitudeValue = document.getElementById("longitude").value;

    const urlTemperatura = `https://api.open-meteo.com/v1/forecast?latitude=${latitudeValue}&longitude=${longitudeValue}&hourly=temperature_2m`;

    fetch(urlTemperatura)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar previsão do tempo: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const temperatura = data.hourly.temperature_2m[0];
            const temperaturaElement = document.getElementById('resultadoTemperatura');
            temperaturaElement.textContent = `${temperatura} °C`;
        })
        .catch(error => {
            console.error('Erro ao buscar previsão do tempo:', error);
            alert('Ocorreu um erro ao buscar a previsão do tempo. Tente novamente mais tarde.');
        });
}

function executarBuscas() {
    buscarCep();
    buscarTemperatura();
}