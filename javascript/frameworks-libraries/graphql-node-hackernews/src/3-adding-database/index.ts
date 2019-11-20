import { prisma } from "./generated/prisma-client";

// 3. [Adding a Database](https://www.howtographql.com/graphql-js/4-adding-a-database/)
// http://localhost:4466/_admin
// http://localhost:4466/

async function main() {
  const newPlayer = await prisma.createPlayer({ btag: 'test#123', serverType: 'PVP' });
  console.log(`Created new user, id: ${newPlayer.btag} serverType: ${newPlayer.serverType})`);

  const allPlayers = await prisma.players();
  console.log(allPlayers);
}

main().catch(e => console.error(e));
