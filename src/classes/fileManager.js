import fs from "fs";

class fileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.filePath);
            return JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async writeAll(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }
}

class ProductFileManager extends fileManager {
    async add(product) {
        try {
            const products = await this.getAll();

            product.id = product.lenght + 1;

            products.push(product)

            await this.writeAll(products);
        } catch (err) {
            throw err;
        }
    }

    async update(productId, updatedProduct) {
        try {
            const products = await this.getAll();

            const index = products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new Error("Producto no encontrado");
            }
            products[index] = { ...products[index], ...updatedProduct };

            await this.writeAll(products);
        } catch (err) {
            throw err;
        }
    }

    async delete(productId) {
        try {
            const products = await this.getAll();

            const index = products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new Error("Producto no encontrado");
            }

            products.splice(index, 1);

            await this.writeAll(products);
        } catch (err) {
            throw err;
        }
    }
}

class CartFileManager extends fileManager {
    async addProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = carts.find((cart) => cart.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            cart.products.push(productId);

            await this.writeAll(carts);
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = carts.find((cart) => cart.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            cart.products.splice(index,1);
            await this.writeAll(carts);
        }catch (err){
            throw err;
        }
    }
}

export {ProductFileManager,CartFileManager,fileManager};


