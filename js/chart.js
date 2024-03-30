// https://www.chartjs.org/

const ctx = document.getElementById('stats').getContext('2d');

export function createChart(pokemon) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'HP',
                'Attack',
                'Defense',
                // Colocamos en objetos para que halla salto de linea
                ['Special', 'Attack'],
                ['Special', 'Defense'],
                'Speed',
            ],
            datasets: [{
                data: pokemon.stats,
                backgroundColor: 'white'
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: (pokemon.name).toUpperCase(),
                    color: 'white'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'white'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    angleLines: {
                        color: 'white'
                    }
                }
            }
        }
    });
}