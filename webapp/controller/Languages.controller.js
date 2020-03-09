sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.appmyapp.controller.Languages", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.appmyapp.view.Languages
		 */
		onInit: function() {
			this._setupUserLanguagesModel();
			this._setupSupportedLanguagesModel();
		},

		_setupUserLanguagesModel: function() {
			var oModel = new JSONModel({
				userLanguages: [{
					id: 1,
					language: "עברית",
					write: "שפת אם",
					read: "שליטה חלקית",
					verbal: "לא יודע/ת"
				}, {
					id: 2,
					language: "אנגלית",
					write: "שליטה חלקית",
					read: "שליטה חלקית",
					verbal: "שליטה מלאה"
				}]
			});

			this.getView().setModel(oModel, "userLanguages");
		},

		deleteLanguage: function(oEvent) {
		
			
			var oItemBindingPath = oEvent.getSource().getParent().getBindingContextPath();
			var oUserLanguagesModel = this.getView().getModel("userLanguages");

			var oItemToDelete = oUserLanguagesModel.getProperty(oItemBindingPath);
			
			var aLanguages = oUserLanguagesModel.getData().userLanguages;

			var itemToDeleteIndex = aLanguages.indexOf(oItemToDelete);

			aLanguages.splice(itemToDeleteIndex, 1);

			oUserLanguagesModel.refresh();
		},

		_setupSupportedLanguagesModel: function() {
			var oLangModel = new JSONModel({
				options: [{
					language: "עברית"
				}, {
					language: "רוסית"
				}, {
					language: "אנגלית"
				}, {
					language: "ערבית"
				}],
				levels: [{
					level: "שפת אם"
				}, {
					level: "שליטה מלאה"
				}, {
					level: "שליטה חלקית"
				}, {
					level: "לא יודע/ת"
				}]
			});

			this.getView().setModel(oLangModel, "languages");
		},

		addLanguage: function(oEvent) {
			var oLanguagesModel = this.getView().getModel("userLanguages");
			var aLanguages = oLanguagesModel.getData().userLanguages;

			aLanguages.push({
				id: -1,
				language: "",
				write: "",
				read: "",
				verbal: ""
			});
			
			oLanguagesModel.refresh();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.appmyapp.view.Languages
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.appmyapp.view.Languages
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.appmyapp.view.Languages
		 */
		//	onExit: function() {
		//
		//	}

	});

});