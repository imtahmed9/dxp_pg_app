// Controller: Main.controller.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function (Controller, Filter, FilterOperator, MessageBox) {
    "use strict";

    return Controller.extend("com.evoedge.waxmachinefs.controller.Main", {

        onInit: function () {
            this.oModel = this.getView().getModel();
            this.oViewModel = new sap.ui.model.json.JSONModel({
                selectedMonth: "",
                machineId: "wm-1",
                selectedYear: null,
                date: null,
                startTime: null,
                endTime: null
            });
            this.getView().setModel(this.oViewModel, "viewModel");
            
        },

        onAfterRendering:async function () {
            // this._loadAllData();
            this.getView().setBusy(true);
            this._loadAllODataRecords("/WaxingMachineSet").then((aData) => {
                this._updateChartData(aData, {}); // Display full data chart initially
                this.getView().setBusy(false);
            });
        },

        // _loadAllData: async function () {
        //     const oModel = this.getView().getModel();
        //     const oFilterData = this.oViewModel.getData();
        //     const aFilters = this._buildFilters(oFilterData);
        //     const oBinding = oModel.bindList("/WaxingMachineSet", undefined, undefined, aFilters);

        //     const aAllContexts = [];
        //     let iSkip = 0;
        //     const iPageSize = 5000;
        //     let bMore = true;

        //     while (bMore) {
        //         const aContexts = await oBinding.requestContexts(iSkip, iPageSize);
        //         if (aContexts.length === 0) {
        //             bMore = false;
        //         } else {
        //             aAllContexts.push(...aContexts);
        //             iSkip += aContexts.length;
        //             if (aContexts.length < iPageSize) bMore = false;
        //         }
        //     }

        //     const aData = aAllContexts.map(ctx => ctx.getObject());
        //     this._updateChartData(aData, oFilterData);
        // },

        _loadAllODataRecords: async function (sPath, aFilters = []) {
            const oModel = this.getView().getModel();
            const aAllData = [];
            const iPageSize = 1000;
            let iStart = 0;
            let bHasMore = true;
        
            while (bHasMore) {
                const oBinding = oModel.bindList(sPath, undefined, undefined, aFilters); // no $top/skip
        
                try {
                    const aContexts = await oBinding.requestContexts(iStart, iPageSize);
                    const aBatchData = aContexts.map(ctx => ctx.getObject());
        
                    aAllData.push(...aBatchData);
                    if (aBatchData.length < iPageSize) {
                        bHasMore = false; // done
                    } else {
                        iStart += iPageSize;
                    }
                } catch (err) {
                    MessageBox.error("Failed to load data: " + err.message);
                    break;
                }
            }
        
            return aAllData;
        },
        
        
        _buildFilters: function (oData) {
            const aFilters = [];

            if (oData.machineId) {
                aFilters.push(new Filter("machine_id", FilterOperator.EQ, oData.machineId));
            }

            const sYear = oData.selectedYear ? new Date(oData.selectedYear).getFullYear() : null;
            const sMonth = oData.selectedMonth;
            const oDate = oData.date ? new Date(oData.date) : null;

            if (oDate) {
                const sDate = oDate.toISOString().split("T")[0];
                aFilters.push(new Filter("created_date", FilterOperator.EQ, sDate));
            } else if (sMonth && sYear) {
                const iMonth = new Date(Date.parse(sMonth + " 1, 2000")).getMonth();
                const dStart = new Date(sYear, iMonth, 1);
                const dEnd = new Date(sYear, iMonth + 1, 0);
                const sStart = dStart.toISOString().split("T")[0];
                const sEnd = dEnd.toISOString().split("T")[0];
                aFilters.push(new Filter("created_date", FilterOperator.BT, sStart, sEnd));
            } else if (sYear) {
                aFilters.push(new Filter("created_date", FilterOperator.BT, `${sYear}-01-01`, `${sYear}-12-31`));
            }

            if (oData.startTime && oData.endTime) {
                const formatTime = d => [d.getHours(), d.getMinutes(), d.getSeconds()].map(x => String(x).padStart(2, "0")).join(":");
                aFilters.push(new Filter({
                    filters: [
                        new Filter("created_time", FilterOperator.GE, formatTime(oData.startTime)),
                        new Filter("created_time", FilterOperator.LE, formatTime(oData.endTime))
                    ],
                    and: true
                }));
            }

            return aFilters;
        },

        onMonthOrYearChange: function () {
            const oModelData = this.getView().getModel("viewModel").getData();
            const sYearValue = oModelData?.selectedYear;
            const sMonth = oModelData?.selectedMonth;

            if (!sYearValue) return;

            const iYear = new Date(sYearValue).getFullYear();
            const today = new Date();
            today.setHours(23, 59, 59, 999);

            let oStartDate, oEndDate;

            if (sMonth) {
                const iMonthIndex = new Date(Date.parse(sMonth + " 1, 2000")).getMonth();
                oStartDate = new Date(iYear, iMonthIndex, 1);
                oEndDate = new Date(iYear, iMonthIndex + 1, 0);
                if (oEndDate > today) oEndDate = today;
            } else {
                oStartDate = new Date(iYear, 0, 1);
                oEndDate = new Date(iYear, 11, 31);
                if (oEndDate > today) oEndDate = today;
            }

            const oDatePicker = this.byId("idDatePicker");
            oDatePicker.setMinDate(oStartDate);
            oDatePicker.setMaxDate(oEndDate);
        },

        validateFilter: function (oFilterData) {
            if (!oFilterData.machineId) {
                MessageBox.error("Machine Id is mandatory");
                return false;
            }

            if (oFilterData.selectedMonth && !oFilterData.selectedYear) {
                MessageBox.error("Please select Year if Month is selected");
                return false;
            }

            return true;
        },

        _updateChartData: function (aData, oFilterData) {
            const sYear = oFilterData.selectedYear ? new Date(oFilterData.selectedYear).getFullYear() : null;
            const sMonth = oFilterData.selectedMonth;
            const oDate = oFilterData.date ? new Date(oFilterData.date) : null;
            const sStartTime = oFilterData.startTime;
            const sEndTime = oFilterData.endTime;

            const oGrouped = {};

            aData.forEach(entry => {
                const d = new Date(entry.created_date);
                let key;

                if (oDate && sStartTime && sEndTime) {
                    key = entry.created_time;
                } else if (oDate) {
                    key = entry.created_time.slice(0, 2);
                } else if (sMonth) {
                    key = d.toISOString().split("T")[0];
                } else if (sYear) {
                    key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                } else {
                    key = d.getFullYear().toString();
                }

                if (!oGrouped[key]) {
                    oGrouped[key] = { total: 0, count: 0 };
                }

                oGrouped[key].total += entry.pressure;
                oGrouped[key].count++;
            });

            // const aChartData = Object.keys(oGrouped).map(key => ({
            //     group: key,
            //     avg_value: (oGrouped[key].total / oGrouped[key].count).toFixed(2)
            // }));

            const aChartData = Object.keys(oGrouped)
            .sort((a, b) => {
                const parseTime = (val) => {
                    const parts = val.split(":").map(Number);
                    return parts[0] * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
                };
                return parseTime(a) - parseTime(b);
            })
            .map(key => ({
                group: (oDate && !sEndTime && !sStartTime)
                    ? key.padStart(2, "0") + ":00:00"
                    : key,
                avg_value: (oGrouped[key].total / oGrouped[key].count).toFixed(2)
            }));

            const oChartModel = new sap.ui.model.json.JSONModel({ results: aChartData });
            this.getView().setModel(oChartModel, "chartModel");

            const oChart = this.byId("idVizFrame");
            if (oChart) {
                oChart.setModel(oChartModel, "chartModel");
                oChart.getDataset().getBinding("data").refresh();
            }
        },

        onSearch: async function () {
            const oView = this.getView();
            const oViewModel = oView.getModel("viewModel");
            const oData = oViewModel.getData();
        
            const sYear = oData.selectedYear ? new Date(oData.selectedYear).getFullYear() : null;
            const sMonth = oData.selectedMonth;
            const oDate = oData.date ? new Date(oData.date) : null;
            const sStartTime = oData.startTime;
            const sEndTime = oData.endTime;
        
            if (!this.validateFilter(oData)) return;
        
            const aFilters = [];
        
            // Add filters
            if (oData.machineId) {
                aFilters.push(new sap.ui.model.Filter("machine_id", FilterOperator.EQ, oData.machineId));
            }
        
            if (oDate) {
                const sDate = oDate.toISOString().split("T")[0];
                aFilters.push(new Filter("created_date", FilterOperator.EQ, sDate));
            } else if (sMonth && sYear) {
                const iMonth = new Date(Date.parse(sMonth + " 1, 2000")).getMonth();
                const dStart = new Date(sYear, iMonth, 1);
                const dEnd = new Date(sYear, iMonth + 1, 0);
                const sStart = dStart.toLocaleDateString('en-CA');  // gives YYYY-MM-DD
                const sEnd = dEnd.toLocaleDateString('en-CA');      // gives YYYY-MM-DD
                aFilters.push(new Filter("created_date", FilterOperator.BT, sStart, sEnd));
            } else if (sYear) {
                aFilters.push(new Filter("created_date", FilterOperator.BT, `${sYear}-01-01`, `${sYear}-12-31`));
            }
        
            if (sStartTime && sEndTime) {
                function formatTimeOnly(oDate) {
                    return [
                        String(oDate.getHours()).padStart(2, "0"),
                        String(oDate.getMinutes()).padStart(2, "0"),
                        String(oDate.getSeconds()).padStart(2, "0")
                    ].join(":");
                }
        
                aFilters.push(new Filter({
                    filters: [
                        new Filter("created_time", FilterOperator.GE, formatTimeOnly(sStartTime)),
                        new Filter("created_time", FilterOperator.LE, formatTimeOnly(sEndTime))
                    ],
                    and: true
                }));
            }
        
            // Apply filters to table
            const oTable = this.byId("idProductsTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        
            // Fetch full data for chart via manual paging
            const aFullData = await this._loadAllODataRecords("/WaxingMachineSet", aFilters);
            this._updateChartData(aFullData, oData);
        }
        
    });
});
