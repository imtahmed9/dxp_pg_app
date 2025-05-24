const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { MachineType } = this.entities;

  this.on('READ', 'UniqueMachineTypes', async (req) => {
    const db = await cds.connect.to('db');
    const result = await db.run(
      SELECT.distinct.from(MachineType, (m) => m.Machine_Type)
    );
    return result;
  });
});