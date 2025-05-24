sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/HTML"
], function (Controller, Filter, FilterOperator, MessageBox, MessageToast, HTML) {
    "use strict";

    return Controller.extend("com.evoedge.machinetyperealtypemonitoring.controller.Main", {
        onInit() {
            const oChartModel = new sap.ui.model.json.JSONModel({ results: [] });
            this.getView().setModel(oChartModel, "chartModel");

            const oViewModel = new sap.ui.model.json.JSONModel({
                selectedMachineType: ""
            });
            this.getView().setModel(oViewModel, "viewModel");

            this.oChartReady = typeof Chart !== "undefined";
        },

        
        // onSearch: async function () {
        //     const oView = this.getView();
        //     const oModel = oView.getModel(); // OData V4 model
        //     const oViewModel = oView.getModel("viewModel");
        //     const sSelectedMachineType = oViewModel.getProperty("/selectedMachineType");

        //     if (!sSelectedMachineType) {
        //         sap.m.MessageToast.show("Please select a machine type.");
        //         return;
        //     }

        //     oView.setBusy(true);

        //     try {
        //         const aFilters = [
        //             new Filter("Machine_Type", FilterOperator.EQ, sSelectedMachineType)
        //         ];

        //         const oBinding = oModel.bindList("/MachineType", undefined, undefined, aFilters);
        //         const aContexts = await oBinding.requestContexts(0, 100);
        //         const aRawData = aContexts.map(ctx => ctx.getObject());

        //         const oHBox = this.byId("gaugeChartContainer");
        //         oHBox.destroyItems(); // Clear old charts

        //         aRawData.forEach((machine, index) => {
        //             const canvasId = `gaugeCanvas_${index}`;

        //             const oChartBox = new sap.m.VBox({
        //                 width: "150px",
        //                 alignItems: "Center",
        //                 justifyContent: "Center",
        //                 class: "sapUiSmallMargin",
        //                 items: [
        //                     new sap.ui.core.HTML({
        //                         content: `<canvas id="${canvasId}" width="120" height="90"></canvas>`
        //                     }),
        //                     new sap.m.Text({
        //                         text: machine.Machine_Id,
        //                         textAlign: "Center"
        //                     })
        //                 ]
        //             });

        //             oHBox.addItem(oChartBox);

        //             setTimeout(() => {
        //                 const percent = Math.floor(Math.random() * 30 + 60); // or machine.OEE if available
        //                 const ctx = document.getElementById(canvasId)?.getContext("2d");
        //                 if (!ctx) return;

        //                 new Chart(ctx, {
        //                     type: 'doughnut',
        //                     data: {
        //                         datasets: [{
        //                             data: [percent, 100 - percent],
        //                             backgroundColor: ['#4caf50', '#e0e0e0'],
        //                             borderWidth: 0
        //                         }]
        //                     },
        //                     options: {
        //                         rotation: -90,
        //                         circumference: 270,
        //                         cutout: '70%',
        //                         plugins: {
        //                             legend: { display: false },
        //                             tooltip: { enabled: false }
        //                         }
        //                     }
        //                 });
        //             }, 0);
        //         });

        //     } catch (err) {
        //         MessageBox.error("Error loading data: " + err.message);
        //     } finally {
        //         oView.setBusy(false);
        //     }
        // }

        // onSearch: async function () {
        //     const oView = this.getView();
        //     const oModel = oView.getModel();
        //     const oViewModel = oView.getModel("viewModel");
        //     const sSelectedMachineType = oViewModel.getProperty("/selectedMachineType");

        //     if (!sSelectedMachineType) {
        //         sap.m.MessageToast.show("Please select a machine type.");
        //         return;
        //     }

        //     oView.setBusy(true);

        //     try {
        //         const aFilters = [
        //             new Filter("Machine_Type", FilterOperator.EQ, sSelectedMachineType)
        //         ];

        //         const oBinding = oModel.bindList("/MachineType", undefined, undefined, aFilters);
        //         const aContexts = await oBinding.requestContexts(0, 100);
        //         const aRawData = aContexts.map(ctx => ctx.getObject());

        //         const oHBox = this.byId("gaugeChartContainer");
        //         oHBox.destroyItems();

        //         aRawData.forEach((machine, index) => {
        //             const canvasId = `gaugeCanvas_${index}`;
        //             const fakeOEE = Math.floor(Math.random() * 30 + 60); // Replace with machine.OEE if available

        //             const oGaugeBox = new sap.m.VBox({
        //                 width: "180px",
        //                 alignItems: "Center",
        //                 class: "sapUiSmallMargin",
        //                 items: [
        //                     new sap.ui.core.HTML({
        //                         content: `<canvas id="${canvasId}" width="120" height="90"></canvas>`
        //                     }),
        //                     new sap.m.HBox({
        //                         alignItems: "Center",
        //                         justifyContent: "SpaceBetween",
        //                         width: "100%",
        //                         items: [
        //                             new sap.m.Text({
        //                                 text: machine.Machine_Id,
        //                                 wrapping: false
        //                             }),
        //                             new sap.m.ProgressIndicator({
        //                                 percentValue: fakeOEE,
        //                                 displayValue: `${fakeOEE}%`,
        //                                 state: "Success",
        //                                 width: "70%"
        //                             })
        //                         ]
        //                     })
        //                 ]
        //             });

        //             oHBox.addItem(oGaugeBox);

        //             setTimeout(() => {
        //                 const ctx = document.getElementById(canvasId)?.getContext("2d");
        //                 if (!ctx) return;

        //                 new Chart(ctx, {
        //                     type: 'doughnut',
        //                     data: {
        //                         datasets: [{
        //                             data: [fakeOEE, 100 - fakeOEE],
        //                             backgroundColor: ['#f5b400', '#e0e0e0'], // Yellow-ish gauge
        //                             borderWidth: 0
        //                         }]
        //                     },
        //                     options: {
        //                         rotation: -90,
        //                         circumference: 180,
        //                         cutout: '70%',
        //                         plugins: {
        //                             legend: { display: false },
        //                             tooltip: { enabled: false }
        //                         }
        //                     }
        //                 });
        //             }, 0);
        //         });

        //     } catch (err) {
        //         MessageBox.error("Error loading data: " + err.message);
        //     } finally {
        //         oView.setBusy(false);
        //     }
        // }

        onSearch: async function () {
            const oView = this.getView();
            const oModel = oView.getModel();
            const oViewModel = oView.getModel("viewModel");
            const sSelectedMachineType = oViewModel.getProperty("/selectedMachineType");

            if (!sSelectedMachineType) {
                sap.m.MessageToast.show("Please select a machine type.");
                return;
            }

            oView.setBusy(true);

            try {
                const aFilters = [
                    new Filter("Machine_Type", FilterOperator.EQ, sSelectedMachineType)
                ];

                const oBinding = oModel.bindList("/MachineType", undefined, undefined, aFilters);
                const aContexts = await oBinding.requestContexts(0, 100);
                const aRawData = aContexts.map(ctx => ctx.getObject());

                // Simulate overall OEE as average
                const total = aRawData.length;
                const avg = total ? Math.round(aRawData.reduce((sum) => sum + (Math.random() * 30 + 60), 0) / total) : 0;

                // Draw single overall gauge
                const ctx = document.getElementById("overallGauge")?.getContext("2d");
                if (ctx) {
                    if (this.oGaugeChart) this.oGaugeChart.destroy();

                    this.oGaugeChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            datasets: [{
                                data: [avg, 100 - avg],
                                backgroundColor: ['#4caf50', '#e0e0e0'],
                                borderWidth: 0
                            }]
                        },
                        options: {
                            rotation: -90,
                            circumference: 180,
                            cutout: '70%',
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false }
                            }
                        }
                    });
                }

                // Clear previous cards
                const oCardContainer = this.byId("progressListContainer");
                oCardContainer.destroyItems();

                // aRawData.forEach((machine, i) => {
                //     const percent = Math.floor(Math.random() * 30 + 60); // Replace with machine.OEE if available

                //     const oCard = new sap.m.VBox({
                //         width: "180px",
                //         class: "sapUiSmallMargin sapUiContentPadding",
                //         styleClass: "machineCard",
                //         items: [
                //             new sap.m.Text({
                //                 text: machine.Machine_Id,
                //                 textAlign: "Center",
                //                 class: "sapUiTinyMarginBottom"
                //             }),
                //             new sap.m.ProgressIndicator({
                //                 percentValue: percent,
                //                 displayValue: `${percent}%`,
                //                 state: percent >= 85 ? "Success" : percent >= 70 ? "Warning" : "Error",
                //                 width: "100%"
                //             })
                //         ]
                //     });

                //     oCardContainer.addItem(oCard);
                // });

                aRawData.forEach((machine, i) => {
                    const percent = Math.floor(Math.random() * 30 + 60); // Or machine.OEE

                    let state = "Error", icon = "error";

                    if (percent >= 85) {
                        state = "Success";
                        icon = "sys-enter-2";
                    } else if (percent >= 70) {
                        state = "Warning";
                        icon = "alert";
                    }

                    const oLine = new sap.m.HBox({
                        width: "100%",
                        alignItems: "Center",
                        justifyContent: "SpaceBetween",
                        class: "sapUiTinyMarginBottom",
                        items: [
                            new sap.m.VBox({
                                width: "20%",
                                items: [
                                    new sap.m.Text({ text: machine.Machine_Id }),
                                ]
                            }),
                            new sap.m.ProgressIndicator({
                                percentValue: percent,
                                displayValue: "",
                                state: state,
                                width: "80%"
                            })
                            // ,
                            // new sap.ui.core.Icon({
                            //     src: `sap-icon://${icon}`,
                            //     size: "1rem",
                            //     color: state === "Success" ? "#2b7d2b" : state === "Warning" ? "#e9730c" : "#bb0000"
                            // })
                        ]
                    });

                    oCardContainer.addItem(oLine);
                });



            } catch (err) {
                MessageBox.error("Error loading data: " + err.message);
            } finally {
                oView.setBusy(false);
            }
        }



    });
});
