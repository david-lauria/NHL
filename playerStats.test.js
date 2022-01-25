import { outputPlayerStats } from './source/outputPlayerStats.js';





await test('Test one player information API pull', async () => {
    expect(await outputPlayerStats("8476792", "20152016")).toBe("File Created in local directory");
});

await test('Test multiple players passed through from API Pull', async () => {
    expect(await outputPlayerStats("8476792,8476793", "20152016")).toBe("File Created in local directory");
});

await test('Test one player that has not played in NHL', async () => {
    expect(await outputPlayerStats("8476793", "20152016")).toBe("File Created in local directory");
});

await test('Test invalid Player ID', async () => {
    expect(await outputPlayerStats("1", "20152016")).toBe("Player Info API Call Error: Error: Not Found");
});


await test('Test invalid season too many characters', async () => {
    expect(await outputPlayerStats("8476792", "2015345201")).toBe("Season format needs to be two consecutive years in ascending order. Ex 20152016");
});

await test('Test invalid season non ascending order', async () => {
    expect(await outputPlayerStats("8476792", "20182017")).toBe("Seasons are not consecutive ascending order");
});

await test('Test invalid season non numeric character', async () => {
    expect(await outputPlayerStats("8476792", "201720a8")).toBe("Season contains non-numeric characters");
});







