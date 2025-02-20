const divMusicas = document.getElementById('div-musicas')
const inputPesquisar = document.getElementById('input-pesquisar')
const buttonPesquisar = document.getElementById('button-pesquisar')


let artistas = null;

async function fetchAPI() {
    const url = "https://api.deezer.com/artist/66314222/top?limit=2";
    const url2 = "https://api.deezer.com/artist/7548856/top?limit=2"
    const url3 = "https://api.deezer.com/artist/102703622/top?limit=2"
    const url4 = "https://api.deezer.com/artist/59128112/top?limit=2"
    const url5 = "https://api.deezer.com/artist/1098118/top?limit=2"
    const url6 = "https://api.deezer.com/artist/84227392/top?limit=2"


    const req = await fetch(url)
    const req2 = await fetch(url2)
    const req3 = await fetch(url3)
    const req4 = await fetch(url4)
    const req5 = await fetch(url5)
    const req6 = await fetch(url6)

    const res = await req.json();
    const res2 = await req2.json();
    const res3 = await req3.json();
    const res4 = await req4.json();
    const res5 = await req5.json();
    const res6 = await req6.json();


    const resultado = [...res.data, ...res2.data, ...res3.data, ...res4.data, ...res5.data, ...res6.data]
    console.log(resultado)
    return resultado;
}

async function fetchApiPesquisar(valorDaBusca) {
    const url = `https://api.deezer.com/search?q=${valorDaBusca}`;

    const req = await fetch(url)

    const res = await req.json();
    console.log(res)
    return res;
}

window.addEventListener('DOMContentLoaded', async () => {
    artistas = await fetchAPI();

    artistas.map((element) => divMusicas.innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${element.contributors[0].picture}" >
            <div class="card-body">
                <h5>${element.title}</h5>
                <h7>${element.artist.name}</h7>
                <p>${element.duration / 60}</p>

                <audio controls>
                    <source src="${element.preview}" type="audio/mpeg">    
                </audio>
            </div>
        </div>
    </div>
        `)
})

buttonPesquisar.addEventListener('click', async () => {
    const valorDaBusca = inputPesquisar.value

    const resultado = await fetchApiPesquisar(valorDaBusca)
    console.log(resultado)
    divMusicas.innerHTML = ''

    resultado.data.map((element) => divMusicas.innerHTML += `
    <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${element.album.cover_medium}">
            <div class="card-body">
                <h5>${element.title}</h5>
                <h7></h7>
                <p>${element.duration / 60}</p>
                <audio controls>
                    <source src="${element.preview}" type="audio/mpeg">    
                </audio>
            </div>
        </div>
    </div>
        `)
})