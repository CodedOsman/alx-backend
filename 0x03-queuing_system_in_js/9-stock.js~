#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

const listProducts = [
      {itialAvailableQuantity: @param {d}etrieves the reserved stock for a given item.
       er} itemId - The id of the item.
	* @returns {Promise<String>}
    */
    const getCurrentReservedStockById = async (itemId) => {
	return promisify(client.GET).bind(client)(`item.${itemId}`);
    };

    app.get('/list_products', (_, res) => {
	res.json(listProducts);
    });

    app.get('/list_products/:itemId(\\d+)', (req, res) => {
	const itemId = Number.parseInt(req.params.itemId);
	const productItem = getItemById(Number.parseInt(itemId));

	if (!productItem) {
	    res.json({ status: 'Product not found' });
	    return;
	}
	getCurrentReservedStockById(itemId)
	    .then((result) => Number.parseInt(result || 0))
	    .then((reservedStock) => {
		productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock;
		res.json(productItem);
	    });
    });

    app.get('/reserve_product/:itemId', (req, res) => {
	const itemId = Number.parseInt(req.params.itemId);
	const productItem = getItemById(Number.parseInt(itemId));

	if (!productItem) {
	    res.json({ status: 'Product not found' });
	    return;
	}
	getCurrentReservedStockById(itemId)
	    .then((result) => Number.parseInt(result || 0))
	    .then((reservedStock) => {
		if (reservedStock >= productItem.initialAvailableQuantity) {
		    res.json({ status: 'Not enough stock available', itemId });
		    return;
		}
		reserveStockById(itemId, reservedStock + 1)
		    .then(() => {
			res.json({ status: 'Reservation confirmed', itemId });
		    });
	    });
    });

    const resetProductsStock = () => {
	return Promise.all(
	    listProducts.map(
		item => promisify(client.SET).bind(client)(`item.${item.itemId}`, 0),
	    )
	);
    };

    app.listen(PORT, () => {
	resetProductsStock()
	    .then(() => {
		console.log(`API available on localhost port ${PORT}`);
	    });
    });

    export default app;
