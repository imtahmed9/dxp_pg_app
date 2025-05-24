sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sap/machinedata/machinedata/test/integration/FirstJourney',
		'com/sap/machinedata/machinedata/test/integration/pages/MachineDataSetList',
		'com/sap/machinedata/machinedata/test/integration/pages/MachineDataSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, MachineDataSetList, MachineDataSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/sap/machinedata/machinedata') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMachineDataSetList: MachineDataSetList,
					onTheMachineDataSetObjectPage: MachineDataSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);