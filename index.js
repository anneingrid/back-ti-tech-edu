const { PrismaClient } = require("@prisma/client")



app.get('/', () => {
    PrismaClient.apply.user()
})