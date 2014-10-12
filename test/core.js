module('core', {
    setup: function () {
        $('#qunit-fixture').html('<div class="editable"></div>');
        this.$el = $('.editable');
    }
});

test('mediumInsert() inits the plugin', function () {
    this.$el.mediumInsert();

    ok(this.$el.hasClass('medium-editor-insert-plugin'), '.medium-editor-insert-plugin class added');
});

test('mediumInsert() does nothing if there is no addon selected', function () {
    this.$el.mediumInsert({
      addons: false
    });
  
    equal(this.$el.html(), '', 'editor is empty');
});

test('mediumInsert() adds empty paragraph if there is no content', function () {
    this.$el.mediumInsert();
   
    equal(this.$el.find('p').length, 1, 'paragraph created');
});

test('mediumInsert() wraps <br> into paragraph', function () {
    this.$el.html('<br>');
   
    this.$el.mediumInsert();
   
    equal(this.$el.find('p').length, 1, 'paragraph created');
    equal(this.$el.find('br').length, 1, 'only 1 br exists');
});

test('mediumInsert() wraps text content into paragraph', function () {
    this.$el.html('text');
   
    this.$el.mediumInsert();
   
    equal(this.$el.find('p').length, 1, 'paragraph created');
});

test('mediumInsert() adss plugin\'s buttons to the $el', function () {   
    this.$el.mediumInsert();
   
    equal(this.$el.find('.mediumInsert-buttons').length, 1, 'buttons appended');
});

test('mediumInsert() shows plugin\'s buttons after clicking on empty paragraph', function () {
    var el, range, sel;
    
    this.$el.html('<p id="paragraph">&nbsp;</p><p>test</p>');
    
    this.$el.mediumInsert();
    
    // Place caret at the beginning of #paragraph
    el = document.getElementById("paragraph");
    range = document.createRange();
    sel = window.getSelection();
    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    
    this.$el.find('#paragraph').click();
    
    equal(this.$el.find('.mediumInsert-buttons').css('display'), 'block', 'buttons are visible');
});

test('mediumInsert() hides plugin\'s buttons after clicking on non-empty paragraph', function () {
    var el, range, sel;
    
    this.$el.html('<p>&nbsp;</p><p id="paragraph2">test</p>');
    
    this.$el.mediumInsert();
    
    // Place caret at the beginning of #paragraph
    el = document.getElementById("paragraph2");
    range = document.createRange();
    sel = window.getSelection();
    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    
    this.$el.find('#paragraph2').click();
    
    equal(this.$el.find('.mediumInsert-buttons').css('display'), 'none', 'buttons are hidden');
});

test('mediumInsert() toggles addons buttons after clicking on show button', function () {
    var el, range, sel;
    
    this.$el.html('<p id="paragraph">&nbsp;</p><p>test</p>');
    
    this.$el.mediumInsert();
    
    // Place caret at the beginning of #paragraph
    el = document.getElementById("paragraph");
    range = document.createRange();
    sel = window.getSelection();
    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    
    this.$el.find('#paragraph').click();
    this.$el.find('.mediumInsert-buttonsShow').click();

    equal(this.$el.find('.mediumInsert-buttonsOptions').css('display'), 'block', 'addons are visible');
    
    this.$el.find('.mediumInsert-buttonsShow').click();

    equal(this.$el.find('.mediumInsert-buttonsOptions').css('display'), 'none', 'addons are hidden');
});