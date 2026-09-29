// Preserve existing documents when a seed script is run again.
module.exports = async function insertMissing(Model, rows, keys) {
    const documents = rows.map(row => new Model(row));
    await Promise.all(documents.map(document => document.validate()));
    for (const document of documents) {
        const row = document.toObject();
        const filter = Object.fromEntries(keys.map(key => [key, row[key]]));
        await Model.updateOne(filter, { $setOnInsert: row }, { upsert: true });
    }
    console.log(`${Model.modelName}: processed ${rows.length} seed entries (existing documents preserved)`);
};
