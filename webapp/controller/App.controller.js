sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict"
  return Controller.extend("prominion.App", {
    onInit: function () {
        this.loadCallbacks();
    },

    loadCallbacks: function() {
      return fetch("http://localhost:3000/callbacks")
      .then(response => response.json())
      .then(data => {
        let oCallbacks = new JSONModel();
        oCallbacks.setData(data);
        this.getView().setModel(oCallbacks, "callbacks");
      })
      .catch(err => console.log("Error: " + err));
    },

    deleteCallback: function(oEvent) {
      let GUID = oEvent.getSource().oParent.getCells()[0].mProperties.text;
      return fetch("http://localhost:3000/callbacks/" + GUID, {
        method: "DELETE"
      })
      .then(response => {
        this.loadCallbacks();
      })
      .catch(err => console.log("Error: " + err));
    }
  });
});