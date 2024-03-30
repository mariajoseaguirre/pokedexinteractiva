// https://pokeapi.co/

const BASE_API = 'https://pokeapi.co/api/v2/'

export async function getPokemon(id) {
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
        // debugger
    if (response.status === 404) {
        console.warn('Error de Conexion 404')
        return {
            data: null,
            isError: true
        }
    }
    const data = await response.json()
        // Validar errores
    return {
        data,
        isError: false
    }
}

export async function getSpecies(id) {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    const data = await response.json()
        // Validar errores
    return data
}