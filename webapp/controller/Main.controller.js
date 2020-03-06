sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Fragment, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.appmyapp.controller.Main", {

		oContextMenu: null,

		onInit: function() {

			this._setupViewModel();

			// var mainModel = new JSONModel();

			// mainModel.loadData("model/users.json");
			// this.getView().setModel(mainModel);
		},

		openCandidateMenu: function(oEvent) {
			var oButton = oEvent.getSource();

			if (!this.oContextMenu) {
				Fragment.load({
					name: "com.appmyapp.fragment.CandidateMenu",
					controller: this
				}).then(function(oFragment) {
					this.oContextMenu = oFragment;
					this.getView().addDependent(this.oContextMenu);
					this.sAnchorId = oButton.getId();
					this.oContextMenu.open(false, oButton, "begin top", "begin bottom", oButton);
				}.bind(this));
			} else {
				if (this.sAnchorId === oButton.getId()) {
					this.oContextMenu.close();
					this.sAnchorId = undefined;
					return;
				}
				this.sAnchorId = oButton.getId();
				this.oContextMenu.open(false, oButton, "begin top", "begin bottom", oButton);
			}

		},

		tableUpdateStarted: function(oEvent) {},

		searchCandidates: function(oEvent) {
			var sSearchText = this.getView().getModel("mainView").getProperty("/searchText");
			this._serachCandidatesByText(sSearchText);
		},

		_serachCandidatesByText: function(sText) {
			var oTable = this._getCandidatesTable();

			var oItemsBindingInfo = oTable.getBinding("items");

			var oNameFilter = new Filter({
				path: "name",
				operator: FilterOperator.Contains,
				value1: sText
			});
			
			var oEmailFilter = new Filter({
				path: "email",
				operator: FilterOperator.Contains,
				value1: sText
			});
			
			var oFilter = new Filter({
				filters: [oNameFilter, oEmailFilter],
				and: false
			});

			oItemsBindingInfo.filter([oFilter], "Application");
		},

		onSearch: function(oEvent) {
			var sSearchText = this.getView().getModel("mainView").getProperty("/searchText");
			this._serachCandidatesByText(sSearchText);
		},

		_getCandidatesTable: function() {
			return this.getView().byId("employeesTable");
		},

		_setupViewModel: function() {
			var oViewModel = new JSONModel({
				paging: {
					enabled: true,
					itemsPerPage: 20,
					scrollToLoad: true
				},
				searchText: ""
			});

			this.getView().setModel(oViewModel, "mainView");
		}

	});
});