// spec.js
describe('Protractor Demo App', function() {
 var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

 function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }
    
function screenshot(spec) {
        browser.takeScreenshot().then(function (png) {
            var fs = require('fs'),
                buf = new Buffer(png, 'base64'),
                stream = fs.createWriteStream(spec+'.png');

            stream.write(buf);
            stream.end();
        });
}
      
var spec1 = it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
    //screenshot(spec1.description);
  });

var spec2 = it('should add one and two', function() {
    add(1,2);
    //screenshot(spec2.description);
    expect(latestResult.getText()).toEqual('3');
  });
    
var spec3 =  it('should add four and six', function() {
    add(4,6);
    //screenshot(spec3.description);
    expect(latestResult.getText()).toEqual('10');
  });
    
var spec4 =it('should have a history', function() {
    add(1, 2);
    add(3, 4);

    expect(history.count()).toEqual(2);

    add(5, 6);

    expect(history.count()).toEqual(3); 
    
    
    expect(history.last().getText()).toContain('1 + 2');
    expect(history.first().getText()).toContain('5 + 6');
    //screenshot(spec4.description);
    
  });
    
});