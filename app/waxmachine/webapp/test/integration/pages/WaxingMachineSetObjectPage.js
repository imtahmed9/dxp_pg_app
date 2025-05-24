sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.evoedge.waxmachine.waxmachine',
            componentId: 'WaxingMachineSetObjectPage',
            contextPath: '/WaxingMachineSet'
        },
        CustomPageDefinitions
    );
});