function(doc, req) {
  var name, stub, ddoc = this,
    mustache = require("vendor/couchapp/lib/mustache"),
    wiki = require("lib/wiki"),
    data = {
      docid : JSON.stringify(req.id),
      id : req.id,
      path : "../page/"+req.id,
      site_title : this.couchapp.name
    };
  if (doc) {
    if (doc.markdown) {
      data.body = wiki.encode(doc.markdown);
    }
    data.title = doc.title;
    data.title_json = JSON.stringify(doc.title);
    data.begin = "";
    data.atts = [];
    if (doc._attachments) {
      for (name in doc._attachments) {
        if (name.indexOf("rev") != 0) {
          stub = doc._attachments[name];
          data.atts.push({
            name : name,
            uri : ["","pages", req.id, name].map(encodeURIComponent).join('/'),
            type : stub.content_type
          });
        }
      }
    }
    if (data.atts.length > 0) {
      data.has_atts = true;
    }
  } else {
    data.title = "Create page: "+req.id;
    data.title_json = JSON.stringify(data.title);
    data.begin = "/edit";
  }
  return mustache.to_html(ddoc.templates.page, data, ddoc.templates.partials);
}
