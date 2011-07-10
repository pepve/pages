function(cb, e, params) {
  var wiki = $(this), app = $$(wiki).app, docid = $$(wiki).docid;
  $.ajax({
    type: "GET", url: app.db.uri + $.couch.encodeDocId(docid) + "/rev-" + params.num,
    success: function(data, textStatus, jqXHR) {
      cb(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Could not open version: " + errorThrown);
    }
  });

};
