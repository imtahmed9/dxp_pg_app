using btp as service from '../../srv/myService';

annotate service.MachineDataSet with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : id,
        },{
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },{
            $Type : 'UI.DataField',
            Label : 'Numeric Id',
            Value : numericId,
        },{
            $Type : 'UI.DataField',
            Label : 'Value',
            Value : value,
        },{
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : quantity,
        },{
            $Type : 'UI.DataField',
            Label : 'Timestamp',
            Value : timestamp,
        },]
);
annotate service.MachineDataSet with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Numeric Id',
                Value : numericId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Quantity',
                Value : quantity,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Timestamp',
                Value : timestamp,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
annotate service.MachineDataSet with @(
    UI.SelectionFields : [
        name,
        numericId,
        value,
        quantity
    ]
);


annotate service.MachineDataSet with @(
    UI.HeaderInfo : {
        TypeName : 'Machine Data',
        TypeNamePlural : 'Machine Data',
        Title : {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
    }
);