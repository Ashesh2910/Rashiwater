const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Rashi Waters API is running' });
});

// Products API
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                image
            }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Save Order API (Razorpay + WhatsApp Notification)
app.post('/api/save-order', async (req, res) => {
    try {
        const order = req.body;
        console.log("Received new order:", order);

        // Save order to DB
        // Connect to a dummy/admin user for now or create a guest order mechanism
        // Prisma schema allows userId to be optional
        const savedOrder = await prisma.order.create({
            data: {
                paymentId: order.payment_id,
                totalAmount: order.price,
                status: "PAID",
                // Storing additional passed info (like product name) in shippingInfo for now
                shippingInfo: JSON.stringify({ product: order.product }) 
            }
        });

        // Fire WhatsApp Notification (Non-blocking)
        const phone = "919993174081"; // from prompt (formatting removed spaces/+)
        const text = `Hey Naman...New Order ${order.payment_id} for ${order.product}`;
        const apikey = process.env.CALLMEBOT_API_KEY || "XXXX"; // fallback from prompt
        
        const waUrl = `https://api.callmebot.com/whatsapp.php?phone=+${phone}&text=${encodeURIComponent(text)}&apikey=${apikey}`;
        
        // We do not await this heavily or fail the request if WA fails
        fetch(waUrl)
            .then(waRes => console.log('WhatsApp notification sent:', waRes.status))
            .catch(waErr => console.error('WhatsApp notification failed:', waErr.message));

        res.json({ success: true, orderId: savedOrder.id });

    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
