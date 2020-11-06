sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "prominion/controller/App.controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/base/ManagedObject",
  "sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
  ], function(Controller, AppController, JSONModel, ManagedObject, sinon, sinonQunit) {
    "use strict";

    function jsonOk (body) {
      var mockResponse = new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {
          'Content-type': 'application/json'
        }
      });
      return Promise.resolve(mockResponse);
    }
    
    const MOCK_JSON = [];

    QUnit.module("App controller", {
      beforeEach: function() {
        let fetchStub = sinon.stub(window, "fetch");
        fetchStub.onCall(0).returns(jsonOk(MOCK_JSON));
      },
      afterEach: function() {
        window.fetch.restore();
      }
    });

    QUnit.test("loadCallbacks", function(assert) {
      let fnDone = assert.async();
      //Arrange
      let oController = new AppController();
      let oViewStub = new ManagedObject({});
      let oGetViewStub = sinon.stub(Controller.prototype, "getView").returns(oViewStub);

      //Act & Assert
      oController.loadCallbacks()
      .then((res) => assert.ok(oViewStub.getModel("callbacks"), "Callbacks are fetched and JSON model is set to view"))
      .then(oGetViewStub.restore)
      .then(fnDone)
      .catch((err) => {
        assert.ok(false, "Error: " + err);
        oGetViewStub.restore();
        fnDone();
      });
    });

    QUnit.test("onInit", function(assert) {
      assert.expect(1);
      let oController = new AppController();

      oController.loadCallbacks = function() {
        assert.step("loadCallbacks called once");
      }
      oController.onInit();
    });

    QUnit.test("deleteCallbacks", function(assert) {
      let fnDone = assert.async();
      assert.expect(1);
      let oController = new AppController();
      let oEvent = new ManagedObject({});
      oEvent.getSource = function() {return {
        oParent: {
          getCells: function() {
            return [{
              mProperties: {
                text: ""
              }
            }]
          }
        }
      }};

      oController.loadCallbacks = function() {
        assert.step("Request is sent and loadCallbacks called once");
      }

      oController.deleteCallback(oEvent)
      .then(fnDone)
      .catch(err => {
        assert.ok(false, "Error: " + err);
        fnDone();
      })
    });
});