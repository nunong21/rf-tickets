export const ProductList = [
  {
    id: 1,
    name: 'Sardinhas com broa',
    image: 'Cartaz_sardinhas.png',
    price: 10,
    buttonColor: null,
    buttonTextColor: null
  },
  {
    id: 2,
    name: 'Caldo verde',
    image: null,
    price: 20
  },

  {
    id: 3,
    name: 'Arroz doce',
    image: null,
    price: 30
  },

  {
    id: 4,
    name: 'Água 33cl',
    image: null,
    price: 40
  },
  {
    id: 5,
    name: 'Vinho',
    image: null,
    price: 50
  },
  {
    id: 6,
    name: 'Pack Espanhol',
    price: 5,
    image: null,
    bundle: [
      {
        name: 'Sardinhas com broa'
      },
      {
        name: 'Caldo verde'
      },

      {
        name: 'Arroz doce'
      },

      {
        name: 'Água 33cl'
      },
      {
        name: 'Vinho'
      }
    ]
  }
]
