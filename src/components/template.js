const getTemplate = (items, deliveryDate, deliveryPrice) => (
  `
export const ogItems = [
    ${items.map(item => `{quantity: ${item.quantity}, name: "${item.name}", price: ${item.price}},`).join('\n    ')}
];

export const ogDelivery = {
    price: ${deliveryPrice},
    date: "${deliveryDate}"
};

export const ogPayers = [
    {id: 1, name: "Kriszcson"},
    {id: 2, name: "Snajder"},
    {id: 3, name: "Szabo"},
];

export const testData = {
    delivery: ogDelivery,
    items: ogItems,
    payers: ogPayers,
};
  `
)

export default getTemplate
