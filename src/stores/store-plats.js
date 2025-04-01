import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlatsStore = defineStore('plats', () => {
  const plats = ref([
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      nom: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      nom: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      nom: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      nom: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ])

  const modifierPlat = (id, payload) => {
    const index = plats.value.findIndex((plat) => plat.id === id)
    for (const key in payload) {
      plats.value[index][key] = payload[key]
    }
  }

  const supprimerPlat = (id) => {
    const index = plats.value.findIndex((plat) => plat.id === id)
    plats.value.splice(index, 1)
  }

  const ajouterPlat = (plat) => {
    let uId = 1

    if (plats.value.length > 0) {
      uId = Math.max(...plats.value.map(v => v.id)) + 1
    }

    plats.value.push({
      ...plat,
      id: uId
    })
  }

  return {
    plats,
    modifierPlat,
    supprimerPlat,
    ajouterPlat
  }
})
