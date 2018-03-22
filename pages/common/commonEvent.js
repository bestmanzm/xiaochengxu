function CommonEvent(){
  this.closeTop = function(event) {
    this.setData({
      isTopTip: true
    })
  }
};

module.exports = CommonEvent;