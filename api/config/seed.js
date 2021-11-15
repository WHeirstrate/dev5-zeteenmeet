/**
 * Seed the creates tables 'organisations' and 'users'.
 * 
 * The tables will not be created.
 * @param {*} pg - A postgres connection instance.
 */
async function seedDatabase(pg) {
  console.log('seeding started');
  try {
    await pg('users')
      .insert({
        name: 'Wouter',
        mail: 'wouter.heirstrate@student.ehb.be',
        password: 'HeirstrateWouter12'
      });
    console.log('User 1 created!');
    await pg('users')
      .insert({
        name: 'Kevin',
        mail: 'Kevin.linders@student.ehb.be',
        password: 'KevinSecret'
      });
    console.log('User 2 created!');
    await pg('users')
      .insert({
        name: 'Charel',
        mail: 'Chareltje007@student.ehb.be',
        password: 'Chareltje007'
      });
    console.log('User 3 created!');
    await pg('organisations')
      .insert({
        name: 'EHB'
      });
    console.log('Organisation 1 created!');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  seedDatabase
}