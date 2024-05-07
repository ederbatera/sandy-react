# Atualiza o schema.prisma lendo o banco de dados.
npx prisma introspect

# Atualiza o banco de dados através do schema.prisma.
npx prisma db push
