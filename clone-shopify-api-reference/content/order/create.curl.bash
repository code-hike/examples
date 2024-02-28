curl -d '{"order":{"line_items":[{"title":"Big Brown Bear Boots","price":74.99,"grams":"1300","quantity":3,"tax_lines":[{"price":13.5,"rate":0.06,"title":"State tax"}]}],"transactions":[{"kind":"sale","status":"success","amount":238.47}],"total_tax":13.5,"currency":"EUR"}}' \
-X POST "https://your-development-store.myshopify.com/admin/api/2024-01/orders.json" \
-H "X-Shopify-Access-Token: {access_token}" \
-H "Content-Type: application/json"
