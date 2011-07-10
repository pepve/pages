function() {
  if(this.shown) {
    $('#help-container').hide();
    $(this).text('[show help]');
    this.shown = false;
  } else {
    $('#help-container').show();
    $(this).text('[hide help]');
    this.shown = true;
  }
  return false;
};
