import { getPokemon, getSpecies } from "./api.js"
import { createChart } from "./chart.js"
import { formatCharacteristic } from "./utils/format-data.js"

const $id = document.querySelector('#id')

function setId(id) {
    $id.value = id
}

const $image = document.querySelector('#image')

export function setImage(image) {
    // Seteamos la imagen, de la ruta del APi, donde esta la imagen, igual hacemos para la descripcion
    $image.src = image
}

const $description = document.querySelector('#description')

function setDescription(text) {
    $description.textContent = text
}

const $screen = document.querySelector('#screen')

function loader(isLoading = false) {
    const img = isLoading ? 'url(./images/loading.gif)' : ''
    $screen.style.backgroundImage = img
}

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
const $light = document.querySelector('#light')

function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es'
    speechSynthesis.speak(utterance)
    $light.classList.add('is-animated')

    // Para cuando termine de hablar, desactivemos la animacion
    utterance.addEventListener('end', () => {
        $light.classList.remove('is-animated')

    })
}

const $weight = document.querySelector('#weight')

function setWeight(weight) {
    $weight.textContent = `PESO: ${weight} Kg`
}

const $height = document.querySelector('#height')

function setHeight(height) {
    $height.textContent = `ALTURA: ${height} M`
}
export async function findPokemon(id) {

    const { data: pokemon, isError } = await getPokemon(id)

    if (!isError) {
        const species = await getSpecies(id)

        //Buscamos en la api  Species, la descripcion del pokemon a buscar,en esta parte es un array de Objetos donde estan separados por language, buscamos el que sea español "es"
        const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')

        // Colocamos el default, por defecto
        const sprites = [pokemon.sprites.front_default]

        const stats = pokemon.stats.map(item => item.base_stat)
            // Iteramos todos los nombre del objeto que se tiene en sprites
        for (const item in pokemon.sprites) {
            // console.log(item)
            if (item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]) {
                sprites.push(pokemon.sprites[item])
            }
        }
        const weight = formatCharacteristic(pokemon.weight)
        const height = formatCharacteristic(pokemon.height)
            // console.log(sprites)
        return {
            sprites,
            description: description.flavor_text,
            id: pokemon.id,
            name: pokemon.name,
            stats,
            weight,
            height
        }
    }
    return {
        sprites: './images/404.png',
        description: 'Pokémon no fue encontrado, por favor vuelve a intentar',
        id: ''
    }

}
let activeChart = null
export async function setPokemon(id) {
    // Prender loader
    loader(true)

    const pokemon = await findPokemon(id)
        // debugger
        // Apagar loader
    loader(false)
    setId(pokemon.id)
    setImage(pokemon.sprites[0])
    setDescription(pokemon.description)
    speech(`${pokemon.name}. ${pokemon.description}`)
    if (activeChart instanceof Chart) {
        activeChart.destroy()
    }
    activeChart = createChart(pokemon)
    setWeight(pokemon.weight)

    setHeight(pokemon.height)
    return pokemon
}