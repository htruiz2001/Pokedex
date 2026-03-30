async function obtenerPokemon() {
    const loader = document.getElementById('pokeStyle');
    loader.innerHTML = "Cargando Pokemones..."

    try {
        const process = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
        const data = await process.json();

        loader.innerHTML = ''
        console.log(data.results)


        const promesas = data.results.map(poke => fetch(poke.url).then(r => r.json()));
        const pokemones = await Promise.all(promesas);

        pokemones.forEach(pokemon => {



            const card = document.createElement('div');
            card.classList.add('card');



            card.innerHTML = `
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="Pokemon">
                <a href="#">Leer mas</a>
            `
            loader.appendChild(card);
        });

    } catch (error) {
        loader.innerHTML = '<p>Error al cargar los datos</p>'
        console.log('Algo salio mal... ', error)

    }

}

obtenerPokemon()