using { btp as db } from '../db/data-model';

service btp {
  entity WaxingMachineSet as projection on db.WaxingMachine;

  entity WaxingMachineAnalytics as select from db.WaxingMachine {
    key id,
    machine_id,
    machine_name,
    created_date,
    created_time,
    @Aggregation.default: #SUM
    pressure
  };

  entity MachineTypeSet as projection on db.MachineType;
  
  // @readonly
  // entity UniqueMachineTypes as select from MachineTypeSet {
  //   key Machine_Type  // must be 'key' to be OData-valid
  // } group by Machine_Type;

  // function()
  // define only the shape of the result
  entity UniqueMachineTypes {
    key Machine_Type: String;
  }
}
