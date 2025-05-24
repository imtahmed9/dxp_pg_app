sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/evoedge/waxmachine/waxmachine/test/integration/FirstJourney',
		'com/evoedge/waxmachine/waxmachine/test/integration/pages/WaxingMachineSetList',
		'com/evoedge/waxmachine/waxmachine/test/integration/pages/WaxingMachineSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, WaxingMachineSetList, WaxingMachineSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/evoedge/waxmachine/waxmachine') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheWaxingMachineSetList: WaxingMachineSetList,
					onTheWaxingMachineSetObjectPage: WaxingMachineSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);