import { outputTeamStats } from './outputTeamStats.js';





await test('Test one team information API pull', async () => {
  expect(await outputTeamStats("5", "20152016")).toBe("File Created in local directory");
});

await test('Test multiple teams passed through from API Pull', async () => {
  expect(await outputTeamStats("5,10", "20152016")).toBe("File Created in local directory");
});

await test('Test invalid Team ID', async () => {
  expect(await outputTeamStats("162", "20152016")).toBe("Team Info API Call Error: Error: Not Found");
});

await test('Test invalid season too many characters', async () => {
  expect(await outputTeamStats("5", "2015345201")).toBe("Season format needs to be two consecutive years in ascending order. Ex 20152016");
});

await test('Test invalid season non ascending order', async () => {
  expect(await outputTeamStats("5", "20182017")).toBe("Seasons are not consecutive ascending order");
});

await test('Test invalid season non numeric character', async () => {
  expect(await outputTeamStats("5", "201720a8")).toBe("Season contains non-numeric characters");
});






