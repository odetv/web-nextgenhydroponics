import roboflow from "./roboflow.js";

roboflow
  .auth({
    publishable_key: "rf_pjEIPWjcsRNb3Z6ofslU2mPGV4r1",
  })
  .load({
    model: "deteksi-pakaian-baju-formal-dan-non-formal",
    version: 1, // <--- YOUR VERSION NUMBER
  })
  .then(function (model) {
    // model has loaded!
  });

async function getModel() {
  var model = await roboflow
    .auth({
      publishable_key: API_KEY,
    })
    .load({
      model: MODEL_NAME,
      version: MODEL_VERSION,
    });

  return model;
}

var initialized_model = getModel();

initialized_model.then(function (model) {
  /// use model.detect() to make a prediction (see "Getting Predictions" below)
});

model.detect(video).then(function (predictions) {
  console.log("Predictions:", predictions);
});
