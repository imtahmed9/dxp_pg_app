using btp as service from '../../srv/myService';


// annotate service.WaxingMachineSet with @(
//     UI.LineItem : [
//         {
//             $Type : 'UI.DataField',
//             Label : 'ID',
//             Value : machine_id,
//         },{
//             $Type : 'UI.DataField',
//             Label : 'Name',
//             Value : machine_name,
//         },{
//             $Type : 'UI.DataField',
//             Label : 'Location',
//             Value : Location,
//         },{
//             $Type : 'UI.DataField',
//             Label : 'Pressure',
//             Value : pressure,
//         }]
// );

// annotate service.WaxingMachineSet with @(
//     UI.FieldGroup #GeneratedGroup1 : {
//         $Type : 'UI.FieldGroupType',
//         Data : [
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'ID',
//                 Value : machine_id,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'Name',
//                 Value : machine_name,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'Location',
//                 Value : Location,
//             },
//             {
//                 $Type : 'UI.DataField',
//                 Label : 'Pressure',
//                 Value : pressure,
//             }
//         ],
//     },
//     UI.Facets : [
//         {
//             $Type : 'UI.ReferenceFacet',
//             ID : 'GeneratedFacet1',
//             Label : 'General Information',
//             Target : '@UI.FieldGroup#GeneratedGroup1',
//         },
//     ]
// );
// annotate service.WaxingMachineSet with @(
//     UI.SelectionFields : [
//         machine_id,
//         machine_name,
//         Location,
//         pressure
//     ]
// );


// annotate service.WaxingMachineSet with @(
//     UI.HeaderInfo : {
//         TypeName : 'Waxing Machine',
//         TypeNamePlural : 'Waxing Machine',
//         Title : {
//             $Type : 'UI.DataField',
//             Label : 'Name',
//             Value : machine_name,
//         },
//     }
// );