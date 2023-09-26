import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
    const product1 = await prisma.product.create({
        data: {
            name: 'product 1',
            price: 100,
            description: 'description 1',
            category: 'category 1',
            image: 'image 1',
            stock: 10,
            status: 'Available'
        },
    });
    const product2 = await prisma.product.create({
        data: {
            name: 'product 2',
            price: 200,
            description: 'description 2',
            category: 'category 2',
            image: 'image 2',
            stock: 20,
            status: 'Available'
        },
    });
    console.log(product1);
    console.log(product2);
}
main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })