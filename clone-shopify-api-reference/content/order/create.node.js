// Session is built by the OAuth process

const order = new shopify.rest.Order({ session: session })
order.line_items = [
  {
    title: "Big Brown Bear Boots",
    price: 74.99,
    grams: "1300",
    quantity: 3,
    tax_lines: [
      {
        price: 13.5,
        rate: 0.06,
        title: "State tax",
      },
    ],
  },
]
order.transactions = [
  {
    kind: "sale",
    status: "success",
    amount: 238.47,
  },
]
order.total_tax = 13.5
order.currency = "EUR"
await order.save({
  update: true,
})
